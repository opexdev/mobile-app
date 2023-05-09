import React from 'react';
import classes from './PersonalProfile.module.css'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetUserAttributes} from "../../../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import * as RoutesName from "../../../../../../../../../../Routes/routes";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {images} from "../../../../../../../../../../../../assets/images";

const PersonalProfile = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const KYCStatus = useSelector(state => state.auth.kyc);
    const KYCReason = useSelector(state => state.auth.kycReason);

    const {data: profile, isLoading} = useGetUserAttributes()

    const content = () => {
        if (isLoading) {
            return <div className={`my-10`} ><Loading/></div>
        }
        if (KYCStatus === "REQUESTED") {
            return <div className={`column jc-center ai-center py-2`}>
                <img className={`mb-2 floating`} src={images.pending} alt="kyc-rejected"/>
                <span className={`mt-5`}>{t('SendToAdminStep.pending')}</span>
            </div>
        }
        if (KYCStatus === "REJECTED") {
            return <div className={`column jc-center ai-center py-2`}>
                <img className={`mb-2 floating`} src={images.reject} alt="kyc-rejected"/>
                <span className={`mt-5`}>{t("SendToAdminStep.rejected")}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason === undefined ? t("SendToAdminStep.noData") : KYCReason}</span>
                <Button
                    buttonClass={`${classes.thisButton} mt-5`}
                    buttonTitle={t("PersonalProfile.doKYC")}
                    onClick={()=>navigate(RoutesName.Authentication)}
                    type="button"
                />
            </div>
        }
        if (KYCStatus === "BLOCKED") {
            return <div className={`column jc-center ai-center py-2`}>
                <img className={`mb-2 floating`} src={images.block} alt="kyc-rejected"/>
                <span className={`mt-5`}>{t('SendToAdminStep.blocked')}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason}</span>
            </div>
        }
        if (KYCStatus === "ACCEPTED") {
            return <>
                <span className={`text-green text-center my-2 fs-0-8`}>{t("PersonalProfile.cantEdit")}</span>
                <TextInput
                    lead={t('PersonalProfile.firstName')}
                    type="text"
                    disabled={true}
                    value={profile.firstName}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.lastName')}
                    type="text"
                    disabled={true}
                    value={profile.lastName}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    value={t("country." + profile.nationality)}
                    type="text"
                    lead={t('PersonalProfile.nationality')}
                    isDisabled={true}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.residence')}
                    type="text"
                    value={t("country." + profile.residence)}
                    isDisabled={true}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.birthday')}
                    type="text"
                    disabled={true}
                    value={profile.birthday}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.idNumber')}
                    type="text"
                    disabled={true}
                    value={profile.idNumber}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.mobile')}
                    type="text"
                    disabled={true}
                    value={profile.mobile}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.postalCode')}
                    type="text"
                    disabled={true}
                    value={profile.postalCode}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.email')}
                    type="email"
                    disabled={true}
                    value={profile.email}
                    customClass={`${classes.thisInput} my-1`}
                />
                <TextInput
                    lead={t('PersonalProfile.address')}
                    customClass={`${classes.thisInput} my-1`}
                    type="text"
                    disabled={true}
                    value={profile.address}
                />
            </>
        }
        return <div className={`column jc-center ai-center py-2`}>
            <span className={`mb-5`}>{t('PersonalProfile.noKYC')}</span>
            <Button
                buttonClass={`${classes.thisButton} mt-5`}
                buttonTitle={t("PersonalProfile.doKYC")}
                onClick={()=>navigate(RoutesName.Authentication)}
                type="button"
            />
        </div>
    }

    return (
        <div className={`${classes.container} width-100 column card-bg card-border rounded-8`}>
            <div className={`flex jc-start ai-center border-bottom card-header-bg px-5 py-2 ${classes.header}`}>
                <h4>{t("PersonalProfile.title")}</h4>
            </div>
            <div className={`column container ${classes.content} px-4 py-1`}>
                {content()}
            </div>
        </div>
    );
};

export default PersonalProfile;
