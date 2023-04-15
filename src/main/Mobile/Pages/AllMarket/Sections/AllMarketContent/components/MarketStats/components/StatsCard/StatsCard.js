import React from 'react';
import classes from './StatsCard.module.css'

const StatsCard = ({title, children}) => {
    return (
        <div className={`${classes.container} card-bg card-border width-48 mr-5`}>
            <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                {title}
            </div>
            <div className={`${classes.content} row jc-around ai-center py-2 px-1`}>
                {children}
            </div>
        </div>
    );
};

export default StatsCard;
