import React from 'react';
import classes from './MarketTitle.module.css'
import Title from "../../../../../../components/Title/Title";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {EasyTrading, Overview} from "../../../../Routes/routes";

const MarketTitle = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={`width-90 column m-auto py-3`}>
            <Title title={t('title')}/>
            <div className={`row jc-between ai-center mt-2`}>
                <Button
                    buttonClass={`${classes.thisButton} width-48`}
                    buttonTitle={t("MarketTitle.easyTrading")}
                    type="submit"
                    onClick={() => navigate(EasyTrading)}

                />
                <Button
                    buttonClass={`${classes.thisButton} width-48`}
                    buttonTitle={t("MarketTitle.advancedTrading")}
                    type="submit"
                    onClick={() => navigate(Overview)}
                />
            </div>
        </div>
    );
};

export default MarketTitle;
