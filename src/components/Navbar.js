import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContextState } from '../context/Context';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';


const Navbar = () => {
    const [genres, setGenres] = useState([])
    const { search, setSearch, setGenreId, setGenreName, userId, error } = AuthContextState()
    const navigate = useNavigate();

    const updateUrl = (id) => {
        if (id == "") {
            setGenreId('')
            setSearch('')
        }
        navigate(`/${id}`, { replace: true });
    }

    const changeGenre = (id, name) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        setGenreId(id)
        setGenreName(name)
        navigate(`/`, { replace: true });
    }

    const login = () => {
        navigate('/login', { replace: true });
    }

    const logout = async () => {
        await signOut(auth);
        navigate('/register', { replace: true });
    }

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=9865a05f3f5a1b0982317caf07503ac0").
            then((res) => {
                setGenres(res.data.genres)
            }
            )
    }, [])

    return (
        !error ?
            <div className='nav_container'>
                <div style={{ display: 'flex', justifyContent: 'center', flex: '0.5', height: '100%', alignItems: 'center' }}>
                    <SearchIcon className='search_icon' />
                    <input className='search_input' placeholder='Search Movies' value={search} onChange=
                        {(e) =>
                            setSearch(e.target.value)
                        }></input>
                </div>
                <div className='nav_links'>
                    <div onClick={() => updateUrl('')} className='links'>
                        <div className='links_icons'>
                            <MovieFilterIcon />
                            <div>Movies</div>
                        </div>
                    </div>
                    <div onClick={() => updateUrl('favorites')} className='links'>
                        <div className='links_icons'>
                            <FavoriteIcon />
                            <div>Favorites</div>
                        </div>
                    </div>
                    {
                        userId ?
                            <div className='links_icons'>
                                <LogoutIcon onClick={logout} />
                                <div>Logout</div>
                            </div> :
                            <div className='links_icons'>
                                <LoginIcon onClick={login} />
                                <div>Login</div>
                            </div>
                    }

                </div>
                <div className="dropdown">
                    <button className="dropbtn">Genres</button>
                    <div className="dropdown-content">
                        {
                            genres.map((genre) => (
                                <div key={genre.id} onClick={() => changeGenre(genre.id, genre.name)}>{genre.name}</div>
                            ))
                        }
                    </div>
                </div>
            </div> : <div className='nav_container' style={{ fontSize: '30px', color: 'white' }} >{error}</div>

    )
}

export default Navbar