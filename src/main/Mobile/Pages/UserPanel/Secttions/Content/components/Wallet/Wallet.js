import React from "react";
import {useTranslation} from "react-i18next";
/*import classes from "./Wallet.module.css";*/


const Wallet = () => {

    const {t} = useTranslation();

    return (
        <div className={`container flex ai-center jc-center`} style={{height:"100%"}}>
            <span>{t("comingSoon")}</span>
        </div>
    );
};

export default Wallet;
