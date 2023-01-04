import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserInputValidate } from "../../hooks/useUserInputValidate";
import Logo from "../NavBar/Logo";
import UserInput from "./UserInput";
import {
  initialState,
  userInputTemplate,
  validators,
} from "./SignUp.constants";
import CloseBtn from "../Utils/CloseBtn";

const SignUp = () => {
  const [step, setStep] = useState<number>(1);

  const { input, message, onChangeHandler, isValid, onValidate } =
    useUserInputValidate(initialState, validators);

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
            onClick={() => {
              onValidate("firstName", "lastName", "userName") && setStep(2);
            }}
            className={`${
              isValid ? " cursor-pointer" : " cursor-no-drop"
            } m-2 p-1 w-72 rounded-2xl bg-black text-white`}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!isValid}
            onClick={() => console.log(input)}
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
