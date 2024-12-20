import React, {useEffect, useRef, useState} from 'react';
import classes from './TransactionHistory.module.css'
import * as RoutesName from "../../../../../../Routes/routes";
import {activeOrderLayout} from "../../../../../../../../store/actions/global";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import TextInput from "../../../../../../../../components/TextInput/TextInput";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import TransactionHistoryTable from "./components/TransactionHistoryTable/TransactionHistoryTable";
import {useTransactionHistory} from "../../../../../../../../queries";
import Date from "../../../../../../../../components/Date/Date";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Button from "../../../../../../../../components/Button/Button";
import ToggleSwitch from "../../../../../../../../components/ToggleSwitch/ToggleSwitch";

const TransactionHistory = () => {

    const {t} = useTranslation();
    const user_id = useSelector((state) => state.auth.id)
    const coins = useSelector((state) => state.exchange.assets)
    const [query, setQuery] = useState({
        "coin": null, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": null,
        "endTime": null,
        "ascendingByTime": false,
        "limit": 10,
        "offset": 0
    });

    const dispatch = useDispatch();
    const location = useLocation();


    const {data, isLoading, error} = useTransactionHistory(user_id, query);

    useEffect(() => {
        if (!isFirst.current) scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [data]);

    useEffect(() => {

        if (location.pathname === RoutesName.TxHistory) {
            dispatch(activeOrderLayout(true))
        }
        return () => {
            dispatch(activeOrderLayout(false))
        }

    }, [location.pathname]);


    const pagination = {
        page: (query.offset / query.limit) + 1,
        isLastPage: data?.length < query.limit
    }

    const isFirst = useRef(true);

    useEffect(() => {
        if (!isFirst.current) scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [data]);

    const categories = ['DEPOSIT', 'FEE', 'TRADE', 'WITHDRAW', 'ORDER_CANCEL', 'ORDER_CREATE', 'ORDER_FINALIZED'];

    const coinsOptions = [{value: null, label: t('all')}]
    const categoryOptions = [{value: null, label: t('all')}]
    const size = [10, 20, 30, 40, 50]

    categories.forEach((o) => {
        categoryOptions.push({value: o, label: t('TransactionCategory.' + o)})
    })

    coins.forEach((o) => {
        coinsOptions.push({value: o, label: t('currency.' + o)})
    })

    const scrollRef = useRef(null);

    const pageSizeHandler = (e) => {
        setQuery({
            ...query,
            limit: e.value,
            offset: 0
        })
    }

    const firstPage = () => {
        setQuery({
            ...query,
            offset: 0
        })
    }
    const nextPage = () => {
        isFirst.current = false;
        setQuery({
            ...query,
            offset: query.offset + query.limit
        })
    }
    const prevPage = () => {
        setQuery({
            ...query,
            offset: query.offset - query.limit
        })
    }
    const startDateHandler = (dateRange) => {
        const start = dateRange[0]  ? moment.unix(dateRange[0].toUnix()).startOf("day").valueOf() : null;
        const end = dateRange[1]  ? moment.unix(dateRange[1].toUnix()).endOf("day").valueOf() : null;
        setQuery({
            ...query,
            startTime: start,
            endTime: end
        })
    }

    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        if (data?.length === 0) return <div style={{height: "40vh"}} className={`flex jc-center ai-center`}>{t("noTx")}</div>
        else return <>
            <TransactionHistoryTable txs={data} offset={query?.offset} />
        </>
    }

    const periodTextHandler = () => {
        if (query?.startTime && query?.endTime) return <>
            <span className={`mx-05`}>{t("from")}</span>
            <span><Date date={query?.startTime}/></span>
            <span className={`mx-05`}>{t("until")}</span>
            <span><Date date={query?.endTime}/></span>
        </>
        if (query?.startTime) return <>
            <span className={`mx-05`}>{t("from")}</span>
            <span><Date date={query?.startTime}/></span>
            <span className={`mx-05`}>{t("until")}</span>
            <span><Date date={moment().endOf("day").valueOf()}/></span>
        </>
    }

    return (
        <div className={`width-100 column ai-center jc-start height-100 px-3 py-1 ${classes.container}`}>
            <div className={`width-100 border card-bg px-5 py-2 rounded-8 column jc-between ai-center`}>
                <TextInput
                    select={true}
                    placeholder={t('TransactionHistory.coin')}
                    options={coinsOptions}
                    lead={t('TransactionHistory.coin')}
                    type="select"
                    value={{
                        value: query?.coin,
                        label:  query?.coin ? t('currency.'+ query?.coin) : t('all'),
                    }}
                    onchange={(e) => setQuery({...query, coin: e.value, offset:0})}
                    customClass={`width-100 my-1 ${classes.thisInput}`}
                />
                <TextInput
                    select={true}
                    placeholder={t('TransactionHistory.category')}
                    options={categoryOptions}
                    lead={t('TransactionHistory.category')}
                    type="select"
                    value={{
                        value: query?.category,
                        label: query?.category ? t('TransactionCategory.'+ query?.category) : t('all'),
                    }}
                    onchange={(e) => setQuery({...query, category: e.value, offset:0})}
                    customClass={`width-100 my-1 ${classes.thisInput}`}
                />
                <TextInput
                    select={true}
                    placeholder={t('TransactionHistory.size')}
                    options={size?.map(s => {
                        return {label: s, value: s}
                    })}
                    lead={t('TransactionHistory.size')}
                    type="select"
                    value={{
                        value: query?.limit,
                        label: query?.limit,
                    }}
                    onchange={pageSizeHandler}
                    customClass={`width-100 my-1 ${classes.thisInput}`}
                />
                <TextInput
                    datePicker={true}
                    plugins={[
                        <DatePanel position="bottom"/>
                    ]}
                    lead={t('TransactionHistory.period')}
                    type="input"
                    onChange={startDateHandler}
                    value={[query.startTime, query.endTime]}
                    dateSeparator={" " + t('to') + " "}
                    range
                    hideOnScroll
                    dataPanelPosition="Bottom"
                    position="bottom-center"
                    customClass={`width-100 my-1 ${classes.thisInput}`}
                />

                <div className={`row jc-between ai-center my-1 px-1 fs-0-8 width-100`}>
                    <span className={`fs-0-8 ml-1`}>{t("TransactionHistory.ascendingByTime")}</span>
                    <ToggleSwitch
                        onchange={ () => setQuery(prevState => {return {
                            ...prevState,
                            ascendingByTime: !prevState.ascendingByTime
                        }}) }
                        checked={!query?.ascendingByTime}/>
                </div>
            </div>
            <div className={`card-bg card-border width-100 my-3`} ref={scrollRef}>
                <div className={`card-header-bg row jc-between ai-center px-5 py-3`}>
                    <div className={`row jc-center ai-center`}>
                        <h3 className={``}>{t("txHistory.title")}</h3>
                    </div>
                    <div className={`row mr-1 text-gray fs-0-8`}>
                        {periodTextHandler()}
                    </div>
                </div>
                <div>
                    {content()}
                </div>
            </div>
            <div className={`row jc-between ai-center width-100 border card-bg px-5 py-3 mb-2 rounded-8`}>
                <Button
                    buttonClass={`${classes.thisButton} width-30`}
                    buttonTitle={t('first')}
                    disabled={pagination.page === 1}
                    type="button"
                    onClick={firstPage}
                />
                <Button
                    buttonClass={`${classes.thisButton} width-30`}
                    buttonTitle={t('prev')}
                    disabled={pagination.page === 1}
                    type="button"
                    onClick={prevPage}
                />
                <Button
                    buttonClass={`${classes.thisButton} width-30`}
                    buttonTitle={t('next')}
                    disabled={pagination.isLastPage}
                    type="button"
                    onClick={nextPage}
                />
            </div>

            <div className={`width-100 pb-1`}/>

        </div>
    );
};

export default TransactionHistory;
