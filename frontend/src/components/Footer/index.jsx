import Logo from "../Logo";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";
import Genre from "../Genre";
import useGenres from "../../hook/useGenre";


const cx = classNames.bind(styles);

function Footer() {

    const {genres} = useGenres()

    return (
        <div className={cx("row", "wrapper")}>
            <div className={cx("info")}>
                <Logo />
                <p className={cx("email")}>Email: takatruyen@gmail.com</p>
                <p className={cx("auth")}>Chính sách bảo mật</p>
            </div>
            <div className={cx("info_2")}>
                <div className={cx("list_comic")}>
                    {genres.map((gen) => (
                        <Genre
                            key={gen.id}
                            name={gen.name}
                            
                        />
                    ))}
                </div>
                <p className={cx("orther")}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Totam in aut minima facilis asperiores at vero doloribus
                    odit, sunt necessitatibus ao.
                </p>
            </div>
        </div>
    );
}

export default Footer;
