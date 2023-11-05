import { AdminBasicLayout, AdminLayout, BasicLayout, EmptyLayout, MainLayout } from "../layouts";
import {
    UserHome,
    AdminHome,
    Search,
    BookInfo,
    ReadBook,
    Login,
    Signin,
    History,
    Like,
    Mark,
    TopView,
    TopLike,
    TopRate,
    TopTrend,
} from "../pages";
import Info from "../pages/User/Info";
import { AdminUpdateComicPage } from "../pages/components";

const publicRoutes = [
    { path: "/", component: UserHome, layout: BasicLayout },
    { path: "/search/*", component: Search, layout: MainLayout },
    { path: "/book", component: BookInfo, layout: BasicLayout },
    { path: "/book/chap", component: ReadBook, layout: BasicLayout },
    { path: "/login", component: Login, layout: EmptyLayout },
    { path: "/signin", component: Signin, layout: EmptyLayout },
    { path: "/topview", component: TopView, layout: BasicLayout },
    { path: "/toplike", component: TopLike, layout: BasicLayout },
    { path: "/toprate", component: TopRate, layout: BasicLayout },
    { path: "/toptrend", component: TopTrend, layout: BasicLayout },
];

const privateRoutes = [
    { path: "/admin", component: AdminHome, layout: AdminLayout },
    { path: "/admin/updatecomic", component: AdminUpdateComicPage, layout: AdminBasicLayout },
    { path: "/history", component: History, layout: BasicLayout },
    { path: "/like", component: Like, layout: BasicLayout },
    { path: "/mark", component: Mark, layout: BasicLayout },
    { path: "/info", component: Info, layout: BasicLayout },
];

export { publicRoutes, privateRoutes };
