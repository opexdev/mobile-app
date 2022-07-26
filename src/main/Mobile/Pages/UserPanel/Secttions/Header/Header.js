import React, {useState} from "react";
import classes from "./Header.module.css";
import {useDispatch} from "react-redux";
import Icon from "../../../../../../components/Icon/Icon";
import Menu from "../Menu/Menu";
import ActionSheet from "../../../../../../components/ActionSheet/ActionSheet";
import {showSideMenu} from "../../../../../../store/actions/global";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import * as RoutesName from "../../../../Routes/routes";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import SettingsHeader from "./components/SettingsHeader/SettingsHeader";
import SubMenu from "../SubMenu/SubMenu";


const Header = (props) => {


    const dispatch = useDispatch();

    const [showMenuAction, setShowMenuAction] = useState(false);
    const [showSubMenuAction, setShowSubMenuAction] = useState(false);


    return (
        <>

            <div className={`container row ai-center jc-between ${classes.container} px-5`}>

                <Icon iconName="icon-menu_vertical font-size-md-plus-plus flex" onClick={()=>dispatch(showSideMenu(true))}/>


                <Routes>
                    <Route path={RoutesName.MarketRelative + "/*"} element={
                        <MarketHeader showMenu={() => setShowMenuAction((prevState) => !prevState)} showSubMenu={() => setShowSubMenuAction((prevState) => !prevState)}/>
                    }/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.WalletRelative+"/:id/:path/*"} element={
                            <WalletHeader showMenu={() => setShowMenuAction((prevState) => !prevState)} showSubMenu={() => setShowSubMenuAction((prevState) => !prevState)}/>
                        }/>
                        <Route path={RoutesName.SettingsRelative+"/*"} element={
                            <SettingsHeader showMenu={() => setShowMenuAction((prevState) => !prevState)} showSubMenu={() => setShowSubMenuAction((prevState) => !prevState)}/>
                        }/>
                    </Route>
                </Routes>

            </div>





            <ActionSheet show={showMenuAction} onChangeShow={(state) => setShowMenuAction(state)}>
                <Menu/>
            </ActionSheet>

            <ActionSheet show={showSubMenuAction} onChangeShow={(state) => setShowSubMenuAction(state)}>
                <SubMenu/>
            </ActionSheet>


            {/*<ActionSheet show={!showAction} onChangeShow={(state)=>setShowAction(state)}>
                    <span>new action</span>
                </ActionSheet>*/}


        </>

    );
};
export default Header;