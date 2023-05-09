import React from "react";
import "./Browser.css"

const Browser = () => {
    const redirectURL = window.env.REACT_APP_BROWSER_URL
    window.location.replace(redirectURL);
}
export default Browser;