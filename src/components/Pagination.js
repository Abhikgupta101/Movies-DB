import React, { useState } from 'react'
import { AuthContextState } from '../context/Context';

function Pagination() {
    const { page, setPage } = AuthContextState()
    const increment = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        setPage(page + 1);
    }
    const decrement = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        if (page > 1)
            setPage(page - 1);
    }
    return (
        <div className='w-full flex justify-center'>
            <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-r-0  mt-10 mb-8'
                onClick={decrement}>Prev</button>
            <button className='p-2 border-2 border-indigo-500 text-slate-50 border-r-0 bg-slate-600  mt-10 mb-8'>{page}</button>
            <button className='p-2 border-2 border-indigo-500 text-indigo-500  mt-10 mb-8'
                onClick={increment}>Next</button>
        </div>
    )
}

export default Pagination