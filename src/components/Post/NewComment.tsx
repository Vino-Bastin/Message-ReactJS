import React from "react";
import SendSvgBtn from "../Utils/SendSvgBtn";

interface NewCommentInterface {
  placeHolder: string;
  autoFocus?: boolean;
}

const NewComment: React.FC<NewCommentInterface> = ({
  placeHolder,
  autoFocus,
}) => {
  return (
    <form className="mt-2 flex">
      <input
        className="h-6  w-full"
        type="text"
        autoFocus={autoFocus}
        placeholder={placeHolder}
      />
      <div className="cursor-pointer font-normal">
        <SendSvgBtn />
      </div>
    </form>
  );
};

export default NewComment;
