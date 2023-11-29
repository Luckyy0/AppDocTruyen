import AuthContex from "../context/Auth/AuthContex";
import { useContext } from "react";

export const useAuth = () => {
    return useContext(AuthContex);
};