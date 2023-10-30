import styles from "./UserImage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UserImage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("image")}>
                <img
                    className={cx("image-main")}
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    alt="user image"
                />
            </div>
            <div className={cx("icon")}>
                <img
                    className={cx("vip")}
                    src="/vip.png"
                    alt="vip image"
                />
            </div>
        </div>
    );
}

export default UserImage;
