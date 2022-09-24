import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SingleMovie = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9865a05f3f5a1b0982317caf07503ac0`).
            then((res) => {
                setMovie(res.data)
            }
            )

    }, [id])

    return (
        <div>
            <Navbar />
            <div className='single_movie_cont'>
                <div className='single_movie_img'>
                    <img style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                </div>
                <div className='single_movie_info' style={{ fontSize: '30px' }}>
                    {movie.title}
                </div>
                <div className='single_movie_info'>
                    <div>OVERVIEW: {movie.overview}</div>
                </div>
                < div className='single_movie_info'>
                    <div>Genres:</div>
                    {
                        movie.genres?.map((genre) => (
                            <div key={genre.id} style={{ margin: 'auto' }}>{genre.name}</div>
                        ))
                    }
                </div>
                <div className='single_movie_info'>
                    Rating: {movie.vote_average}
                </div>

            </div>
        </div >
    )
}

export default SingleMovie