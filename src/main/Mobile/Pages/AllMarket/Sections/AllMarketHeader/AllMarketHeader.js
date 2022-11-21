import React from 'react';
import {useTranslation} from "react-i18next";
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";
import {useDispatch, useSelector} from "react-redux";
import classes from "../AllMarketContent/components/AllMarketInfo/AllMarketInfo.module.css";
import {setMarketInterval} from "../../../../../../store/actions";

const AllMarketHeader = () => {

    const {t} = useTranslation();
    const interval = useSelector((state) => state.global.marketInterval)

    const dispatch = useDispatch();

    return (
        <HeaderBuilder>
            <div className={`row jc-center ai-baseline`}>
                <h2 className={`ml-2`}>{t("market.title")}</h2>
                {/*<span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>*/}

                <div className={`mr-2 fs-0-7`}>

                    <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "24h" && classes.active}`} onClick={()=>dispatch(setMarketInterval("24h"))}>{t("marketInterval.24h")}</span>
                    <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "7d" && classes.active}`} onClick={()=>dispatch(setMarketInterval("7d"))}>{t("marketInterval.7d")}</span>
                    <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "1M" && classes.active}`} onClick={()=>dispatch(setMarketInterval("1M"))}>{t("marketInterval.1M")}</span>


                </div>




            </div>
        </HeaderBuilder>
    );
};

export default AllMarketHeader;