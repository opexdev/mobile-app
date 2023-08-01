import React, {useEffect, useRef} from 'react';
import classes from "../../Deposit.module.css";
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {useGetDepositAddress} from "../../../../../../../../../../../../queries";
import {toast} from "react-hot-toast";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import QRCode from "react-qr-code";

const Address = ({network}) => {

    const {id} = useParams();
    const {t} = useTranslation();
    const addressRef = useRef(null);

    const copyToClipboard = () => {
        addressRef.current.select();
        document.execCommand("copy");
        toast.success(<Trans
            i18nKey="DepositWithdraw.success"
        />);
    };

    const {data: address, isLoading, error, refetch: refetchAddress} = useGetDepositAddress(id, network)

    useEffect(() => {
        if (id !== "IRT") {
            refetchAddress()
        }
    }, [network]);

    if (isLoading) return <span className={`flashit width-100 flex jc-center ai-center mt-10`}>{t('DepositWithdraw.gettingAddress')}</span>
    if (error) return <span className={` width-100 flex jc-center ai-center mt-10`}>{t('DepositWithdraw.errorGettingAddress')}</span>


    return (
        <div className={`column jc-between mt-10 width-100`}>
            <Trans
                i18nKey="DepositWithdraw.minDepositText"
            />
            <TextInput
                after={
                    <Icon
                        iconName="icon-copy fs-02"
                        onClick={() => copyToClipboard()}
                        customClass={`hover-text cursor-pointer`}
                    />
                }
                customClass={`${classes.depositInput} my-5 width-100 fs-0-8`}
                readOnly={true}
                type="text"
                customRef={addressRef}
                value={address.address}
            />
            <div className={`width-100 py-1 flex ai-center jc-center`}>
                <QRCode
                    value={address.address}
                    bgColor="var(--cardBody)"
                    fgColor="var(--textColor)"
                    level='L'
                    size={110}
                />
            </div>
        </div>
    );
};

export default Address;
