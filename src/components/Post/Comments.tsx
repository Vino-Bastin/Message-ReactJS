import NewComment from "./NewComment";
import UserProfilePhoto from "./UserProfilePhoto";
import PostUserName from "./PostUserName";
import React from "react";
import {
  useGetCommentsQuery,
  useNewReplyCommentMutation,
} from "../../store/features/commentSlice";
import { Comments as CommentsInterface } from "../../types";

const Comments: React.FC<{ id: string }> = ({ id }) => {
  const {
    data: comments,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetCommentsQuery(id);

  const [newReply] = useNewReplyCommentMutation();

  const onNewReplyComment = (comment: string, originComment?: string) => {
    if (!originComment) return;

    newReply({
      messageId: id,
      payload: {
        comment,
        originComment,
      },
    });
  };

  if (isLoading) return <div>loading</div>;

  if (isError) return <div>{error as string}</div>;

  if (isSuccess && comments.ids.length > 0) {
    return (
      <>
        <p className="mt-2 font-medium mb-2">Comments</p>
        {Object.entries(comments.entities).map((entrie) => {
          const comment = entrie[1] as CommentsInterface;
          return (
            <div
              className="flex mb-4 mt-4 border p-2 rounded-2xl"
              key={comment._id}
            >
              <div className="cursor-pointer">
                <UserProfilePhoto
                  url={`${comment.createdBy.firstName[0]}${comment.createdBy.lastName[0]}`}
                  size={8}
                />
              </div>

              <div className="pl-2 w-full">
                <PostUserName
                  createdAt={comment.createdAt}
                  userName={comment.createdBy.userName}
                />

                <p>{comment.comment}</p>

                {!comment.isReply ? (
                  <>
                    {comment.replies.length > 0 && (
                      <p className="mt-2 mb-2 font-medium">Replies</p>
                    )}
                    {comment.replies.map((reply) => {
                      return (
                        <div className="flex mb-4" key={reply._id}>
                          <div className="cursor-pointer">
                            <UserProfilePhoto
                              url={`${comment.createdBy.firstName[0]}${comment.createdBy.lastName[0]}`}
                              size={8}
                            />
                          </div>

                          <div className="pl-2">
                            <PostUserName
                              createdAt={reply.createdAt}
                              userName={reply.createdBy.userName}
                            />
                            <p>{reply.comment} </p>
                          </div>
                        </div>
                      );
                    })}
                    <NewComment
                      placeHolder="Your Replies"
                      originComment={comment._id}
                      onNewComment={onNewReplyComment}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return <div>No Comments found</div>;
};

export default Comments;
