import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import publicApi from "../../../api/PublicApi";
const cx = classNames.bind(styles);

function Signin() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        rePassword: "",
        email: "",
    });
    const [errMessage, SetErrMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicApi.post("/signup", credentials);
            SetErrMessage("");
            navigate("/login",{state:{username:credentials.username,password:credentials.password}});
        } catch (err) {
            if (!err?.response) {
                SetErrMessage("Server not Response");
            } else if(!err.response.data?.message){
                SetErrMessage("Password less than 8 characters")
            }else{
                SetErrMessage(err.response.data.message);
            }
        }
    };
    return (
        <div className={cx("wrapper", "row", "a-9", "no-gutters")}>
            {/* form signin */}
            <div className={cx("signin", "col", "a-7", "full", "row")}>
                <div className={cx("signin-form", "col", "a-10")}>
                    <h1 className={cx("col", "a-12", "label")}>Register</h1>
                    <form className={cx("col", "a-12")} onSubmit={handleSubmit}>
                        {/* email */}
                        <div className={cx("field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faEnvelope}
                            />
                            <input
                                className={cx("in")}
                                type="text"
                                placeholder="enter email"
                                name="email"
                                required={true}
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </div>
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
                                name="username"
                                required={true}
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
                                name="password"
                                required={true}
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                        {/* confirm password */}
                        <div className={cx("field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faLock}
                            />
                            <input
                                className={cx("in")}
                                type="password"
                                placeholder="confirm password"
                                name="rePassword"
                                required={true}
                                value={credentials.rePassword}
                                onChange={handleChange}
                            />
                        </div>
                        <p className={cx("errmsg", "col", "a-12")}>
                            {errMessage}
                        </p>
                        <div className={cx("row", "a-12")}>
                            <button
                                className={cx("button", "col", "a-8", "a-o-2")}
                                type="submit"
                            >
                                Signin
                            </button>
                        </div>
                    </form>
                    <div className={cx("col", "a-12", "login")}>
                        Bạn đã có tài khoản?
                        <Link className={cx("login-btn")} to={"/login"}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
            {/* deco */}
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
        </div>
    );
}

export default Signin;
