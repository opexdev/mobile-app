import React, {useState} from 'react';
import classes from "../SetTwoStepVerification.module.css";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../components/Button/Button";
import {requestForDeActiveOTP} from "js-api-client";

const DeActiveOTP = ({refetchOtp}) => {

    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const disableOTPHandler = () => {
        setIsLoading(true)
        requestForDeActiveOTP()
            .then(() => {
                refetchOtp()
                toast.success(t("SetTwoStepVerification.error"));
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <div className="width-100 column jc-center ai-center height-100">
            <div className={`flex jc-center ai-center`}>
                <img src={images.security} alt="security" style={{width:"20%"}}/>
            </div>
            <span className={`my-4`}>{t("SetTwoStepVerification.isActive")}</span>
            <Button
                buttonClass={`${classes.thisButton} ${classes.disableOtp}`}
                buttonTitle={isLoading ?
                    <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                         alt="linearLoading"/>
                    :
                    t("SetTwoStepVerification.deActive")}
                onClick={disableOTPHandler}
            />
            {error ? <span className={`fs-0-8 text-red mt-2`}>
                    {t("SetTwoStepVerification.serverError")}
                </span> : ""}

        </div>
    );
};

export default DeActiveOTP;
