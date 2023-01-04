import { useSelector } from "react-redux";
import { authSelector } from "../store/features/authSlice";
import UserProfile from "../components/UserProfile/UserProfile";
import NewProfile from "../components/UserProfile/NewProfile";

const UserProfileLayout = () => {
  const { status } = useSelector(authSelector);

  if (status) return <UserProfile />;

  return <NewProfile />;
};

export default UserProfileLayout;
