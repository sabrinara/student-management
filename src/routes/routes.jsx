import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../layout/ErrorPage";
import Home from "../pages/Home";
import Login from "../Authentication/Login";
import AddStudent from "../components/students/AddStudent";
import ManageStudent from "../components/students/ManageStudent";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Root />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path: "/addStudent",
                element: <AddStudent />
            },
            {
                path: "/manageStudent",
                element: <ManageStudent />
            }
        ],
    },
]

)

export default routes;