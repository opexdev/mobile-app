import React from "react";
import {setThemeInitiate} from "../../../../../../../../store/actions";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Security from "./components/Security/Security";
import Authentication from "./components/Authentication/Authentication";
import APIKey from "./components/APIKey/APIKey";


const Settings = (props) => {

    const {t} = useTranslation();
    const {path} = useParams()

    const content = () => {

        if (path === "profile") {
            return <Profile/>
        }
        if (path === "security") {
            return <Security/>
        }
        if (path === "authentication") {
            return <Authentication/>
        }
        if (path === "api-key") {
            return <APIKey/>
        }

    }

    return (
        <div className={`width-100 flex ai-center jc-center height-100`}>
            {content()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
