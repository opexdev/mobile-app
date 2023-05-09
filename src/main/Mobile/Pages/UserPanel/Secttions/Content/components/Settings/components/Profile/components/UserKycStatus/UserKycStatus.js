import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as RoutesName from "../../../../../../../../../../Routes/routes";
import {images} from "../../../../../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";

const UserKycStatus = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const KYCStatus = useSelector(state => state.auth.kyc);
    const KYCReason = useSelector(state => state.auth.kycReason);

   // if (userKycStatus !== "ACCEPTED") navigate(RoutesName.Security, {replace: true});


    const content = () => {

        if (KYCStatus === "REQUESTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.pending} alt="kyc-pending"/>
                <span className={`mt-2`}>{t("SendToAdminStep.pending")}</span>
            </div>
        }
        if (KYCStatus === "ACCEPTED") {
            return <span className={`text-green`}>{t("PersonalProfile.cantEdit")}</span>
        }
        if (KYCStatus === "REJECTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.reject} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToAdminStep.rejected")}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason === undefined ? t("SendToAdminStep.noData") : KYCReason}</span>

            </div>
        }
        if (KYCStatus === "BLOCKED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.block} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToAdminStep.blocked")}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason}</span>
            </div>
        }


    }


    return (
        <div className={`card-bg card-border px-4 py-1 mb-2 text-center`}>
            {content()}

        </div>
    );
};

export default UserKycStatus;
