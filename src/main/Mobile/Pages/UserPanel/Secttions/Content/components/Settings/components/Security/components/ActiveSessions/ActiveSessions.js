import React from 'react';
import classes from './ActiveSessions.module.css'
import {useTranslation} from "react-i18next";
import {useGetUserActiveSessions} from "../../../../../../../../../../../../queries";
import {expireAllSessionsExceptCurrent} from "js-api-client";
import {toast} from "react-hot-toast";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import moment from "moment-jalaali";
import Session from "./components/Session/Session";

const ActiveSessions = () => {

    const {t} = useTranslation();
    const {data: activeSessions, isLoading, error, refetch} = useGetUserActiveSessions()

    const expireAllSessions = () => {
        expireAllSessionsExceptCurrent()
            .then(() => {
                toast.success(t("ActiveSessions.logOutAllSuccess"));
                refetch()
            }).catch(() => {
            toast.error(t("ActiveSessions.logOutAllError"));
        })
    }

    const content = () => {
        if (isLoading) return <Loading/>

        if (error) return <Error/>

        const current = activeSessions.filter((s) => s.inUse)[0]
        const other = activeSessions.filter((s) => !s.inUse)

        return <>
            <div className={`column ai-end ${classes.thisSession}`}>
                <span className={`text-orange mb-05 fs-0-8 width-100 text-center py-05`} style={{backgroundColor: 'var(--tableHeader)'}}>{t("ActiveSessions.thisSession")}</span>
                <div className={`row jc-between width-100 py-05 px-2`}>
                    <div className={`col-40 column jc-center ai-start pr-05`}>
                        <span>{moment(current?.lastAccess * 1000).format("HH:mm:ss , jYY/jMM/jDD")}</span>
                        {other.length > 0 ?
                            <span className={`cursor-pointer text-red fs-0-7`} onClick={expireAllSessions}>
                            {t("ActiveSessions.closeOtherSessions")}</span> : ""}
                    </div>
                    <div className={`col-60`}>
                        <div className={`row jc-end ai-center text-gray`}>
                            <span className={`ml-05`}>{current?.ipAddress}</span>
                            <Icon iconName="icon-globe fs-01"/>
                        </div>
                        <div className={`row jc-end ai-center text-gray`}>
                            <span className={`ml-05`}>{current?.agent}</span>
                            <Icon iconName="icon-info fs-01"/>
                        </div>
                    </div>
                </div>
                <div className={` width-100 text-center py-05 text-orange fs-0-8`} style={{backgroundColor: 'var(--tableHeader)'}}>
                    {t("ActiveSessions.otherSession")}
                </div>
            </div>
            <ScrollBar>
                {other.length > 0 ? other.map((list) => <Session list={list} key={list.id} reloadSessionsList={refetch}/>)
                    : <div className={`flex jc-center ai-center height-100 fs-0-8`}>
                        <span>{t("ActiveSessions.noData")}</span>
                    </div>
                }
            </ScrollBar>
        </>
    }

    return (
        <div className={`${classes.container} width-100 column card-bg card-border rounded-8`}>
            <div className={`flex jc-start ai-center border-bottom card-header-bg px-5 py-2 ${classes.header}`}>
                <h4>{t("ActiveSessions.title")}</h4>
            </div>
            <div className={`column container ${classes.content} position-relative`}>
                {content()}
            </div>
        </div>
    );
};

export default ActiveSessions;
