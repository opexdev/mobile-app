import React from 'react';
import classes from './Layout.module.css'
import {Outlet} from "react-router-dom";
import LayoutHeader from "./LayoutHeader/LayoutHeader";
import ScrollBar from "../ScrollBar";
import Footer from "../Footer/Footer";

const Layout = () => {
    return (
        <div className={`${classes.container} width-100 column text-color`}>
            <LayoutHeader/>
            <div className={`${classes.content} column`}>
                <ScrollBar>
                    <Outlet/>
                    <Footer/>
                </ScrollBar>
            </div>
        </div>
    );
};

export default Layout;
