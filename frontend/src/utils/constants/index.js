import { Subscription, AdminHome, AdminUser, AdminMoney } from "../../pages";
import {
    faCartShopping,
    faBookOpen,
    faUser,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import {
    AdminAddComic,
    AdminBrowserComic,
    AdminGenreComic,
    AdminUpdateChapter,
    AdminUpdateComic,
} from "../../pages/components";

export const ADMIN_MENU = [
    { name: "Quản lý truyện", icon: faBookOpen },
    { name: "Quản lý gói đăng ký", icon: faCartShopping },
    { name: "Quản lý người dùng", icon: faUser },
    { name: "Quản lý doanh thu", icon: faReceipt },
];

export const ADMIN_PAGE = [
    { page: AdminHome },
    { page: Subscription },
    { page: AdminUser },
    { page: AdminMoney },
];

export const ADMIN_COMIC = [
    { name: "Thêm truyện", page: AdminAddComic },
    { name: "Chỉnh sửa thông tin", page: AdminUpdateComic },
    // { name: "Update chương", page: AdminUpdateChapter },
    { name: "Thể loại", page: AdminGenreComic },
    { name: "Tác giả", page: AdminBrowserComic },
];

export const USER_MENU_TOP_COMIC = [
    { name: "Đọc nhiều", path: "/topview" },
    { name: "Yêu thích", path: "/toplike" },
    { name: "Theo dõi", path: "/toprate" },
    { name: "Thịnh hành", path: "/toptrend" },
];

export const USER_ACTION = [
    { name: "Thông tin người dùng", path: "/info" },
    { name: "Lịch sử đọc", path: "/history" },
    { name: "Truyện yêu thích", path: "/like" },
    { name: "Truyện theo dõi", path: "/mark" },
    // { name: "Đăng xuất", path: "/"  },
];

export const TOP_PAGE_SIZE = 8;

export const TOAST = {
    WARRNING: "Warrning",
    ERROR: "Error",
    INFO: "Info",
    SUCCESS: "Success",
};
