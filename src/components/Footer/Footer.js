import React from 'react';
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";

const Footer = () => {

    const {t} = useTranslation();

    return (
        <div className={`container column footerBackground font-size-sm flex jc-center ai-center py-3`}>
            <div className={`width-90 m-auto column jc-center ai-center text-center`}>
                <img className={`mb-1 img-lg-1`} src={images.opexLogoPlus} alt="logo"/>
                <p className={`mt-1`}>{t("footer.copyright")}</p>
            </div>
        </div>
    );
};

export default Footer;
