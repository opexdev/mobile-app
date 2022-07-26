import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useDispatch} from "react-redux";
import {activeActionSheet} from "../../../../../../../../store/actions/global";

const SettingsHeader = () => {

    const dispatch = useDispatch();


    return (
        <>
            <h3 className={`mr-2`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                امنیت
            </h3>
            <Icon iconName="icon-settings font-size-lg-plus flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default SettingsHeader;
