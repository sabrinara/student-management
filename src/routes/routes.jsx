import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../layout/ErrorPage";
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
                element: <ManageStudent />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path: "/addStudent",
                element: <AddStudent />
            },
          
        ],
    },
]

)

export default routes;