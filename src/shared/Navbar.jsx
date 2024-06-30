

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"));



    return (
        <div className="flex justify-between items-center p-5"> 
            <div>
                <h1 className="text-3xl font-bold text-[#F33823] ml-10">Dev Cluster</h1>
            </div>
            <div className="flex justify-between items-center gap-5 mr-10 border px-6 py-2 rounded-md">
                <div className="">
                    <img src={user?.imageUrl} alt="user" className="w-10 h-10 rounded-full border-2" />
                </div>
                <h1>{user?.email}</h1> 
            </div>
        </div>
    );
};

export default Navbar;
