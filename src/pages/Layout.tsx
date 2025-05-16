import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="text-white bg-black ">
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;