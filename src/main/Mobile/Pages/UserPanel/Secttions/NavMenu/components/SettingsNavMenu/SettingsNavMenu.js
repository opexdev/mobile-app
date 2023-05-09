import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";
import {useTranslation} from "react-i18next";

const SettingsNavMenu = () => {

    const {t} = useTranslation();

    return (
        <div className={`width-100 ${classes.container} row ai-center jc-between`}>

            <NavLink
                to={Routes.Profile}
                className={({isActive}) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-username-icon fs-06"/>
                <span className={`fs-0-6`}>{t("SettingsSubMenu.userProfile")}</span>
            </NavLink>
            <NavLink
                to={Routes.Security}
                className={({isActive}) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-privacy-icon-1 fs-06"/>
                <span className={`fs-0-6`}>{t("SettingsSubMenu.security")}</span>
            </NavLink>
            <NavLink
                to={Routes.Authentication}
                className={({isActive}) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-file-user-icon fs-06"/>

                <span className={`fs-0-6`}>{t("SettingsSubMenu.authentication")}</span>
            </NavLink>
            <NavLink
                to={Routes.APIKey}
                className={({isActive}) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-user-key-icon fs-06"/>

                <span className={`fs-0-6`}> {t("APIKey.title")}</span>
            </NavLink>
        </div>
    );
};

export default SettingsNavMenu;
