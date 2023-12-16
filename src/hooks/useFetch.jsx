import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase';

const useFetch = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = () => {
        const postRef = query(collection(db, collectionName), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(postRef, async(snapshot) => {
            const postData = await Promise.all(
                snapshot.docs.map(async(docs) => {
                    const postItems = {...docs.data(), id: docs.id };
                    const userRef = doc(db, "users", postItems?.userId);
                    const getUser = await getDoc(userRef);
                    if(getUser.exists()) {
                        const { createdAt, ...restData } = getUser.data();
                        return { ...postItems, ...restData }
                    }
                })
            )
            // const userDocs = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setData(postData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }

    useEffect(() => {
        getUsers();
    }, [])

  return { data, isLoading }
}

export default useFetch