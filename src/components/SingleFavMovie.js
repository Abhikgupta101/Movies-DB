import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { AuthContextState } from '../context/Context';
import { Navigate, useNavigate } from 'react-router-dom';

const SingleFavMovie = ({ id }) => {
    const [movie, setMovie] = useState([])
    const { userId } = AuthContextState()

    const navigate = useNavigate();

    const updateMovie = () => {
        navigate(`/movie/${id}`, { replace: true });
    }

    const remove = async () => {
        await updateDoc(doc(db, "users", userId), {
            favourite: arrayRemove(id)
        });
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9865a05f3f5a1b0982317caf07503ac0`).
            then((res) => {
                setMovie(res.data)
            }
            )

    }, [id])
    
    return (
        <div className='favmovie_cont'>
            <div className='favmovie_info'
                onClick={updateMovie}
            >
                <img style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
            </div>
            <div className='favmovie_info'>
                {movie.title}
            </div>
            <div className='favmovie_delete'>
                <DeleteIcon onClick={remove} />
            </div>

        </div >
    )
}

export default SingleFavMovie