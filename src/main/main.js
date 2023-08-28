import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {isBrowser} from "react-device-detect";
import Mobile from "./Mobile/Mobile";

const Main = ({baseURL}) => {
    if (isBrowser) {
        const redirectURL = window.env.REACT_APP_BROWSER_URL
        if (redirectURL) return window.location.replace(redirectURL);
    } else {
        return <Router basename={baseURL}><Mobile/></Router>
    }
};

export default Main;