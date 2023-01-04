import { createEntityAdapter } from "@reduxjs/toolkit";
import { CommentResponse, Comments } from "../../types";
import baseApi from "../apiSlice";
import { transformErrorResponse } from "../helper";

const commentAdapter = createEntityAdapter<Comments>({
  selectId: (comment) => comment._id,
});

const initialState = commentAdapter.getInitialState();

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id: string) => `/message/${id}/comment`,

      transformResponse: (response: CommentResponse, meta, arg) => {
        return commentAdapter.setAll(initialState, response.data);
      },

      transformErrorResponse: transformErrorResponse,

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Comment" as const, id })),
              "Comment",
            ]
          : ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery } = commentApi;
