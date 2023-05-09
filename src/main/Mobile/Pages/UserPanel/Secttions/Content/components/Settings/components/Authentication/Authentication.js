import React, {useState} from 'react';
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import HelpStep from "./components/HelpStep/HelpStep";
import PersonalProfileStep from "./components/PersonalProfileStep/PersonalProfileStep";
import SendPhotosStep from "./components/SendPhotosStep/SendPhotosStep";
import SendToAdminStep from "./components/SendToAdminStep/SendToAdminStep";

const Authentication = () => {

    const {t} = useTranslation();
    const [step, setStep] = useState(1);

    const KYCStatus = useSelector(state => state.auth.kyc);

    const titleHandler = () => {

        if (step === 1) return t("Authentication.HelpStep")
        if (step === 2) return t("Authentication.PersonalProfileStep")
        if (step === 3) return t("Authentication.SendPhotosStep")
        if (step === 4) return t("Authentication.SendToAdminStep")

    }

    const stepSwitch = (step) => {
        switch (step) {
            case 1:
                return <HelpStep nextStep={() => setStep(2)}/>;
            case 2:
                return (
                    <PersonalProfileStep
                        prevStep={() => setStep(1)}
                        nextStep={() => setStep(3)}
                    />
                );
            case 3:
                return (
                    <SendPhotosStep
                        prevStep={() => setStep(2)}
                        nextStep={() => setStep(4)}
                    />
                );
            case 4:
                return <SendToAdminStep prevStep={() => setStep(3)}/>;
            default:
                return <HelpStep/>;
        }
    };


    return (
        <div className={`column width-100 height-100`}>
            <div className={`width-100 column jc-center ai-center mb-3`}>
                <span className={`font-weight-bold my-2`}>{titleHandler()}</span>
                <div className="row card-bg card-border width-80" >
                    {step === 1 ? (
                        <span className="col-25"
                              style={{
                                  backgroundColor: "var(--activeTab)",
                                  height: "0.75vh",
                                  borderBottomRightRadius: "15px",
                                  borderTopRightRadius: "15px",
                              }}
                        />
                    ) : (
                        ""
                    )}
                    {step === 2 ? (
                        <span className="col-50"
                              style={{
                                  backgroundColor: "var(--activeTab)",
                                  height: "0.75vh",
                                  borderBottomRightRadius: "15px",
                                  borderTopRightRadius: "15px",
                                  transition: "all 5s",
                              }}
                        />
                    ) : (
                        ""
                    )}
                    {step === 3 ? (
                        <span className="col-75"
                              style={{
                                  backgroundColor: "var(--activeTab)",
                                  height: "0.75vh",
                                  borderBottomRightRadius: "15px",
                                  borderTopRightRadius: "15px",
                              }}
                        />
                    ) : (
                        ""
                    )}
                    {step === 4 ? (
                        <span className="col-100"
                              style={{
                                  backgroundColor: "var(--activeTab)",
                                  height: "0.75vh",
                                  borderRadius: "15px",
                              }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <ScrollBar>
                {stepSwitch(step)}
            </ScrollBar>
        </div>
    );
};

export default Authentication;
