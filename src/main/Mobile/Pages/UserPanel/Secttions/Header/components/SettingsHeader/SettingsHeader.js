import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";

const SettingsHeader = ({showSubMenu, showMenu}) => {
    return (
        <>
            <h3 className={`mr-2`}>امنیت</h3>


            <Icon iconName="icon-settings font-size-lg-plus flex" onClick={showMenu}/>
        </>
    );
};

export default SettingsHeader;
