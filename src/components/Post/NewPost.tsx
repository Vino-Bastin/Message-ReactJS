import { useNavigate } from "react-router-dom";
import { useUserInputValidate } from "../../hooks/useUserInputValidate";
import { useNewPostMutation } from "../../store/features/postSlice";
import CloseBtn from "../Utils/CloseBtn";
import ErrorMessage from "../Utils/ErrorMessage";

const initialState = {
  message: "",
};

const validators = {
  message: {
    validate: (value: string) => value.trim().length > 5,
    message: "New Message Must have at least 5 characters.",
  },
};

const NewPost = () => {
  const navigate = useNavigate();

  const { input, isValid, onChangeHandler, message } = useUserInputValidate(
    initialState,
    validators
  );

  const [newPost, { isLoading, isSuccess, isError, error }] =
    useNewPostMutation();

  if (isSuccess) navigate("/home");

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>{error as string}</div>;

  return (
    <div className="login-container bg-slate-50 h-screen z-10 absolute top-0 left-0 w-screen flex justify-center items-center">
      <div className="login-container-div relative rounded-2xl border flex flex-col items-center justify-center">
        <CloseBtn />
        <span className="new-message mt-4 mb-4">New Message</span>
        <div>
          <textarea
            className=" w-72 h-16 p-1"
            placeholder="your message"
            name="message"
            value={input.message}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        {message.message && <ErrorMessage message={message.message} />}
        <button
          disabled={!isValid}
          onClick={() => newPost(input)}
          className={`${
            isValid ? " cursor-pointer" : " cursor-no-drop"
          } m-2 p-1 w-72 rounded-2xl bg-black text-white`}
        >
          Post New Message
        </button>
      </div>
    </div>
  );
};

export default NewPost;
