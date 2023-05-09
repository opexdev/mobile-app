import React from 'react';
import classes from './SetTwoStepVerification.module.css'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useGetUserOtpStatus} from "../../../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import DeActiveOTP from "./components/DeActiveOTP";
import ActivateOTP from "./components/ActivateOTP";

const SetTwoStepVerification = () => {

    const {t} = useTranslation();
    const username = useSelector(state => state.auth.username);
    const {data: otp, isLoading, error,refetch : refetchOtp} = useGetUserOtpStatus(username)

    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        return otp ? <DeActiveOTP refetchOtp={refetchOtp}/> : <ActivateOTP refetchOtp={refetchOtp}/>
    }

    return (
        <div className={`${classes.container} width-100 column card-bg card-border rounded-8`}>
            <div className={`flex jc-start ai-center border-bottom card-header-bg px-5 py-2 ${classes.header}`}>
                <h4>{otp ? t("SetTwoStepVerification.!title") : t("SetTwoStepVerification.title")}</h4>
            </div>
            <div className={`column container ${classes.content} position-relative`}>
                {content()}
            </div>
        </div>
    );
};

export default SetTwoStepVerification;
