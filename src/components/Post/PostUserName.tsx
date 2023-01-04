import React from "react";
import { parseISO, formatDistance } from "date-fns";

interface PostUserNameInterface {
  createdAt: string;
  userName: string;
}

const PostUserName: React.FC<PostUserNameInterface> = ({
  createdAt,
  userName,
}) => {
  const postCreatedAt = formatDistance(parseISO(createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="flex">
      <p className="mr-2 font-bold">@{userName}</p>
      <p>{postCreatedAt}</p>
    </div>
  );
};

export default PostUserName;
