import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('bearerToken');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        get: builder.mutation({
            query: (data) => ({
                url: data.url,
            }),
        }),
        store: builder.mutation({
            query: (data) => ({
                url: data.url,
                method: "POST",
                body: data.body,
            }),
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${data.url}/${data.id}`,
                method: "PUT",
                body: data.body,
            }),
        }),
        delete: builder.mutation({
            query: (data) => ({
                url: data.url,
                method: "DELETE",
                body: data.body,
            }),
        }),
    }),
});

export const {
    useGetMutation,
    useStoreMutation,
    useUpdateMutation,
    useDeleteMutation,
} = serverApi;
