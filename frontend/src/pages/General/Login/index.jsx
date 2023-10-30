import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx("wrapper", "row", "a-9", "no-gutters")}>
            <div className={cx("deco", "col", "a-5", "full", "row")}>
                <Link className={cx("logo", "row", "a-12")} to={'/'}>
                    <img className={cx("logo-image", "col", 'a-2','a-o-4')} src="/logo.ico" alt="logo" />
                    <h2 className={cx("logo-content", "col", 'a-2')}> Taka</h2>
                </Link>

                <img
                    className={cx("image", "col", "a-8")}
                    src="/login.ico"
                    alt="img"
                />
            </div>
            <div className={cx("login", "col", "a-7", "full", "row")}>
                <div className={cx("login-form", "col", "a-10")}>
                    <h1 className={cx("col", "a-12", "label")}>Login</h1>
                    <form className={cx("col", "a-12")}>
                        <div className={cx( "field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faUser}
                            />
                            <input
                                className={cx("in")}
                                type="text"
                                placeholder="enter account name"
                            />
                        </div>
                        <div className={cx( "field")}>
                            <FontAwesomeIcon
                                className={cx("icon")}
                                icon={faLock}
                            />

                            <input
                                className={cx( "in")}
                                type="password"
                                placeholder="enter password"
                            />
                        </div>
                        <p className={cx("errmsg", "col", "a-12")}>
                            Thông báo lỗi
                        </p>
                        <div className={cx("row", "a-12")}>
                            <button
                                className={cx("button", "col", "a-8", "a-o-2")}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
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
