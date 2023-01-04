import Logo from "./Logo";
import NavButton from "./NavButton";
import HomeSvgBtn from "../Utils/HomeSvgBtn";
import TrendingSvgBtn from "../Utils/TrendingSvgBtn";
import LatestSvgBtn from "../Utils/LatestSvgBtn";
import NewSvgBtn from "../Utils/NewSvgBtn";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/features/authSlice";

const NavBar = () => {
  const { status } = useSelector(authSelector);

  return (
    <>
      <Logo />
      <NavButton label="Home">
        <HomeSvgBtn />
      </NavButton>
      <NavButton label="Trending">
        <TrendingSvgBtn />
      </NavButton>
      <NavButton label="Latest">
        <LatestSvgBtn />
      </NavButton>
      {status && (
        <NavButton label="New Post">
          <NewSvgBtn />
        </NavButton>
      )}
    </>
  );
};

export default NavBar;
