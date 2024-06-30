

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
    const saveUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.image.files[0]; // Get the first file selected (image)

        try {
            const imgbbResponse = await uploadImageToImgBB(image);
            const imageUrl = imgbbResponse.data.data.url;
            const user = { email, password, imageUrl };
            saveUser(user);
            e.target.reset();
            toast.success("Login Successful");
            navigate("/manageStudent");

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Function to upload image to ImgBB
    const uploadImageToImgBB = async (image) => {
        const formData = new FormData();
        formData.append('image', image);

        const apiUrl = image_upload_api;

        // Using axios to post the image to ImgBB API
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    {/* Image upload field */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-sm font-medium text-white bg-[#F33823] border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
