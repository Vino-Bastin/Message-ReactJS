import { createEntityAdapter } from "@reduxjs/toolkit";
import {
  CommentResponse,
  Comments,
  NewComment,
  NewReplyComment,
} from "../../types";
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

    newComment: builder.mutation({
      query: (arg: NewComment) => ({
        url: `/message/${arg.messageId}/comment`,
        method: "POST",
        body: arg.payload,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: (result, error, arg) => ["Comment"],
    }),

    newReplyComment: builder.mutation({
      query: (arg: NewReplyComment) => ({
        url: `/message/${arg.messageId}/reply`,
        method: "POST",
        body: arg.payload,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: (result, error, arg) => ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useNewCommentMutation,
  useNewReplyCommentMutation,
} = commentApi;
