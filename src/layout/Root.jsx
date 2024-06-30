import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Dashboard from "../shared/Dashboard";

const Root = () => {
    const location = useLocation();


    const isLoginPath = location.pathname === '/login';

    return (
        <div className="w-full h-screen">
            {!isLoginPath && <Navbar />}
            <div className="flex justify-center pt-10">
                {!isLoginPath && (
                    <div className="w-1/5 h-screen">
                        <Dashboard />
                    </div>
                )}
                <div className={isLoginPath ? "w-full" : "w-4/5"}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;
