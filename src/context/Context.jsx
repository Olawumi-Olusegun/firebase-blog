import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Loading from "../components/Loading";

const BlogContext = createContext();

const Context = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
    }, [currentUser])

   

    const value = {
        currentUser,
        setCurrentUser
    }

    return <BlogContext.Provider value={value}>
        {isLoading ? <Loading /> : children }
    </BlogContext.Provider>
}

export const Blog = () => useContext(BlogContext);

export default Context;