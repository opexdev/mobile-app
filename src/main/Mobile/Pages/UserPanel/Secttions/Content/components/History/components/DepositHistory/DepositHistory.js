import React, {useEffect, useRef, useState} from 'react';
import classes from './DepositHistory.module.css'
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useGetDepositHistory} from "../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import DepositHistoryTable from "../DepositHistoryTable/DepositHistoryTable";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import ToggleSwitch from "../../../../../../../../../../components/ToggleSwitch/ToggleSwitch";
import Button from "../../../../../../../../../../components/Button/Button";

const DepositHistory = () => {

    const {t} = useTranslation();
    const coins = useSelector((state) => state.exchange.assets)

    const [query, setQuery] = useState({
        "currency": null, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": null,
        "endTime": null,
        "ascendingByTime": false,
        "limit": 10,
        "offset": 0,
    });

    const {data, isLoading, error, refetch} = useGetDepositHistory(query);
    const pagination = {
        page: (query.offset / query.limit) + 1,
        isLastPage: data?.length < query.limit
    }

    const isFirst = useRef(true);

    useEffect(() => {
        if (!isFirst.current) scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [data]);

    const categories = ['DEPOSIT', 'FEE', 'TRADE', 'WITHDRAW', 'ORDER_CANCEL', 'ORDER_CREATE', 'ORDER_FINALIZED'];

    const currenciesOptions = [{value: null, label: t('all')}]
    const categoryOptions = [{value: null, label: t('all')}]

    const size = [10, 20, 30, 40, 50]

    categories.forEach((o) => {
        categoryOptions.push({value: o, label: t('TransactionCategory.' + o)})
    })

    coins.forEach((o) => {
        currenciesOptions.push({value: o, label: t('currency.' + o)})
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
        if (isLoading) return <div className={`mt-2 mb-7`}><Loading/></div>
        if (error) return <div className={`mt-2 mb-7`}><Error/></div>
        if (data?.length === 0) return <div className={`flex jc-center ai-center mt-2 mb-7`}>{t("noTx")}</div>
        else return data?.map( (c , index) =>
            <DepositHistoryTable data={c} key={index}/>
        )
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
        <div className={`width-100 column jc-center ai-center my-3`} ref={scrollRef}>
            <div className={`width-90 column jc-center ai-center wrap fs-0-9 border card-bg px-4 py-2 rounded-8 ${classes.header}`}>
                <TextInput
                    select={true}
                    placeholder={t('history.currency')}
                    options={currenciesOptions}
                    lead={t('history.currency')}
                    type="select"
                    value={{
                        value: query?.currency,
                        label:  query?.currency ? t('currency.'+ query?.currency) : t('all'),
                    }}
                    onchange={(e) => setQuery({...query, currency: e.value, offset:0})}
                    customClass={`width-100 my-1 ${classes.thisInput}`}
                />
                <TextInput
                    select={true}
                    placeholder={t('history.size')}
                    options={size?.map(s => {
                        return {label: s, value: s}
                    })}
                    lead={t('history.size')}
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
                    //placeholder={t('history.size')}
                    //numberOfMonths={2}
                    plugins={[
                        <DatePanel position="bottom"/>
                    ]}
                    lead={t('history.period')}
                    type="input"
                    onChange={startDateHandler}
                    /*value={[query.startTime, query.endTime]}*/
                    value={[query.startTime, query.endTime]}
                    dateSeparator={" " + t('to') + " "}

                    hideOnScroll
                    range
                    dataPanelPosition="Bottom"
                    position="bottom-center"
                    customClass={`width-100 my-1 ${classes.thisInput} ${classes.datePicker} `}
                />
                <div className={`width-100 my-1 mt-2 row jc-center ai-center fs-0-8`}>
                    <span className={`fs-0-8 ml-4`}>{t("history.ascendingByTime")}</span>
                    <ToggleSwitch

                        onchange={ () => setQuery(prevState => {return {
                            ...prevState,
                            ascendingByTime: !prevState.ascendingByTime
                        }}) }
                        checked={!query?.ascendingByTime}/>
                </div>
            </div>

            <div className={`width-90 column jc-center ai-center wrap fs-0-9 border card-bg rounded-8 my-4 ${classes.content}`} ref={scrollRef}>
                <div className={`card-header-bg row jc-between ai-center px-4 py-3 width-100`}>
                    <span className={`font-weight-bold fs-02`}>{t("history.depositHistory")}</span>
                    <div className={`row mr-1 text-gray fs-0-8`}>
                        {periodTextHandler()}
                    </div>
                </div>

                <div className={`${classes.container} width-100 column jc-center ai-center`}>

                    <div className={`${classes.subHeader} width-100 px-4 py-2 text-start fs-01 font-weight-bold`}>
                        <Trans
                            i18nKey="history.page"
                            values={{
                                page: (query?.offset / query?.limit) + 1,
                            }}
                        />
                    </div>

                    {content()}

                </div>






            </div>

            <div className={`width-86 py-2 row jc-between ai-center`}>
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


        </div>
    );
};

export default DepositHistory;
