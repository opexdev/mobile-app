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

    const campaignLink = t("Campaign.link");
    const hasCampaign = t("Campaign.hasCampaign") === "true";

    const clickHandler = () => {
        if (campaignLink) {
            window.open(campaignLink, "_blank");
        } else {
            console.error("Link not found");
        }
    }

    return (
        <div className={`width-90 column m-auto py-3`}>
            <Title title={t('title')}/>

            { hasCampaign && <div className={`column jc-center ai-center fs-01 cursor-pointer card-bg card-border width-100 mb-2 mt-3 px-4 py-1`} onClick={()=>clickHandler()}>
                <span className={`text-orange`}>{t("Campaign.title")}</span>
                <span className={`mt-05 ${classes.flashit}`}>{t("Campaign.content")}</span>
            </div>}

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
