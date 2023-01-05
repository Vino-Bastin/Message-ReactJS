import { useParams } from "react-router-dom";
import Post from "./Post";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import {
  selectPostById,
  useGetPostQuery,
} from "../../store/features/postSlice";
import { EntityId } from "@reduxjs/toolkit";
import { Post as PostInterface } from "../../types";

const PostDetails = () => {
  const { id } = useParams();

  const post = useSelector((state) => selectPostById(state, id as EntityId));

  if (post) {
    return (
      <div className="m-2 mb-4 flex flex-col">
        <Post post={post}></Post>
        <Comments id={id as string} />
      </div>
    );
  } else {
    return <GetPostDetails id={id as string} />;
  }
};

export default PostDetails;

const GetPostDetails: React.FC<{ id: string }> = ({ id }) => {
  const { isError, isLoading, isSuccess, data, error } = useGetPostQuery(id);

  let content = <div>Something Went Wrong</div>;

  if (isLoading) content = <div>Loading</div>;
  else if (isError) content = <div>{error as string}</div>;
  else if (isSuccess) {
    content = (
      <div className="m-2 mb-4 flex flex-col">
        <Post post={data.entities[data.ids[0]] as PostInterface} />
        <Comments id={id as string} />
      </div>
    );
  }
  return content;
};
