import React from 'react';
import classes from "./Landing.module.css";
import {Link} from "react-router-dom";

import {Overview, Panel} from "../../Routes/routes";
import ScrollBar from "../../../../components/ScrollBar";

const Landing = () => {
    return (
        <div className={`column jc-around ai-center height-100`}>
            <h1>Landing Page</h1>

            <ScrollBar>
                <div className={`column jc-center ai-center`}>
                    <span style={{borderRadius: "200px", padding: "1.5vh 8vw"}} className={`card-header-bg rounded my-5 width-30 flex jc-center ai-center`}><Link to={Overview} className={`text-color`}>panel</Link></span>
                </div>
            </ScrollBar>

        </div>
    );
};

export default Landing;
