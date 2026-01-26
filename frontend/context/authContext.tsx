"use client"
import { useState, useContext, useEffect, createContext, ReactNode } from "react";
interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                console.log("Token expired, clearing session");
                localStorage.removeItem("token");
                setToken(null);
                setIsAuthenticated(false);
            } else {
                setToken(storedToken);
                setIsAuthenticated(true);
            }
        }
    }, [])

    function isTokenExpired(token: string): boolean {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const { exp } = JSON.parse(jsonPayload);

            // Check if current time is past expiration (exp is in seconds)
            return Date.now() >= exp * 1000;
        } catch (error) {
            console.error("Error checking token expiry:", error);
            return true;
        }
    }

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}