import React, {useState} from 'react';
import classes from './WalletSubMenu.module.css'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import ToggleSwitch from "../../../../../../../../components/ToggleSwitch/ToggleSwitch";
import ScrollBar from "../../../../../../../../components/ScrollBar";
import WalletListItem from "./components/WalletListItem/WalletListItem";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import Loading from "../../../../../../../../components/Loading/Loading";


const WalletSubMenu = () => {

    const {t} = useTranslation();
    const [showZero, setShowZero] = useState(false);
    const assets = useSelector((state) => state.exchange.assets)
    const {data: data, isLoading} = useGetUserAccount()

    return (
        <div className={`width-100 column card-bg `} style={{height: "70vh"}}>
            <div className={`flex jc-start ai-center border-bottom card-header-bg px-7 ${classes.header}`}>
                <h2>{t("WalletSubMenu.title")}</h2>
            </div>
            {
                isLoading ? <Loading/> :
                    <>
                        <div className={`column width-100 ${classes.content} px-3`}>
                            <div className={`width-100 row jc-around ai-center py-2 border-bottom`}>
                                <span className={`fs-0-7`}>{t("WalletSubMenu.showZeroBalance")}</span>
                                <ToggleSwitch onchange={() => setShowZero(prevState => !prevState)} checked={showZero}/>
                            </div>
                            <WalletBalance/>
                            <ScrollBar customClass={`column`}>
                                {assets.filter(asset => data.wallets[asset].free > 0)
                                    .concat(assets.filter(asset => data.wallets[asset].free === 0))
                                    .map((name) => <WalletListItem key={name} assetName={name} showZero={showZero}/>)}
                            </ScrollBar>
                        </div>
                        <div className={`${classes.footer} flex jc-center ai-center px-1 text-gray fs-0-7 px-1 py-05`}
                             style={{lineHeight: "3vh"}}>
                            <span>{t("WalletSubMenu.estimateAlert")}</span>
                        </div>
                    </>
            }

        </div>
    );
};

export default WalletSubMenu;
