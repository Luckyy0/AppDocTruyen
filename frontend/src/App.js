import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedPage, privateRoutes, publicRoutes } from "./routes";

function App() {
    return (
        <BrowserRouter>
            <div className=" grid wide a b c d center">
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
