import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserInputValidate } from "../../hooks/useUserInputValidate";
import Logo from "../NavBar/Logo";
import UserInput from "./UserInput";
import {
  initialState,
  userInputTemplate,
  validators,
} from "./SignUp.constants";
import CloseBtn from "../Utils/CloseBtn";
import {
  useIsValidUserNameMutation,
  useSignUpMutation,
} from "../../store/features/authSlice";
import { SignUpInput } from "../../types";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const {
    setErrorMessage,
    input,
    message,
    onChangeHandler,
    isValid,
    onValidate,
  } = useUserInputValidate(initialState, validators);

  const [isValidUserName] = useIsValidUserNameMutation();

  const [signUp] = useSignUpMutation();

  const nextStepHandler = async () => {
    if (!onValidate("firstName", "lastName", "userName")) return;
    try {
      await isValidUserName(input.userName).unwrap();
      setStep(2);
    } catch (e) {
      setErrorMessage({
        userName: e as string,
      });
    }
  };

  const signUpHandler = async () => {
    try {
      const userDetails = input;
      await signUp(userDetails).unwrap();
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container bg-slate-50 h-full z-10 absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="login-container-div relative rounded-2xl border flex flex-col items-center justify-center h-3/4 ">
        <CloseBtn />
        <Logo />
        <span className=" mt-4">Sign Up to Message</span>
        <span className="step">Step {step}-2</span>

        {userInputTemplate[step]?.map((el) => {
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

        {step === 1 ? (
          <button
            disabled={!isValid}
            onClick={nextStepHandler}
            className={`${
              isValid ? " cursor-pointer" : " cursor-no-drop"
            } m-2 p-1 w-72 rounded-2xl bg-black text-white`}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!isValid}
            onClick={signUpHandler}
            className="m-2 p-1 w-72 rounded-2xl bg-black text-white"
          >
            Sign Up
          </button>
        )}

        <div className="m-2 mb-4 sign-up">
          <span>Already have an account ?</span>
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
