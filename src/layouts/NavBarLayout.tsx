import NavBar from "../components/NavBar/NavBar";

const NavBarLayout = () => {
  return (
    <section
      id="nav-bar"
      className="w-1/4 h-screen flex flex-col items-center border-r pt-8"
    >
      <NavBar />
    </section>
  );
};

export default NavBarLayout;
