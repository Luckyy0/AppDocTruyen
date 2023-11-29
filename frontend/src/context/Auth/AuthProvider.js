import { useState } from "react";
import AuthContex from "./AuthContex";

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ username: "", image: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" });

    return (
        <AuthContex.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContex.Provider>
    );
}

export default AuthProvider;
