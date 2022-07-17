import React from 'react';
import classes from './Title.module.css'

const Title = ({title}) => {
    return (
        <div className={`${classes.container}`}>
            <span className={`font-weight-bold font-size-md-plus-plus ${classes.title} px-2`} style={{position: 'relative'}}>
                {title}
                <span className={`${classes.underline} px-2`}></span>
            </span>
        </div>
    );
};

export default Title;
