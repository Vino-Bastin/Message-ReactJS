import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import baseApi from "../apiSlice";
import {
  Post,
  PostResponse,
  PostsResponse,
  ReactionType,
  UpdateReaction,
} from "../../types";
import { transformErrorResponse } from "../helper";
import { RootState } from "../store";

//* create entity adapter for post slice
const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post._id,
});

//* get a initial state for store slice
const initialState = postAdapter.getInitialState();

//* extending base api for post request
export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* query to get all the request
    getPosts: builder.query({
      query: () => "/message",
      //* update post slice with response
      transformResponse: (response: PostsResponse) => {
        return postAdapter.setAll(initialState, response.data);
      },
      //* transform error response to user friendly format
      transformErrorResponse: transformErrorResponse,
      //* tags for each catch
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Post" as const, id: id })),
              "Post",
            ]
          : ["Post"],
    }),

    //* get a post
    getPost: builder.query({
      query: (id: string) => `/message/${id}`,
      //* update post slice with response
      transformResponse: (response: PostResponse) => {
        return postAdapter.addOne(initialState, response.data);
      },
      //* transform error response to user friendly format
      transformErrorResponse: transformErrorResponse,
      //* tags for each catch
      providesTags: (result, error, arg) =>
        result
          ? [...result.ids.map((id) => ({ type: "Post" as const, id })), "Post"]
          : ["Post"],
    }),

    newPost: builder.mutation({
      query: (payload) => ({
        url: "/message",
        method: "POST",
        body: payload,
      }),
      //* transform error response to user friendly format
      transformErrorResponse: transformErrorResponse,
      //* invalidate tag's to refetch data from the server
      invalidatesTags: () => ["Post"],
    }),

    updateReaction: builder.mutation({
      query: ({ messageId, reaction }: UpdateReaction) => ({
        url: `/message/${messageId}`,
        method: "PATCH",
        body: reaction,
      }),

      onQueryStarted: async (
        { messageId, reaction },
        { dispatch, queryFulfilled }
      ) => {
        //* select emoji name from the query input
        const emoji = Object.keys(reaction)[0] as ReactionType;
        //* dispatch action to update reaction in getPosts slice
        const updateResult = dispatch(
          postApi.util.updateQueryData("getPosts", "getPosts", (draft) => {
            //* get the post details from the posts entity
            const post = draft.entities[messageId];
            //* if post present the update reaction
            if (post) post[emoji]++;
          })
        );
        try {
          //* waiting server response
          await queryFulfilled;
        } catch {
          //* if server respond error for update reaction request the undo changes in post reaction update
          updateResult.undo();
        }
      },
    }),
  }),
});

//* to get query result object
const selectPostsResult = postApi.endpoints.getPosts.select("getPosts");

//* selecting posts data from posts query object with memorization
const postsSelector = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

//* generating selectors from normalized posts data
export const {
  selectAll: selectAllPosts,
  selectIds: selectAllIds,
  selectById: selectPostById,
} = postAdapter.getSelectors(
  (state) => postsSelector(state as RootState) ?? initialState
);

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useNewPostMutation,
  useUpdateReactionMutation,
} = postApi;
