import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase';

const useFetch = (collectionName) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = () => {
        const postRef = query(collection(db, collectionName));
        onSnapshot(postRef, (snapshot) => {
            const userDocs = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setData(userDocs);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getUsers();
    }, [])

  return { data, isLoading }
}

export default useFetch