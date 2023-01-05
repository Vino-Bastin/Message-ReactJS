import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto";
import Reactions from "./Reactions";
import PostUserName from "./PostUserName";
import { Post as PostInterface } from "../../types";

interface PostComponentInterface {
  post: PostInterface;
}

const Post: React.FC<PostComponentInterface> = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPostDetails = (id: string): void => {
    if (location.pathname !== `/post/${id}`) navigate(`/post/${id}`);
  };

  return (
    <>
      <div id="post" className="flex m-2 mb-4">
        <div className="w-12">
          <UserProfilePhoto
            url={`${post.createdBy.firstName[0]}${post.createdBy.lastName[0]}`}
          />
        </div>
        <div className="pl-2 w-full">
          <div className="border rounded-2xl p-2">
            <PostUserName
              createdAt={post.createdAt}
              userName={post.createdBy.userName}
            />
            <div className="mt-2">
              <p onClick={navigateToPostDetails.bind(null, post._id)}>
                {post.message}
              </p>

              <div className="flex mt-4 justify-between pl-2 pr-2">
                <Reactions
                  angry={post.angry}
                  heart={post.heart}
                  laughs={post.laughs}
                  sad={post.sad}
                  thumbsUp={post.thumbsUp}
                  id={post._id}
                />
                <div>{post.comments} Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Post);
