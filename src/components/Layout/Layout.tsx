import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './layout.scss'

import { Outlet } from "react-router-dom"

const Layout = () => {

    return (
        <>
            <div className="wrapper">
                <div className="heaeder">
                    <Header />
                </div>
                <div className="main">
                    <Outlet />
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout;