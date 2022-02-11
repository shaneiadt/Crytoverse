import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '8c06b42bf7mshffd532b6c1b5d6dp1f7e9fjsn99e571997a6c'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers });

interface Value {
    datePublished: string;
    description: string;
    name: string;
    url: string;
    image: {
        thumbnail: {
            height: number;
            width: number;
            contentUrl: string;
        }
    };
    provider: {
        name: string;
        image: {
            thumbnail: {
                height: number;
                width: number;
                contentUrl: string;
            }
        }
    }[]
}

interface Response {
    value: Value[];
}

interface NewsOptions {
    newsCategory: string;
    count: number;
}

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<Response, NewsOptions>({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;