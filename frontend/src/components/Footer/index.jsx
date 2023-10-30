import Logo from "../Logo";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";
import Genre from "../Genre";


const cx = classNames.bind(styles);
const genre = [
    { id: 0, name: "Kiếm hiệp" },
    { id: 1, name: "Tiểu thuyết" },
    { id: 2, name: "Ngôn tình" },
    { id: 3, name: "Trinh thám" },
    { id: 4, name: "Học đường" },
    { id: 5, name: "Đời thường" },
    { id: 6, name: "Xuyên không" },
    { id: 7, name: "Linh dị" },
    { id: 8, name: "Đô thị" },
];
function Footer() {

    return (
        <div className={cx("row", "wrapper")}>
            <div className={cx("info")}>
                <Logo />
                <p className={cx("email")}>Email: takatruyen@gmail.com</p>
                <p className={cx("auth")}>Chính sách bảo mật</p>
            </div>
            <div className={cx("info_2")}>
                <div className={cx("list_comic")}>
                    {genre.map((gen) => (
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
