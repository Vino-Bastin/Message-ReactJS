import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import {
  selectAllPosts,
  useGetPostsQuery,
} from "../../store/features/postSlice";

const Posts: React.FC = () => {
  const { isError, error, isLoading, isSuccess } = useGetPostsQuery("getPosts");
  const posts = useSelector(selectAllPosts);

  let content: JSX.Element | JSX.Element[] = <div>Something went Wrong</div>;

  if (isLoading) content = <div>Loading</div>;
  if (isError) content = <div>{error as string}</div>;
  if (isSuccess) {
    content = posts.map((post) => {
      return <Post post={post} key={post._id} />;
    });
  }

  return <>{content} </>;
};

export default Posts;
