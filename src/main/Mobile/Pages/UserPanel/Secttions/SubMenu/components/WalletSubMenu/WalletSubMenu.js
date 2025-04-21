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
import i18n from "i18next";


const WalletSubMenu = () => {

    const {t} = useTranslation();
    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)
    const [showZero, setShowZero] = useState(false);
    const assets = useSelector((state) => state.exchange.assets)
    const {data: data, isLoading} = useGetUserAccount()

    const wallets = Object.keys(currencies)
        .map(symbol => ({
            symbol,
            name: currencies[symbol].name,
            alias: currencies[symbol].alias,
            icon: currencies[symbol].icon,
            order: currencies[symbol].order,
            isActive: currencies[symbol].isActive,
            free: data?.wallets?.[symbol]?.free || 0,
        }))
        .filter(wallet => wallet.isActive || wallet.free > 0);

    wallets.sort((a, b) => {
        if (b.free !== a.free) return b.free - a.free;
        return a.order - b.order;
    });

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
                                {
                                    wallets.map((wallet) => (
                                        <WalletListItem
                                            symbol={wallet.symbol}
                                            data={wallet}
                                            key={wallet.symbol}
                                            assetName={wallet.symbol}
                                            freeWallet={wallet.free}
                                            showZero={showZero}
                                        />
                                    ))
                                }
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
