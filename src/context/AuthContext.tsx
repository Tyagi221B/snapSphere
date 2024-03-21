import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const INITIAL_USER ={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:'',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}:{children: React.ReactNode}) => {

    const [user , setUser ] = useState<IUser>(INITIAL_STATE);
    const [isLoading , setIsLoading ] = useState(false);
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    const checkAuthUser = async() => {
        try {
            const currentAccount = await getCurrentUser()
        } catch (error) {
            console.log(error);
            return false;
            
        }finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

	return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
