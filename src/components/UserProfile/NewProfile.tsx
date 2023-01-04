import { Link, useLocation } from "react-router-dom";

const NewProfile = () => {
  const location = useLocation();

  return (
    <div id="profile" className="h-screen w-1/4 flex flex-col items-center">
      <div className=" flex flex-col border p-4 mt-8 rounded-2xl w-3/4">
        <span className="mb-2 font-bold">New To Message?</span>
        <span className=" text-sm mb-2">
          Sign up now to get your own personalized timeline!
        </span>
        <button className="auth-btn border rounded-2xl text-sm font-semibold m-4 p-1 text-green-800">
          <Link to="/signup" state={{ from: location.pathname }}>
            Click to Sign Up
          </Link>
        </button>
        <div className=" border-b mt-2 mb-2"></div>
        <span className="mb-2 font-bold">Existing User?</span>
        <span className=" text-sm mb-2">Login to see your messages!</span>
        <button className="auth-btn border rounded-2xl text-sm font-semibold m-4 p-1 text-green-800">
          <Link to="/login" state={{ from: location.pathname }}>
            Click to Login
          </Link>
        </button>
        <span className=" text-center text-sm font-normal">
          Inspired from twitter
        </span>
      </div>
    </div>
  );
};

export default NewProfile;
