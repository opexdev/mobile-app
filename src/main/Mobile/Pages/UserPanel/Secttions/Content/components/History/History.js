import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../../../Routes/routes";
import Transactions from "./components/Transactions/Transactions";
import DepositHistory from "./components/DepositHistory/DepositHistory";
import WithdrawHistory from "./components/WithdrawHistory/WithdrawHistory";


const History = () => {
    return (
        <Routes>
            <Route path={RoutesName.History} element={<Navigate to={{pathname: `${RoutesName.TransactionsHistory}`}} replace/>}/>
            <Route path={RoutesName.TransactionsHistoryRelative} element={<Transactions/>}/>
            <Route path={RoutesName.DepositHistoryRelative} element={<DepositHistory/>}/>
            <Route path={RoutesName.WithdrawHistoryRelative} element={<WithdrawHistory/>}/>
        </Routes>
    );
};

export default History;
