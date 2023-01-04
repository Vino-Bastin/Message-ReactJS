import logo from "../../Assets/logo.webp";

const Logo = () => {
  return (
    <div className="w-20 h-20 grid place-content-center mt-4 rounded-full">
      <img src={logo} alt="Message" />
    </div>
  );
};

export default Logo;
