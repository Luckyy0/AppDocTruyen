import { useState } from "react";
import AuthContex from "./AuthContex";

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ username: "", roles: [] });

    return (
        <AuthContex.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContex.Provider>
    );
}

export default AuthProvider;
