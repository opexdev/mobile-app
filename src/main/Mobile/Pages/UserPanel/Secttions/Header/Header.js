import React from "react";
import classes from "./Header.module.css";
import {useDispatch, useSelector} from "react-redux";
import Icon from "../../../../../../components/Icon/Icon";
import ActionSheet from "../../../../../../components/ActionSheet/ActionSheet";
import {showSideMenu} from "../../../../../../store/actions/global";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import * as RoutesName from "../../../../Routes/routes";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import SettingsHeader from "./components/SettingsHeader/SettingsHeader";


const Header = (props) => {


    const dispatch = useDispatch();


    /*const [showMenuAction, setShowMenuAction] = useState(false);

    const [showSubMenuAction, setShowSubMenuAction] = useState(false);*/


    return (
        <>

            <div className={`width-100 row ai-center jc-between ${classes.container} px-5`}>

                <Icon iconName="icon-menu_vertical fs-05 flex" onClick={()=>dispatch(showSideMenu(true))}/>


                <Routes>
                    <Route path={RoutesName.MarketRelative + "/*"} element={
                        <MarketHeader/>
                    }/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.WalletRelative+"/:id/:path/*"} element={
                            <WalletHeader/>
                        }/>
                        <Route path={RoutesName.SettingsRelative+"/*"} element={
                            <SettingsHeader/>
                        }/>
                    </Route>
                </Routes>

            </div>





            <ActionSheet/>


            {/*<ActionSheet show={!showAction} onChangeShow={(state)=>setShowAction(state)}>
                    <span>new action</span>
                </ActionSheet>*/}


        </>

    );
};
export default Header;