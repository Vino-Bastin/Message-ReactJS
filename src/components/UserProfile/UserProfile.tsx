import { useSelector } from "react-redux";
import {
  authSelector,
  useLogoutMutation,
} from "../../store/features/authSlice";
import UserProfilePhoto from "../Post/UserProfilePhoto";

const UserProfile = () => {
  const { userDetails } = useSelector(authSelector);
  const [logout] = useLogoutMutation();

  const logOutHandler = () => {
    logout(0);
  };

  return (
    <div id="profile" className="h-screen w-1/4 flex flex-col items-center">
      <div className=" flex flex-col justify-center items-center border p-4 mt-8 rounded-2xl w-3/4">
        <UserProfilePhoto
          url={userDetails.firstName[0] + userDetails.lastName[0]}
          size={20}
        />
        <span className="user-name mt-2 font-bold">{userDetails.userName}</span>
        <div className="mt-2 w-3/4">
          <span>First Name :</span>
          <span className="user-name ml-2">{userDetails.firstName}</span>
        </div>
        <div className="mt-2 w-3/4">
          <span>Last Name :</span>
          <span className="user-name ml-2">{userDetails.lastName}</span>
        </div>
        <button
          onClick={logOutHandler}
          className="auth-btn w-1/2 border rounded-2xl text-sm font-semibold m-4 p-1 text-green-800"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
