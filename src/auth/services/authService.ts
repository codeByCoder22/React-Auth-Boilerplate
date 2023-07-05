// import { getCurrentUser } from './authService';
import React from "react";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
/*
interface User {
    id: number;
    name: string;
    // Add any other properties of the User object
}

export const useGetCurrentUser = async () => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const response: AxiosResponse<User> = await axios.get<User>(
                    "http://localhost:4001/api/user"
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);
};
*/
/*
export const getCurrentUser = async () => {
    try {
        const res = await axiosInstance.get("/api/user");
        return res.data;
    } catch (message) {
        return console.log(message);
    }
};
*/
//return a Promise
export const getCurrentUser = async (): Promise<CurrentUserInterface> => {
    return axiosInstance.get("/api/user").then((res) => res.data);
};

export const register = async (
    registerRequest: RegisterRequestInterface
): Promise<CurrentUserInterface> => {
    return axiosInstance.post("/api/users", registerRequest).then((res) => {
        return res.data;
    });
};

export const login = async (
    loginRequest: LoginRequestInterface
): Promise<CurrentUserInterface> => {
    return axiosInstance.post("/api/users/login", loginRequest).then((res) => {
        return res.data;
    });
};

export const setToken = (currentUser: CurrentUserInterface): void => {
    localStorage.setItem("token", currentUser.token);
};
