import React from 'react';
import classes from "./HelpStep.module.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../../../../../../../components/Button/Button";

const HelpStep = ({nextStep}) => {
    const {t} = useTranslation();

    return (
        <div className={`card-bg card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg px-4 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h4>{t("HelpStep.title")}</h4>
                </div>
            </div>
            <div className={`column jc-between px-4 py-2 ${classes.content}`}>
                <span>{t("HelpStep.content")}</span>
                <div className="row jc-center">
                    <Button
                        buttonClass={classes.thisButton}
                        onClick={nextStep}
                        buttonTitle={t("nextStep")}
                    />
                </div>
            </div>
        </div>
    );
};

export default HelpStep;
