import { actions, useStore } from "../../../context/store";

import styles from "./SelecBar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SelectBar({ menuBar }) {
    const [menuState, dispatch] = useStore();
    const { adminComicMenuSelect } = menuState;
    console.log("menu comic index " + adminComicMenuSelect);

    return (
        <div className={cx("wrapper")}>
            {menuBar.map((item, index) => (
                <div
                    key={index}
                    className={cx("item", {
                        isActive: index === adminComicMenuSelect,
                    })}
                    onClick={() => dispatch(actions.setAdmincComicMenu(index))}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default SelectBar;
