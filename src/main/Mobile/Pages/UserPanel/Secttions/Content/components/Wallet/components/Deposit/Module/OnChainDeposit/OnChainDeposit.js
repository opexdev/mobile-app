import React, {useEffect, useRef, useState} from 'react';
import classes from './OnChainDeposit.module.css';
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {useGetDepositAddress} from "../../../../../../../../../../../../queries";
import i18n from "i18next";
import {useSelector} from "react-redux";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../../../../../utils/utils";
import toast from "react-hot-toast";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import QRCode from "react-qr-code";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";

const OnChainDeposit = ({gateways, currency}) => {
    const {t} = useTranslation();
    let  {id} = useParams();

    const [networkName, setNetworkName] = useState({value: 0, error: []})

    const {data: address, isLoading, error, refetch: refetchAddress} = useGetDepositAddress(id, gateways[networkName.value].chain)

    const selectRef = useRef()

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)


    const depositMin = new BN(gateways?.[networkName.value]?.depositMin).decimalPlaces(currencies[id]?.precision ?? 0).toFormat()
    const depositMax = new BN(gateways?.[networkName.value]?.depositMax).decimalPlaces(currencies[id]?.precision ?? 0).toFormat()

    useEffect(() => {
        refetchAddress()
    }, [gateways]);

    const addressRef = useRef(null);
    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans
            i18nKey="DepositWithdraw.success"
        />);
    };
    const content = () => {
        if (isLoading) return <span className={`flashit width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.gettingAddress')}</span>
        if (error) return <span className={` width-100 flex jc-center ai-center mt-6`}>{t('DepositWithdraw.errorGettingAddress')}</span>

        return <div className={`column jc-between width-90`}>

            <div className={`my-2`}>
                <Trans
                    i18nKey="DepositWithdraw.minDepositText"
                />
            </div>
            <TextInput
                after={
                    <Icon
                        iconName="icon-copy fs-02"
                        onClick={() => copyToClipboard()}
                        customClass={`hover-text cursor-pointer`}
                    />
                }
                readOnly={true}
                type="text"
                customRef={addressRef}
                value={address.address}
                customClass={`${classes.depositInput} width-100`}
            />

            <div className={`column ai-start width-80 mt-2 ${currency && "fs-0-7 width-95"}`}>
                <div className={``}>
                    <span className={`ml-05`}>{t('DepositWithdrawTx.minDeposit')}:</span>
                    <span className={``}>{new BN(depositMin).toString()} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                </div>
                <div className={``}>
                    <span className={`ml-05`}>{t('DepositWithdrawTx.maxDeposit')}:</span>
                    <span className={``}>{new BN(depositMax).toString()} {getCurrencyNameOrAlias(currencies[id], language)}</span>
                </div>
            </div>

            <div className={`width-100 py-1 flex ai-center jc-center mt-10`}>
                <QRCode
                    value={address.address}
                    bgColor="var(--cardBody)"
                    fgColor="var(--textColor)"
                    level='L'
                    size={140}
                />
            </div>

        </div>
    }

    return (
        <div className={`column jc-start ai-center card-bg card-border height-98 width-95 px-1 py-2`}>
            <TextInput
                select={true}
                placeholder={t('DepositWithdraw.selectNetwork')}
                options={gateways.map((chain, index) => ({
                    value: index,
                    label: `${chain.chain} - ${chain.implementationSymbol}`,
                    isDisabled: !chain.isActive // غیرفعال کردن در صورت عدم اجازه‌ی واریز
                }))}
                lead={t('DepositWithdraw.network')}
                type="select"
                value={gateways[networkName.value] && {
                    value: networkName.value,
                    label: `${gateways[networkName.value].chain} - ${gateways[networkName.value].implementationSymbol}`
                }}
                onchange={(e) => setNetworkName({ value: e?.value || 0, error: [] })}
                customRef={selectRef}
                alerts={networkName.error}
                customClass={`width-90 ${classes.thisInput}`}
            />
            {content()}
        </div>
    );
};

export default OnChainDeposit;
