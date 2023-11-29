import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedPage, privateRoutes, publicRoutes } from "./routes";
import styles from "./app.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function App() {
    return (
        <BrowserRouter>
            <div className={cx("grid" ,"wide" ,"a", "b" ,"c" ,"d" ,"center","wrapper")}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedPage
                                        Layout={Layout}
                                        Page={Page}
                                        role={route.role}
                                    />
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
