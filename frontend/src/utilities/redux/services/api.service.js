import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("bearerToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "application/json");
            return headers;
        },
        responseHandler: async (response) => {
            console.log("asdsadas");
            const data = await response.json();

            // Add a custom property to the response data
            data.customProperty = "Custom property value";

            // Return the modified response data
            return {data, status: response.status};
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
                url: data.url,
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
