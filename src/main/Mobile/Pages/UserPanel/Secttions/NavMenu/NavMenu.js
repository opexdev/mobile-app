import React from "react";
import {Routes , Route} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import MarketNavMenu from "./components/MarketNavMenu/MarketNavMenu";
import WalletNavMenu from "./components/WalletNavMenu/WalletNavMenu";
import SettingsNavMenu from "./components/SettingsNavMenu/SettingsNavMenu";


const NavMenu = () => {

    return (
        <Routes>
            <Route path={RoutesName.MarketRelative + "/*"} element={
                <MarketNavMenu/>
            }/>
            <Route element={<ProtectedRoute/>}>
                <Route path={RoutesName.WalletRelative+"/:id/:path/*"} element={
                    <WalletNavMenu/>
                }/>
                <Route path={RoutesName.SettingsRelative+"/*"} element={
                    <SettingsNavMenu/>
                }/>
            </Route>
        </Routes>
    );
};

export default NavMenu;
