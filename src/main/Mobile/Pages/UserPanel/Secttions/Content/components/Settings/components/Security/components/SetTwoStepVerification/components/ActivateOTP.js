import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {requestForActivateOTP, sendInitialCodeToActivateOTP} from "js-api-client";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../../../../components/Loading/Loading";
import QRCode from "react-qr-code";
import TextInput from "../../../../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../../../../components/Button/Button";
import {images} from "../../../../../../../../../../../../../assets/images";
import classes from "../SetTwoStepVerification.module.css";

const ActivateOTP = ({refetchOtp}) => {

    const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reqOTP, setReqOTP] = useState();
    const [alert, setAlert] = useState([]);
    const [initialCode, setInitialCode] = useState("");

    const OTPInputHandler = (value) => {
        const userInput = value.replace(/[^0-9]+/g, "").slice(0, 6)
        setInitialCode(userInput)
    }


    const sendReqActivateOTP = () => {
        if (isLoading) return
        setError(false)
        setIsLoading(true)
        requestForActivateOTP()
            .then((res) => {
                setReqOTP(res.data)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const submitActivation = async (e) => {
        e.preventDefault();
        if (initialCode.length !== 6) {
            return setAlert([t("SetTwoStepVerification.initialCodeMin")])
        }
        setAlert([])
        setLoading(true)
        sendInitialCodeToActivateOTP(reqOTP.secret, initialCode)
            .then(() => {
                refetchOtp()
                toast.success(t("SetTwoStepVerification.success"));
            })
            .catch(() => {
                setAlert([t("SetTwoStepVerification.initialCodeError")])
            })
            .finally(() => {
                setLoading(false)
            });
    }

    if (loading) return <Loading/>

    if (reqOTP?.uri) {
        return <div className={`column width-100 jc-between ai-center height-100 px-3 py-2`}>
            <span className={``}>{t("SetTwoStepVerification.QRdescription")}</span>
            <QRCode
                value={reqOTP.uri}
                bgColor="var(--cardBody)"
                fgColor="var(--textColor)"
                level='L'
                size={140}
            />
            <form onSubmit={submitActivation} className={`column jc-between ai-center width-100`}>
                <TextInput
                    lead={t("SetTwoStepVerification.code")}
                    value={initialCode}
                    alerts={alert}
                    customClass={`${classes.thisInput} width-75 mb-1`}
                    onchange={(e) => OTPInputHandler(e.target.value)}
                    type="text"
                />
                <Button buttonClass={`${classes.thisButton} ${classes.submit} mt-1`} buttonTitle={t("submit")}/>
            </form>
        </div>
    }

    return (
        <div className={`column width-100 jc-around ai-center height-100 px-3`}>
            <span className={`text-center`}>{t("SetTwoStepVerification.description")}</span>
            <div className={`width-100 column jc-center ai-center`}>
                <Button
                    buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    buttonTitle={isLoading ? <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                                  alt="linearLoading"/> : t("SetTwoStepVerification.active")}
                    onClick={sendReqActivateOTP}
                />
                <span className={`fs-0-7 text-red mt-1`}>
                {error ? t("SetTwoStepVerification.serverError") : ""}
            </span>
            </div>
        </div>
    );
};

export default ActivateOTP;
