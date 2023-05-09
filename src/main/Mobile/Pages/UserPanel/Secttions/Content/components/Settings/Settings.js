import React from "react";
import {setThemeInitiate} from "../../../../../../../../store/actions";
import {connect} from "react-redux";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Security from "./components/Security/Security";
import Authentication from "./components/Authentication/Authentication";
import APIKey from "./components/APIKey/APIKey";
import * as RoutesName from "../../../../../../Routes/routes";


const Settings = (props) => {


    const {path} = useParams()

    console.log(path)

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
        <div className={`width-100 flex ai-center jc-center height-100 px-3 py-1`}>


            <Routes>
                <Route path={RoutesName.Settings} element={<Navigate to={{pathname: `${RoutesName.Profile}`}} replace/>}/>
                <Route path={RoutesName.ProfileRelative} element={<Profile/>}/>
                <Route path={RoutesName.SecurityRelative} element={<Security/>}/>
                <Route path={RoutesName.AuthenticationRelative} element={<Authentication/>}/>
                <Route path={RoutesName.APIKeyRelative} element={<APIKey/>}/>
            </Routes>

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
