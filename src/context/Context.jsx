import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import Loading from "../components/Loading";
import { collection, onSnapshot, query } from "firebase/firestore";
import useFetch from "../hooks/useFetch";

const BlogContext = createContext();

const Context = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [publish, setPublish] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentLength, setCommentLength] = useState(0);

    useEffect(() => {
      
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
            if(user) {
                setCurrentUser(user)
            }else {
                setCurrentUser(null)
            }
            setIsLoading(false)
            
        });
        return () => unsubscribe();
    }, [currentUser]);

    const getUsers = () => {
        const postRef = query(collection(db, "users"));
        onSnapshot(postRef, (snapshot) => {
            const userDocs = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setAllUsers(userDocs);
            setUserLoading(false);
        });
    }

    useEffect(() => {
        getUsers();
    }, [])

    const { data: postData, isLoading: postLoading } = useFetch("posts");


    const value = {
        isLoading,
        currentUser,
        setCurrentUser,
        allUsers,
        userLoading,
        publish, 
        setPublish,
        showCommentModal, 
        setShowCommentModal,
        commentLength, 
        setCommentLength,
        postData,
        postLoading
    }

    return <BlogContext.Provider value={value}>
        {isLoading ? <Loading /> : children }
    </BlogContext.Provider>
}

export const Blog = () => useContext(BlogContext);

export default Context;