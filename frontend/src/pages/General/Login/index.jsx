import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  useState } from "react";
import publicApi from "../../../api/PublicApi";
import privateApi from "../../../api/PrivateApi";

const cx = classNames.bind(styles);

function Login() {
    const data = useLocation();
    //data input
    const [credentials, setCredentials] = useState({
        username: data.state?.username || "",
        password: data.state?.password || "",
    });
    //message
    const [errMessage, SetErrMessage] = useState("");
    // redirect
    const navigate = useNavigate();

    // xử lý onChange
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // login
            const response = await publicApi.post("/login", credentials);
            SetErrMessage("");
            const { accessToken, token } = response.data;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", token);
            // redirect
            const dataRedirect = await privateApi.get("/profile");
            const { roles } = dataRedirect.data;
            roles.includes("ADMIN")
                ? navigate("/admin", { replace: true })
                : navigate("/", { replace: true });
        } catch (error) {
            if (!error?.response) {
                SetErrMessage("Server not Response");
            } else {
                SetErrMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className={cx("wrapper", "row", "a-9", "no-gutters")}>
            {/* Phần deco */}
            <div className={cx("deco", "col", "a-5", "full", "row")}>
                <Link className={cx("logo", "row", "a-12")} to={"/"}>
                    <img
                        className={cx("logo-image", "col", "a-2", "a-o-4")}
                        src="/logo.ico"
                        alt="logo"
                    />
                    <h2 className={cx("logo-content", "col", "a-2")}> Taka</h2>
                </Link>

                <img
                    className={cx("image", "col", "a-8")}
                    src="/login.ico"
                    alt="img"
                />
            </div>
            {/* form login */}
            <div className={cx("login", "col", "a-7", "full", "row")}>
                <div className={cx("login-form", "col", "a-10")}>
                    <h1 className={cx("col", "a-12", "label")}>Login</h1>

                    <form className={cx("col", "a-12")} onSubmit={handleSubmit}>
                        {/* username */}
                        <div className={cx("field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faUser}
                            />
                            <input
                                className={cx("in")}
                                type="text"
                                placeholder="enter account name"
                                required={true}
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                            />
                        </div>
                        {/* password */}
                        <div className={cx("field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faLock}
                            />

                            <input
                                className={cx("in")}
                                type="password"
                                placeholder="enter password"
                                required={true}
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                        {/* error message */}
                        <p className={cx("errmsg", "col", "a-12")}>
                            {errMessage}
                        </p>
                        {/* button submit form */}
                        <div className={cx("row", "a-12")}>
                            <button
                                className={cx("button", "col", "a-8", "a-o-2")}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {/* redirect register form */}
                    <div className={cx("col", "a-12", "signin")}>
                        Bạn chưa có tài khoản?
                        <Link className={cx("signin-btn")} to={"/signin"}>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
