import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateStudent, deleteStudent } from '../../redux/studentReducer';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const ManageStudent = () => {
    const { id} = useParams();
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students);
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    console.log(students);
//reload page will not delete data

    useEffect(() => {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            const parsedStudents = JSON.parse(storedStudents);
            dispatch({ type: 'SET_STUDENTS', payload: parsedStudents });
        }
    }, [dispatch]);



    const handleView = (student) => {
        setSelectedStudent(student);
        document.getElementById('view').showModal();
    };

    const handleCloseModal = () => {
        document.getElementById('view').close();
        setSelectedStudent(null);
    };

    const handleEdit = (student) => {
        setSelectedStudent({ ...student });
        document.getElementById('edit').showModal();
    };

    const handleUpdate = e => {
        e.preventDefault();
        dispatch(updateStudent(selectedStudent));

        const updatedStudents = students.map(student => {
            if (student.id === selectedStudent.id) {
                return selectedStudent;
            }
            return student;
        });
        dispatch({ type: 'SET_STUDENTS', payload: updatedStudents });
        localStorage.setItem('students', JSON.stringify(updatedStudents));
      
        toast.success('Student updated successfully');
        document.getElementById('edit').close();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent({ ...selectedStudent, [name]: value });
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            dispatch(deleteStudent(id));
            const updatedStudents = students.filter((student) => student.id !== id);
         
            localStorage.setItem('students', JSON.stringify(updatedStudents));
            toast.success("Student deleted successfully");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const filteredStudents = students?.filter(student => {
        const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
        const rollNumber = student.rollNumber;
        const matchesSearchTerm = fullName.toLowerCase().includes(searchTerm.toLowerCase()) || rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClassFilter = classFilter === '' || student.class === classFilter || student.class === classFilter + ' ' + student.division;

        return matchesSearchTerm && matchesClassFilter;
    });

    const date = new Date();
    const formattedDate = `${date.getFullYear()} ${date.toLocaleString('default', { month: 'long' })} ${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className="container mx-auto p-6">
            <div className='flex justify-between items-center mb-6'>
                <h2 className="text-3xl font-bold">Manage Students</h2>
                <input
                    type="text"
                    placeholder="Search by name or roll "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2  border border-gray-300 rounded-md "
                />


                <input
                    type="text"
                    placeholder="Filter by class"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-2  border border-gray-300 rounded-md "
                />

                <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-md border"
                >
                    Print
                </button>
                <p className='text-lg font-medium'>{formattedDate}</p>
            </div>
            <div className="flex space-x-4 mb-6">

            </div>


            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                    <thead className="bg-[#F33823] text-white text-center ">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">Roll No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium">View /Edit /Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        {filteredStudents?.length > 0 ? (
                            filteredStudents?.map(student => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4">{student.firstName} {student.middleName} {student.lastName}</td>
                                    <td className="px-6 py-4">{student.class}</td>
                                    <td className="px-6 py-4">{student.rollNumber}</td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <button className="text-red-600" onClick={() => handleView(student)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button className="text-red-600" onClick={() => handleEdit(student)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="text-red-600" onClick={() => handleDelete(student.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <dialog id='edit' className="modal">
                <div className="modal-box bg-white shadow-md rounded-lg p-6">
                    <button className="btn btn-sm btn-circle absolute top-2 right-2" onClick={() => document.getElementById('edit').close()}>✕</button>
                    <h3 className="text-xl font-bold mb-4 text-center">Edit Student</h3>
                    <form onSubmit={handleUpdate} className="space-y-6">
    <div className="flex space-x-4">
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
                type="text"
                name="firstName"
                value={selectedStudent?.firstName || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
                type="text"
                name="middleName"
                value={selectedStudent?.middleName || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
                type="text"
                name="lastName"
                value={selectedStudent?.lastName || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    </div>
    <div className="flex space-x-4">
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
                type="text"
                name="class"
                value={selectedStudent?.class || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Division</label>
            <input
                type="text"
                name="division"
                value={selectedStudent?.division || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
                type="text"
                name="rollNumber"
                value={selectedStudent?.rollNumber || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    </div>
    <div className="flex space-x-4">
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input
                type="text"
                name="addressLine1"
                value={selectedStudent?.addressLine1 || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input
                type="text"
                name="addressLine2"
                value={selectedStudent?.addressLine2 || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    </div>
    <div className="flex space-x-4">
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
                type="text"
                name="city"
                value={selectedStudent?.city || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Landmark</label>
            <input
                type="text"
                name="landmark"
                value={selectedStudent?.landmark || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
                type="text"
                name="pincode"
                value={selectedStudent?.pincode || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    </div>
    <button type="submit" className="mt-4 bg-[#F33823] px-6 py-3 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Save</button>
</form>

                </div>
            </dialog>


            {selectedStudent && (
                <dialog id='view' className="modal">
                    <div className="modal-box bg-white shadow-md rounded-lg p-6">
                        <button className="btn btn-sm btn-circle absolute top-2 right-2" onClick={handleCloseModal}>✕</button>
                        <h3 className="text-xl font-bold mb-4 text-center">Student Details  </h3>
                        <div className="space-y-2">
                            <img src={selectedStudent.profilePicture} alt="" className='w-[140vh] h-[100vh]' />
                            <p className='font-bold text-2xl'> {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}</p>
                            <p><strong>Class:</strong> {selectedStudent.class}</p>
                            <p><strong>Division:</strong> {selectedStudent.division}</p>
                            <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                            <p><strong>Address Line 1:</strong> {selectedStudent.addressLine1}</p>
                            <p><strong>Address Line 2:</strong> {selectedStudent.addressLine2}</p>
                            <p><strong>City:</strong> {selectedStudent.city}</p>
                            <p><strong>Landmark:</strong> {selectedStudent.landmark}</p>
                            <p><strong>Pincode:</strong> {selectedStudent.pincode}</p>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageStudent;
