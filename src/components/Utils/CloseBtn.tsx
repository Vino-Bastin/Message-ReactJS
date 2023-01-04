import { useLocation, useNavigate } from "react-router-dom";
import CloseSvgBtn from "./CloseSvgBtn";

const CloseBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeBtnHandler = () => {
    if (location?.state) navigate(location.state.from);
    else navigate("/home");
  };

  return (
    <div className="close-btn cursor-pointer" onClick={closeBtnHandler}>
      <CloseSvgBtn />
    </div>
  );
};

export default CloseBtn;
