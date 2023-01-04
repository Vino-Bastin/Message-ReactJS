import React from "react";
import { useUpdateReactionMutation } from "../../store/features/postSlice";
import { ReactionType } from "../../types";

const REACTIONS = {
  heart: "❤️",
  thumbsUp: "👍",
  laughs: "🤣",
  sad: "😌",
  angry: "😡",
};

interface ReactionsInterface {
  heart: number;
  thumbsUp: number;
  laughs: number;
  sad: number;
  angry: number;
  id: string;
}

const Reactions: React.FC<ReactionsInterface> = ({
  angry,
  heart,
  id,
  laughs,
  sad,
  thumbsUp,
}) => {
  const reactions = { angry, sad, laughs, thumbsUp, heart };

  const [update] = useUpdateReactionMutation();

  const updateReaction = (id: string, emojiName: ReactionType) => {
    update({
      messageId: id,
      reaction: {
        [emojiName]: (reactions[emojiName] += 1),
      },
    });
  };

  return (
    <div className="flex">
      {Object.entries(REACTIONS).map((entrie) => {
        let emoji = entrie[1];
        let emojiName = entrie[0] as ReactionType;
        return (
          <div
            key={emoji}
            className=" cursor-pointer mr-2 "
            onClick={updateReaction.bind(null, id, emojiName)}
          >{`${emoji} ${reactions[emojiName]}`}</div>
        );
      })}
    </div>
  );
};

export default Reactions;
