import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import Post from "./Post";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import {
  selectPostById,
  useGetPostQuery,
} from "../../store/features/postSlice";
import { EntityId } from "@reduxjs/toolkit";
import { Post as PostInterface } from "../../types";
import { useNewCommentMutation } from "../../store/features/commentSlice";

const PostDetails = () => {
  const { id } = useParams();

  const post = useSelector((state) => selectPostById(state, id as EntityId));

  const [newComment, {}] = useNewCommentMutation();

  const onNewComment = (comment: string) => {
    newComment({
      messageId: id as string,
      payload: {
        comment,
      },
    });
  };

  if (post) {
    return (
      <div className="m-2 mb-4 flex flex-col">
        <Post post={post}></Post>
        <div className=" pl-16">
          <NewComment
            placeHolder="Add a Comment"
            autoFocus={true}
            onNewComment={onNewComment}
          />
          <Comments id={id as string} />
        </div>
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
        <div className=" pl-16">
          <NewComment placeHolder="Add a Comment" autoFocus={true} />
          <Comments id={id as string} />
        </div>
      </div>
    );
  }
  return content;
};
