import React from "react";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import WalletSubMenu from "./components/WalletSubMenu/WalletSubMenu";
import SettingsSubMenu from "./components/SettingsSubMenu/SettingsSubMenu";
import MarketSubMenu from "./components/MarketSubMenu/MarketSubMenu";


const SubMenu = () => {


    return (
        <Routes>
            <Route path={RoutesName.MarketRelative + "/*"} element={
                <MarketSubMenu/>
            }/>
            <Route element={<ProtectedRoute/>}>
                <Route path={RoutesName.WalletRelative+"/:id/:path/*"} element={
                    <WalletSubMenu/>
                }/>
                <Route path={RoutesName.SettingsRelative+"/*"} element={
                    <SettingsSubMenu/>
                }/>
            </Route>
        </Routes>
    );
};

export default SubMenu;
