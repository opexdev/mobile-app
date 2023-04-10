import React, {useState} from 'react';
import classes from './WalletSubMenu.module.css'
import {NavLink, useParams} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import ToggleSwitch from "../../../../../../../../components/ToggleSwitch/ToggleSwitch";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import ScrollBar from "../../../../../../../../components/ScrollBar";
import WalletListItem from "./components/WalletListItem/WalletListItem";


const WalletSubMenu = () => {

    const {path} = useParams()

    const {t} = useTranslation();
    const [showZero, setShowZero] = useState(false);
    const assets = useSelector((state) => state.exchange.assets)


    return (
        <div className={`width-100 column jc-center ai-center my-5 `}>


       {/*     <NavLink
                className={({isActive}) =>
                    isActive ? "width-100 row ai-center cursor-pointer position-relative px-1 py-05 " : "width-100 row ai-center cursor-pointer position-relative px-1 py-05"
                }
                to={`${Routes.Wallet}/TBTC/${path}`}>

                TBTC

            </NavLink>

            <NavLink
                className={({isActive}) =>
                    isActive ? "width-100 row ai-center cursor-pointer position-relative px-1 py-05 " : "width-100 row ai-center cursor-pointer position-relative px-1 py-05"
                }
                to={`${Routes.Wallet}/TETH/${path}`}>

                TETH

            </NavLink>*/}


            <div className={`width-100 card-bg column ${classes.container}`}>
                <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h2>{t("WalletSubMenu.title")}</h2>
                    </div>
                </div>
                <div className={`column width-100 ${classes.content}`}>
                    <div className={`width-100 row jc-around ai-center py-2 border-bottom`}>
                        <span className={`fs-0-7`}>{t("WalletSubMenu.showZeroBalance")}</span>
                        <ToggleSwitch onchange={()=>setShowZero(prevState => !prevState)} checked={showZero}/>
                    </div>
                    <WalletBalance/>
                    <ScrollBar customClass={`column`}>
                        { assets.map((name) => <WalletListItem key={name} assetName={name} showZero={showZero}/> )}
                    </ScrollBar>
                </div>
                <div className={`${classes.footer} flex jc-center ai-center px-1 text-gray fs-0-7 px-1 py-05`} style={{lineHeight:"3vh"}}>
                    <span>{t("WalletSubMenu.estimateAlert")}</span>
                </div>
            </div>


        </div>
    );
};

export default WalletSubMenu;
