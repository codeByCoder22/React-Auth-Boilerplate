import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../services/AuthContext";
import * as authService from "../services/authService";

interface CurrentUserInterface {
    id: string;
    token: string;
    username: string;
    email: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();

    const setToken = (token: string): void => {
        localStorage.setItem("token", token);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequest: LoginRequestInterface = {
            email,
            password,
        };

        // await Login(loginRequest);
        authService
            .login(loginRequest)
            .then((currentUser) => {
                setToken(currentUser.token);
                setCurrentUser(currentUser);
                setIsLogged(true);
                setError("");
                navigate("/board");
            })
            .catch((error) => {
                setCurrentUser(null);
                setIsLogged(false);
                console.log(error.response);
                setError(
                    // error.response?.data?.error ||
                    //     "An error occurred. Please try again."
                    error.response?.data ||
                        "An error occurred. Please try again."
                );
            })
            .finally(() => {
                console.log("finally");
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
                {/* {error && <p>{error}</p>} */}
                {error && (
                    <ul>
                        {Object.values(error).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default Login;
