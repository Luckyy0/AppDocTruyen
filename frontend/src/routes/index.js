import { useEffect, useState } from "react";
import privateApi from "../api/PrivateApi";
import {
    AdminBasicLayout,
    AdminLayout,
    BasicLayout,
    EmptyLayout,
    MainLayout,
} from "../layouts";
import {
    AdminHome,
    BookInfo,
    History,
    Like,
    Login,
    Mark,
    ReadBook,
    Search,
    Signin,
    SubscriptionInfo,
    TopLike,
    TopRate,
    TopTrend,
    TopView,
    UserHome,
} from "../pages";
import Info from "../pages/User/Info";
import { AdminUpdateComicPage } from "../pages/components";

const publicRoutes = [
    { path: "/", component: UserHome, layout: BasicLayout },
    { path: "/search/*", component: Search, layout: MainLayout },
    { path: "/book/:id", component: BookInfo, layout: BasicLayout },
    { path: "/book/:bookId/chap/:chapId", component: ReadBook, layout: BasicLayout },
    { path: "/login", component: Login, layout: EmptyLayout },
    { path: "/signin", component: Signin, layout: EmptyLayout },
    { path: "/topview", component: TopView, layout: BasicLayout },
    { path: "/toplike", component: TopLike, layout: BasicLayout },
    { path: "/toprate", component: TopRate, layout: BasicLayout },
    { path: "/toptrend", component: TopTrend, layout: BasicLayout },
];

const privateRoutes = [
    { path: "/admin", component: AdminHome, layout: AdminLayout , role: 'ADMIN'},
    {
        path: "/admin/updatecomic",
        component: AdminUpdateComicPage,
        layout: AdminBasicLayout,
    },
    { path: "/history", component: History, layout: BasicLayout, role: 'USER' },
    { path: "/like", component: Like, layout: BasicLayout, role: 'USER' },
    { path: "/mark", component: Mark, layout: BasicLayout, role: 'USER' },
    { path: "/info", component: Info, layout: BasicLayout, role: 'USER' },
    { path: "/payment_info/:subscription_info_id", component: SubscriptionInfo, layout: BasicLayout, role: 'USER' },
];

const ProtectedPage = ({ Layout, Page, role }) => {
    const [checkLogin, setCheckLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    //check login ...
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataRedirect = await privateApi.get("/profile");
                const { roles } = dataRedirect.data;
                if (roles.includes(role)) setCheckLogin(true);
                setLoading(false);
                console.log(roles);
            } catch (error) {
                setLoading(false);
                setCheckLogin(false);
            }
        };
        fetchData();
    }, [role]);

    if (loading) return <div>Loading ....</div>;
    else {
        if (checkLogin) {
            return (
                <Layout>
                    <Page />
                </Layout>
            );
        } else {
            return <div>truy cập ko được phép</div>;
        }
    }
};

export { ProtectedPage, privateRoutes, publicRoutes };
