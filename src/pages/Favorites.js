import { arrayRemove, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContextState } from '../context/Context';
import { db } from '../Firebase';
import SingleFavMovie from '../components/SingleFavMovie';
import { Oval } from 'react-loader-spinner';

const Favorites = () => {
    const { userId } = AuthContextState()
    const [userData, setUserData] = useState([])
    const [favouriteData, setFavouriteData] = useState([])
    const [hover, setHover] = useState(0)
    const [isfavourite, setIsfavourite] = useState(false)


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

    return (
        <div>
            <Navbar />
            <div className='movies_cont'>
                <div className='mt-20 font-bold text-2xl text-center'>
                    Favourite Movies
                </div>

                {

                    userData.length == 1 ?
                        < div style={{ display: 'flex', flexDirection: 'column', marginTop: '5vh', marginBottom: '5vh', alignItems: 'center' }}>
                            {
                                userData[0].favourite?.map((id) =>
                                (
                                    <SingleFavMovie id={id} />
                                ))
                            }
                        </div> :
                        <div className='flex justify-center mt-5'>
                            <Oval heigth="100" width="100" color="grey" ariaLabel="loading" />
                        </div>
                }
            </div>
        </div>
    )
}

export default Favorites