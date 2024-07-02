import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addStudent } from '../../redux/studentReducer';
import { useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const AddStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const students = useSelector(state => state.students);
    console.log(students);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        studentClass: '',
        division: '',
        rollNumber: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        pincode: '',
        profilePicture: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            if (formData.profilePicture) {
                const imgbbResponse = await uploadImageToImgBB(formData.profilePicture);
                imageUrl = imgbbResponse.data.data.url;
            }

            const studentData = {
                id: students.length + 1,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                studentClass: formData.studentClass,
                division: formData.division,
                rollNumber: formData.rollNumber,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                landmark: formData.landmark,
                city: formData.city,
                pincode: formData.pincode,
                profilePicture: imageUrl
            };

            dispatch(addStudent(studentData));

            // Update localStorage
            const studentsFromLocalStorage = localStorage.getItem('students') || [];
            localStorage.setItem('students', JSON.stringify([...studentsFromLocalStorage, studentData]));

            toast.success("Student added successfully");
            navigate("/");
        } catch (error) {
            console.error('Error adding student:', error);
            toast.error("Failed to add student");
        }
    };

    const uploadImageToImgBB = async (image) => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(image_upload_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    };

    const formattedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' , hour: 'numeric', minute: 'numeric' });

    return (
        <div className="mr-4">
            <div className="w-full ">
                <div className='flex justify-between mr-10'>
                    <h2 className="mb-6 text-3xl font-bold  ">Add Student</h2>


                    <p className='text-center font-medium'>{formattedDate}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center gap-5'>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='First Name'
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                            <input
                                type="text"
                                id="middleName"
                                name="middleName"
                                value={formData.middleName}
                                placeholder='Middle Name'
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Last Name'
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700">Class</label>
                            <select
                                id="studentClass"
                                name="studentClass"
                                value={formData.studentClass}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder='Select Class'
                                required
                            >
                                <option value="">Select Class</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
                            <select
                                id="division"
                                name="division"

                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                placeholder='Select Division'
                                value={formData.division}
                            >
                                <option value="">Select Division</option>
                                {['A', 'B', 'C', 'D', 'E'].map((division) => (
                                    <option key={division} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
                            <input
                                type="number"
                                id="rollNumber"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                min="1"
                                max="99"
                                placeholder='Enter Roll Number'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                            <textarea
                                id="addressLine1"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder='Address Line 1'
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                            <textarea
                                id="addressLine2"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                                placeholder='Address Line 2'
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-5'>

                        <div className="mb-4 w-1/3">
                            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                            <input
                                type="text"
                                id="landmark"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                type="number"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                min="1000"
                                max="999999"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleFileChange}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="block w-1/2 px-4 py-2 text-md font-medium text-white bg-[#F33823] border border-transparent rounded-md shadow-sm hover:bg-[#fd5a48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd5a48]"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
