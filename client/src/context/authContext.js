import { createContext, useContext, useState } from "react";
import api from "../api/index";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (userData) => {

        try {
            const response = await api.post("/auth/login", userData);
            localStorage.setItem("token", response.data.token);
            setUser(response.data);
            navigate("/upload");
        }
        catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post("/auth/register", userData);
            localStorage.setItem("token", response.data.token);
            setUser(response.data);
            navigate("/upload");
        }
        catch (error) {
            console.error("Registration failed:", error);
        }
    }

    const logout = () => {
        setUser(null);
        navigate("/");
    }


    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
