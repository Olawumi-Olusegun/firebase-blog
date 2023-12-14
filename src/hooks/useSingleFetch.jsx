import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase';

const useSingleFetch = (collectionName, id, subCollection) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSingleData = () => {
        const postRef = query(collection(db, collectionName, id, subCollection));
        onSnapshot(postRef, (snapshot) => {
            const postDocs = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setData(postDocs);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getSingleData();
    }, [db, id])

  return { data, isLoading }
}

export default useSingleFetch