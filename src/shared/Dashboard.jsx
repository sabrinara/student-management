import { GoTasklist } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getLinkClass = (path) => {
        return location.pathname === path
            ? "bg-[#F33823] text-white px-4 py-2 rounded"
            : "text-black ";
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        
        navigate("/login");
        toast.success("Logout Successful");
    };

    return (
        <div className="flex flex-col justify-start items-start pl-10 gap-5 h-full py-20">

            <Link to="/addStudent" className={getLinkClass("/addStudent")}>
                <div className="flex items-center gap-3">
                    <IoPeopleOutline className="w-6 h-6" />
                    <h1>Add Student</h1>
                </div>
            </Link>

            <Link to="/" className={getLinkClass("/")}>
                <div className="flex items-center gap-3">
                    <GoTasklist className="w-6 h-6" />
                    <h1>Manage Student</h1>
                </div>
            </Link>

        
            <button onClick={handleLogout} className="text-black">
                <div className="flex items-center gap-3">
                    <IoIosLogOut className="w-6 h-6" />
                    <h1>Logout</h1>
                </div>
            </button>
        </div>
    );
};

export default Dashboard;
