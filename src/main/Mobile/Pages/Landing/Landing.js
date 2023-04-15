import React from 'react';
import classes from "./Landing.module.css";
import {images} from "../../../../assets/images";
import LandingHeader from "./Sections/LandingHeader/LandingHeader";
import LandingContent from "./Sections/LandingContent/LandingContent";

const Landing = () => {
    return (
        <div className={`width-100 ${classes.container} move-image column text-color`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <LandingHeader/>
            <LandingContent/>
        </div>
    );
};

export default Landing;
