import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-sm sticky top-0 z-50 border-b border-gray-800 bg-black">
      <div className="px-5 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/`}>
            <IoHomeOutline className="w-8 h-8 text-white hover:scale-110 transition-all duration-100 cursor-pointer" />
          </Link>
        </div>

        <div className="relative flex-1 mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearchOutline className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-full block w-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="What do you want to play?"
          />
        </div>

        <div className="flex items-center space-x-4">
          <FaRegBell className="w-7 h-7 text-white hover:scale-110 transition-all duration-100 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
