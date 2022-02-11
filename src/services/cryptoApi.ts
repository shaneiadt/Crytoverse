import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '8c06b42bf7mshffd532b6c1b5d6dp1f7e9fjsn99e571997a6c'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers })

export interface Coin {
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    description: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    btcPrice: string;
    change: string;
    listedAt: number;
    rank: number;
    coinrankingUrl: string;
    ['24hVolume']: string;
    sparkline: { [key: number]: string }[];
    supply: {
        circulating: string;
        total: string | null;
        confirmed: boolean;
    },
    numberOfExchanges: number;
    numberOfMarkets: number;
    allTimeHigh: {
        price: string;
    }
    slug: string;
    links: {
        name: string;
        url: string;
        type: string;
    }[]
}

export interface Response {
    status: string;
    data: {
        stats: {
            total: number;
            totalCoins: number;
            totalMarkets: number;
            totalExchanges: number;
            totalMarketCap: string;
            total24hVolume: string;
        },
        coins: Coin[];
    }
};

interface CoinHistory {
    data: {
        change: string;
        history: { price: string; timestamp: number }[]
    }
}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<Response, number>({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query<{ data: { coin: Coin } }, string>({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query<CoinHistory, { coinId: string; timePeriod: string }>({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;