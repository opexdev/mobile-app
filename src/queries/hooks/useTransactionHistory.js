import {useQuery} from "@tanstack/react-query";

export const useTransactionHistory = (user_id, query) => {

    return useQuery(
        ['allTxHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getWithdrawTxsFunc(user_id, query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawTxsFunc = async (user_id, query) => {

    return ;
}

