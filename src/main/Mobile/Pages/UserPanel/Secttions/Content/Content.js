import React from "react";
import classes from "./Content.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {Navigate, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import {useTranslation} from "react-i18next";
import Dashboard from "./components/Dashboard/Dashboard";
import Wallet from "./components/Wallet/Wallet";
import Settings from "./components/Settings/Settings";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import {useSelector} from "react-redux";
import {MarketRelative} from "../../../../Routes/routes";

const Content = () => {

    const {t} = useTranslation();
    const defaultWallet = useSelector((state) => state.exchange.assets[0])


    return (
        <div className={`container ${classes.container}`}>
            <ScrollBar>
                <Routes>
                    <Route path={RoutesName.MarketRelative + "/*"} element ={<Dashboard/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.WalletRelative+"/:id"} element={<Wallet/>}/>
                        <Route path={RoutesName.SettingsRelative+"/*"} element={<Settings/>}/>
                    </Route>
                    <Route path="*" element ={
                        <div className="container flex ai-center jc-center"
                             style={{height: "70%"}}>
                            <h1>{t("comingSoon")}</h1>
                        </div>
                    }/>
                    <Route
                        path={RoutesName.WalletRelative}
                        element={<Navigate to={RoutesName.Wallet + "/" + defaultWallet} replace />}
                    />

                    <Route
                        path={RoutesName.SettingsRelative}
                        element={<Navigate to={RoutesName.Security} replace />}
                    />
                </Routes>
            </ScrollBar>
        </div>
    );
};


export default Content;
