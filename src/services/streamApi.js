import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const streamApi = createApi({
    reducerPath: 'streamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getStreams: builder.query({
            query: () => '/streams',
        }),
    }),
});

export const { useGetStreamsQuery } = streamApi;