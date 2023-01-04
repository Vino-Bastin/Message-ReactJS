import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/features/authSlice";
import { useUserInputValidate } from "../../hooks/useUserInputValidate";
import Logo from "../NavBar/Logo";
import UserInput from "./UserInput";
import { validators, initialState, userInputTemplate } from "./Login.constants";
import CloseBtn from "../Utils/CloseBtn";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { input, onChangeHandler, isValid, message } = useUserInputValidate(
    initialState,
    validators
  );

  const [sendLoginReq, { isError, data, isLoading, error, isSuccess }] =
    useLoginMutation();

  if (isSuccess) navigate("/");

  const LoginHandler = () => {
    sendLoginReq(input);
  };

  return (
    <div className="login-container bg-slate-50 h-screen z-10 absolute top-0 left-0 w-screen flex justify-center items-center">
      <div className="login-container-div relative rounded-2xl border flex flex-col items-center justify-center">
        <CloseBtn />
        <Logo />
        <span className=" mt-4">Login to Message</span>

        {userInputTemplate.map((el) => {
          return (
            <UserInput
              key={el.name}
              label={el.label}
              name={el.name}
              type={el.type}
              value={input[el.name]}
              onChangeHandler={onChangeHandler}
              message={message[el.name]}
            />
          );
        })}

        <button
          disabled={!isValid}
          onClick={LoginHandler}
          className={`${
            isValid ? " cursor-pointer" : " cursor-no-drop"
          } m-2 p-1 w-72 rounded-2xl bg-black text-white`}
        >
          Login
        </button>
        <button
          disabled
          className="cursor-no-drop m-2 p-1 w-72 rounded-2xl border-black border"
        >
          Forgot Password?
        </button>
        <div className="m-2 mb-4 sign-up">
          <span>Don't have an account ?</span>
          <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
