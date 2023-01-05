import React, { useRef } from "react";
import SendSvgBtn from "../Utils/SendSvgBtn";

interface NewCommentInterface {
  placeHolder: string;
  autoFocus?: boolean;
  originComment?: string;
  onNewComment?: (comment: string, originComment?: string) => void;
}

const NewComment: React.FC<NewCommentInterface> = ({
  placeHolder,
  autoFocus,
  originComment,
  onNewComment,
}) => {
  const userInputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (onNewComment && userInputRef.current?.value) {
      onNewComment(userInputRef.current?.value, originComment);
      userInputRef.current.value = "";
    }
  };

  return (
    <form className="mt-2 flex">
      <input
        ref={userInputRef}
        className="h-6  w-full"
        type="text"
        autoFocus={autoFocus}
        placeholder={placeHolder}
      />
      <div onClick={onClickHandler} className="cursor-pointer font-normal">
        <SendSvgBtn />
      </div>
    </form>
  );
};

export default NewComment;
