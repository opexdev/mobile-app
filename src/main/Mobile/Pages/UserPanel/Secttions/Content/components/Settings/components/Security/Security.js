import React from 'react';
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import ActiveSessions from "./components/ActiveSessions/ActiveSessions";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import SetTwoStepVerification from "./components/SetTwoStepVerification/SetTwoStepVerification";

const Security = () => {
    return (

        <ScrollBar>
            <ActiveSessions/>
            <ChangePassword/>
            <SetTwoStepVerification/>


        </ScrollBar>

    );
};

export default Security;
