import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase'

export const AuthContext = createContext()

function Context({ children }) {
    const [userId, setUserId] = useState('')
    const [page, setPage] = useState(1)
    const [genreId, setGenreId] = useState('')
    const [genreName, setGenreName] = useState('')
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
                localStorage.setItem('userId', user.uid)
            }
            else {
                setUserId(null)
            }

        });
    }, []);

    return (
        <AuthContext.Provider value={{ page, setPage, search, setSearch, genreId, setGenreId, genreName, setGenreName, userId, error, setError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContextState = () => {
    return useContext(AuthContext)
}

export default Context