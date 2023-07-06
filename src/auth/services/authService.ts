import axiosInstance from "../../utils/axiosInstance";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
// import { useAuthContext } from "../services/authContext";

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

export const logout = (): void => {
    localStorage.removeItem("token");
};
