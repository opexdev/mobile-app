import React from 'react';
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import ActiveSessions from "./components/ActiveSessions/ActiveSessions";
import ChangePassword from "./components/ChangePassword/ChangePassword";

const Security = () => {
    return (

        <ScrollBar>
            <ActiveSessions/>
            <ChangePassword/>


        </ScrollBar>

    );
};

export default Security;
