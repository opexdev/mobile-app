import React from "react";
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";
import {useSelector} from "react-redux";
import {isMobile} from 'react-device-detect';

const Loading = ({type}) => {
    const {t} = useTranslation();
    const theme = useSelector((state) => state.global.theme)
    return (
        <div className="width-100 column ai-center jc-center" style={{height: "100%"}}>
            <img className="mb-05" style={{width: isMobile ? "10vw" : "3vw"}} src={theme === "DARK" ? type === "linear" ? images.linearLoading : images.squareLoading : type === "linear" ? images.linearLoading : images.squareLoadingLight} alt="loading..."/>
            {type !== "linear" && <span className="flashit mt-1">{t('loading')}</span>}
        </div>
    );
};

export default Loading;