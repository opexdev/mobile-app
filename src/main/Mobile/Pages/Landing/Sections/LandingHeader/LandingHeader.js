import React from 'react';
import HeaderBuilder from "../../../../../../components/HeaderBuilder/HeaderBuilder";
import {useTranslation} from "react-i18next";

const LandingHeader = () => {

    const {t} = useTranslation();

    return (
        <HeaderBuilder>
            <h3 className={``}>{t("Landing.title")}</h3>
        </HeaderBuilder>
    );
};

export default LandingHeader;
