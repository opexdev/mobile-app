import React, {useState} from 'react';
import classes from "./SendPhotosStep.module.css";
import {sendFileToUserStorage, setKycFileToUserAttributes} from "js-api-client";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import ImageInput from "../../../../../../../../../../../../components/ImageInput/ImageInput";
import Button from "../../../../../../../../../../../../components/Button/Button";

const SendPhotosStep = (props) => {

    const {t} = useTranslation();

    const [sending, setSending] = useState(false);
    const [images, setImages] = useState({
        img1: "",
        img2: "",
        img3: "",
    });
    const id = useSelector(state => state.auth.id);

    const sendImageHandler = async () => {
        if (images.img1 === "") {
            toast.error(t("SendPhotosStep.acceptFormEmpty"));
            return;
        }
        if (images.img2 === "") {
            toast.error(t("SendPhotosStep.selfieEmpty"));
            return;
        }
        if (images.img3 === "") {
            toast.error(t("SendPhotosStep.idCardEmpty"));
            return;
        }
        setSending(true)
        const acceptForm = await sendFileToUserStorage(id, images.img1)
        const selfie = await sendFileToUserStorage(id, images.img2)
        const idCard = await sendFileToUserStorage(id, images.img3)
        if (acceptForm.status === 200 && selfie.status === 200 && idCard.status === 200) {
            const paths = {
                selfiePath: `${selfie.data.path}`,
                idCardPath: `${idCard.data.path}`,
                acceptFormPath: `${acceptForm.data.path}`
            }
            setKycFileToUserAttributes(paths)
                .then(() => {
                    setSending(false)
                    props.nextStep()
                }).catch(() => {
                toast.error(t("SendPhotosStep.serverError"));
                setImages({...images})
            })
        } else {
            toast.error(t("SendPhotosStep.serverError"));
        }
        setSending(false)
    }

    return (
        <div className={`card-bg card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg px-4 py-2 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("SendPhotosStep.title")}</h3>
                </div>
            </div>
            <div className={`width-100 column jc-between px-4 py-2 ${classes.content}`}>
                <div className="column">
                    <span className={`mb-2`}>{t("SendPhotosStep.content")}</span>
                    <span>{t("SendPhotosStep.acceptForm")}{" "}<span
                        className="cursor-pointer hover-text">{" "}{t("SendPhotosStep.acceptFormLink")}</span></span>
                    <span>{t("SendPhotosStep.selfie")}{" "}<span
                        className="cursor-pointer hover-text">{" "}{t("SendPhotosStep.selfieLink")}</span></span>
                    <span>{t("SendPhotosStep.idCard")}{" "}<span className="cursor-pointer hover-text">
                        {" "}{t("SendPhotosStep.idCardLink")}</span>
                    </span>
                    <div className={`column jc-between ai-start mt-2`}>
                        {sending ?
                            <div className={`flex jc-center ai-center width-100`} style={{height: "30vh"}}>
                                <span className={`flashit`}>{t("SendPhotosStep.sendingData")}</span>
                            </div>
                            :
                            <>
                                <ImageInput
                                    zoneCustomClass={classes.zoneBox}
                                    title={t("SendPhotosStep.acceptFormDropzone")}
                                    onchange={(url) => setImages({...images, img1: url})}
                                />
                                <ImageInput
                                    zoneCustomClass={classes.zoneBox}
                                    title={t("SendPhotosStep.selfieDropzone")}
                                    onchange={(url) => setImages({...images, img2: url})}
                                />
                                <ImageInput
                                    zoneCustomClass={classes.zoneBox}
                                    title={t("SendPhotosStep.idCardDropzone")}
                                    onchange={(url) => setImages({...images, img3: url})}
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="column pt-1 jc-between">
                    <div className={`column mb-2`}>
                        <span>{t("SendPhotosStep.imageAcceptedFormat")}</span>
                        <span>{t("SendPhotosStep.imageAcceptedSize")}</span>
                    </div>
                    <div className={`row jc-center ai-center mt-2`}>
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.prev} ml-2`}
                            onClick={props.prevStep}
                            buttonTitle={t("prevStep")}
                        />
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.next} mr-2`}
                            onClick={sendImageHandler}
                            buttonTitle={t("nextStep")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendPhotosStep;
