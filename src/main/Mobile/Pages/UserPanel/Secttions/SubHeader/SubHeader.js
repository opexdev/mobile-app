import React, {useState} from "react";
import classes from "./SubHeader.module.css";
import Icon from "../../../../../../components/Icon/Icon";
import {Route, Routes, useLocation} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import MarketSubHeader from "./components/MarketSubHeader/MarketSubHeader";
import WalletSubHeader from "./components/WalletSubHeader/WalletSubHeader";
import SettingsSubHeader from "./components/SettingsSubHeader/SettingsSubHeader";

const SubHeader = (props) => {

    const [expand, setExpand] = useState(false)
    const location = useLocation()


    const clickHandler = () => {
        if (!(location.pathname.includes(RoutesName.SettingsRelative)) ) {
            setExpand(true)
        }
    }

    return (
        <div className={`width-100 column ai-center jc-center position-relative ${classes.container}`}>
            {expand && <div className={`width-100 column position-absolute ${classes.content} py-1 px-3`}>
                <Routes>
                    <Route path={RoutesName.MarketRelative + "/*"} element={
                        <MarketSubHeader/>
                    }/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.WalletRelative+"/:id/:path/*"} element={
                            <WalletSubHeader/>
                        }/>
                        <Route path={RoutesName.SettingsRelative+"/*"} element={
                            <SettingsSubHeader/>
                        }/>
                    </Route>
                </Routes>
                <Icon iconName="icon-dot-3 fs-01 flex jc-center ai-center" customClass={`${classes.thisIcon} py-05`} onClick={()=>setExpand(false)}/>
            </div>}
            <Icon iconName="icon-dot-3 fs-01 flex" customClass={`${classes.thisIcon}`} onClick={()=>clickHandler()}/>
        </div>
    );
};


export default SubHeader;