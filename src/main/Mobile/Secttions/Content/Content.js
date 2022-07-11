import React from "react";
import classes from "./Content.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../routes/routes";
import {useTranslation} from "react-i18next";
import Dashboard from "./components/Dashboard/Dashboard";
import Wallet from "./components/Wallet/Wallet";
import TheSettings from "./components/Settings/Settings";
import {MobileDashboard, Overview, Panel} from "../../../../routes/routes";

const Content = () => {

    const {t} = useTranslation();

    return (
        <div className={`container ${classes.container}`}>
            <ScrollBar>
                <Routes>
                    <Route path={RoutesName.Panel + "/*" } element ={<Dashboard/>}/>
                    <Route path={RoutesName.Wallet} element={<Wallet/>}/>
                    <Route path={RoutesName.Settings} element={<TheSettings/>}/>
                    <Route path="*" element ={
                        <div className="container flex ai-center jc-center"
                             style={{height: "70%"}}>
                            <h1>{t("comingSoon")}</h1>
                        </div>
                    }/>
                </Routes>
            </ScrollBar>
        </div>
    );
};


export default Content;
