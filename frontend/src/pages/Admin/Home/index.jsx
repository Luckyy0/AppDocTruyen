import { SelectBar } from "../../components";
import styles from "./home.module.scss";
import classNames from "classnames/bind";

import { ADMIN_COMIC } from "../../../utils/constants";
import { useStore } from "../../../context/store";

const cx = classNames.bind(styles);

function Home() {
    const [state] = useStore();
    const { adminComicMenuSelect } = state;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("col", "a-12", "header")}>
                <SelectBar menuBar={ADMIN_COMIC} />
            </div>
            <div className={cx("content")}>
                {ADMIN_COMIC.filter(
                    (element, index) => index === adminComicMenuSelect
                ).map((element, index) => {
                    const Page = element.page;
                    return <Page key={index} />;
                })}
            </div>
        </div>
    );
}

export default Home;
