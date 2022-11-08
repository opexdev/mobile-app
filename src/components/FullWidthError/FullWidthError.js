import {useDispatch} from "react-redux";
import useQuery from "../../Hooks/useQuery";
import {loadConfig} from "../../store/actions";
import {useTranslation} from "react-i18next";
import Button from "../Button/Button";
import classes from "../../main/Mobile/Pages/User/User.module.css";
import React from "react";
import {images} from "../../assets/images";

const FullWidthError = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const query = useQuery();

    const tryLoadConfig = () => {
        const impersonate = query.get("impersonate");
        dispatch(loadConfig(impersonate))
    }

    return (
        <div className={`width-100 ${classes.container} move-image flex jc-center ai-center text-red`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`column jc-around ai-center card-border py-1`} style={{
                position: 'fixed',
                width: '70%',
                height: '50%',
                backgroundColor: 'var(--cardBodyAlpha)',
            }}>
                <img src={images.reject} alt="error" className={`img-lg-05 floating`}/>
                <span>{t("errorPage.errorText")}</span>
                <Button
                    buttonStyle={{
                        background: 'var(--darkGreen)',
                        color: '#000'
                    }}
                    buttonClass={`px-5`}
                    buttonTitle={t("errorPage.reload")}
                    onClick={tryLoadConfig}
                />
            </div>
        </div>
    );
};
export default FullWidthError;
