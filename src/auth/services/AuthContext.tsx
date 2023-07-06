import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    FC,
    PropsWithChildren,
} from "react";
import { CurrentUserInterface } from "../types/currentUser.interface";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import * as authService from "./authService";

interface AuthContextType {
    currentUser: CurrentUserInterface | null;
    setCurrentUser: (user: CurrentUserInterface | null) => void;
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: FC<
    PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUserInterface | null>(
        null
    );
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((currentUser) => {
                console.log("currentUser", currentUser);
                setCurrentUser(currentUser);
                setIsLogged(true);
                navigate("/board");
                console.log("response.data", currentUser);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                setCurrentUser(null);
                setIsLogged(false);
            })
            .finally(() => {
                console.log("finally");
            });
    }, []);

    const authContextValue: AuthContextType = {
        currentUser,
        setCurrentUser,
        isLogged,
        setIsLogged,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
