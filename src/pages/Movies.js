import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContextState } from '../context/Context'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { Oval } from 'react-loader-spinner';
const Movies = () => {
    const { page, search, genreId, genreName, userId, setError, error } = AuthContextState()
    const [movies, setMovies] = useState([])
    const [userData, setUserData] = useState([])
    const [hover, setHover] = useState(0)


    const navigate = useNavigate();

    const updateMovie = (id) => {
        navigate(`/movie/${id}`, { replace: true });
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=9865a05f3f5a1b0982317caf07503ac0&page=${page}`).
            then((res) => {
                setMovies(res.data.results)
            }
            )
    }, [page])

    useEffect(() => {
        if (search) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9865a05f3f5a1b0982317caf07503ac0&query=${search}`).
                then((res) => {
                    setMovies(res.data.results)
                }
                )
        }
    }, [search])


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=9865a05f3f5a1b0982317caf07503ac0&with_genres=${genreId}`).
            then((res) => {
                setMovies(res.data.results)
            }
            )
    }, [genreId])


    useEffect(() => {

        const userRef = collection(db, 'users');
        const q = query(userRef, where("uid", "==", userId))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tempArray = [];
            querySnapshot.forEach((doc) => {
                tempArray.push({ ...doc.data() });
            });
            setUserData([...tempArray]);
        });
        return () => unsub();
    }, [userId]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setError('')
        }, 2000);
        return () => clearTimeout(timer);
    }, [error]);

    const add = async (id) => {

        if (!userId) {
            setError('You Must Login To Like Movies')
            return
        }

        if (userData[0].favourite.includes(id)) {
            await updateDoc(doc(db, "users", userId), {
                favourite: arrayRemove(id)
            });
        }
        else {
            await updateDoc(doc(db, "users", userId), {
                favourite: arrayUnion(id)
            });
        }

    }

    return (
        <div>
            <Navbar />
            <div className='movies_cont'>
                <div className='mt-20 font-bold text-2xl text-center'>
                    {
                        genreId ? <div>{genreName} Movies</div> : <div>Trending Movies</div>
                    }

                </div>
                {
                    movies.length === 0 ?
                        // null :
                        <div className='flex justify-center mt-5'>
                            <Oval heigth="100" width="100" color="grey" ariaLabel="loading" />
                        </div> :

                        < div className='flex flex-wrap mt-8 justify-center'>
                            {
                                movies.map((movie) =>
                                (

                                    <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[30vh] w-[200px] md:h-[50vh] md:w-[300px] bg-center bg-cover rounded-xl items-end mt-5 ml-5 hover:scale-110 ease-out duration-300 relativee`} key={movie.id}
                                        onMouseEnter={() => setHover(movie.id)}
                                        onMouseLeave={() => setHover('')}
                                    >
                                        <div className={`h-[25vh] w-[200px] md:h-[40vh] md:w-[300px] `}
                                            onClick={() => updateMovie(movie.id)
                                            }>
                                        </div>
                                        <div className={`h-[5vh] w-[200px] md:h-[10vh] md:w-[300px] flex justify-evenly items-center bg-red-200 bg-opacity-80 `}>
                                            {
                                                userData.length == 1 && userData[0].favourite.includes(movie.id) ?
                                                    <FavoriteIcon style={{ fontSize: '30px', color: 'red' }} onClick={() => add(movie.id)} /> :
                                                    <FavoriteIcon style={{ fontSize: '30px' }} onClick={() => add(movie.id)} />
                                            }
                                            <div style={{ fontSize: '14px' }}>{movie.title}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
                <Pagination />
            </div >
        </div >
    )
}

export default Movies