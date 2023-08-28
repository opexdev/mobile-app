import React from 'react';
import classes from './Footer.module.css'
import {Trans, useTranslation} from "react-i18next";
import {toAbsoluteUrl} from "../../utils/utils";
import i18n from "i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <div className={`width-100 column fs-0-6 flex jc-center ai-center py-3 ${classes.container}`}>
            <div className={`width-90 m-auto column jc-center ai-center text-center`}>
                <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`mb-1 img-lg-1`}/>
                <Trans
                    i18nKey="Footer.copyright"
                    values={{
                        year: new Intl.DateTimeFormat(i18n.language , {year: 'numeric'}).format(new Date()),
                    }}
                />
            </div>
        </div>
    );
};

export default Footer;
