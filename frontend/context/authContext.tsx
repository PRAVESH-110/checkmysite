import {useState, useRef, createContext, ReactNode} from "react";
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

