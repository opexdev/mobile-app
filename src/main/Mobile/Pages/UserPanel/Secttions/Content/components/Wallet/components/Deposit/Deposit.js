import React, {useEffect, useRef} from 'react';
import classes from './Deposit.module.css'
import QRCode from "react-qr-code";
import {Trans, useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import {useParams} from "react-router-dom";
import {useGetDepositAddress} from "../../../../../../../../../../queries";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import Icon from "../../../../../../../../../../components/Icon/Icon";


const Deposit = () => {

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

    const {data: address, isLoading, error, refetch} = useGetDepositAddress(id)

    useEffect(() => {
        if (id !== "IRT") refetch()
    }, [id]);

    const helpText = () => {
        if (id === "TETH") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div className={`mt-1`}>
                    <span>{t("DepositWithdraw.DepositTETHContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://faucet.dimensions.network/')}>https://faucet.ropsten.be</span>
                    <span>{t("DepositWithdraw.DepositTETHContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 0.001,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 2
                        }}
                    />
                </div>
            </div>
        }
        if (id === "TBTC") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div className={`mt-1`}>
                    <span>{t("DepositWithdraw.DepositTBTCContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://testnet-faucet.com/btc-testnet')}>https://testnet-faucet.com/btc-testnet</span>
                    <span>{t("DepositWithdraw.DepositTBTCContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 0.001,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 10
                        }}
                    />
                </div>
            </div>
        }
        if (id === "TUSDT") {
            return <div>
                <span className={`text-red font-weight-bold`}>{t("DepositWithdraw.important")}: </span>
                <div className={`mt-1`}>
                    <span>{t("DepositWithdraw.DepositTUSDTContentBefore")}</span>
                    <span className={`hover-text cursor-pointer`}
                          onClick={() => window.open('https://bit.ly/ROPTokens')}>https://bit.ly/ROPTokens</span>
                    <span>{t("DepositWithdraw.DepositTUSDTContentAfter")}</span>
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.minDeposit"
                        values={{
                            min: 10,
                            currency: t("currency." + id)
                        }}
                    />
                </div>
                <div>
                    <Trans
                        i18nKey="DepositWithdraw.depositTime"
                        values={{
                            time: 2
                        }}
                    />
                </div>
            </div>
        }
    }


    const lowestPrice = (id) => {
        switch (id) {
            case "BTC":
                return 0.001;
            case "ETH":
                return 0.001;
            case "USDT":
                return 10;
            default:
                return 0;
        }
    };



   // if (id === "IRT") return <IRTDeposit/>
    if (isLoading) return <div className={`card-bg card-border height-98 width-95`}><Loading/></div>
    if (error) return <div className={`card-bg card-border height-98 width-95`}><Error retryFunc={refetch}/></div>


    return (
        <div className={`px-1 py-3 column jc-between ai-center text-center ${classes.content} card-bg card-border height-98 width-95`}>
           <div className={`column ai-center`}>
               <Trans
                   i18nKey="DepositWithdraw.minDepositText"
                   values={{
                       min: lowestPrice(id),
                       currency: t("currency." + id)
                   }}
               />
               <TextInput
                   after={
                       <Icon
                           iconName="icon-copy fs-02"
                           onClick={() => copyToClipboard()}
                           customClass={`hover-text cursor-pointer`}
                       />
                   }
                   customClass={`${classes.depositInput} my-3`}
                   readOnly={true}
                   type="text"
                   customRef={addressRef}
                   value={address.address}
               />
               <QRCode
                   value={address.address}
                   bgColor="var(--cardBody)"
                   fgColor="var(--textColor)"
                   level='L'
                   size={110}
               />
           </div>
            { (id === "TETH" || id === "TUSDT" || id === "TBTC") && helpText() }
        </div>
    );
};

export default Deposit;
