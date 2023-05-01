import axios from "axios";

export const createOrder = async (symbol, side, order, type = "LIMIT", timeInForce = "GTC", timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('symbol',symbol );
    params.append('side', side);
    params.append('type', type);
    params.append('timeInForce', timeInForce);
    params.append('timestamp', timestamp);
    params.append('quantity', order.reqAmount.toString());
    params.append('price', order.pricePerUnit.toString());
    return axios.post(`/api/v3/order`, null, {
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
