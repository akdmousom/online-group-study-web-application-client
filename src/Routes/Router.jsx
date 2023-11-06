// Router 
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from "../Pages/Register";
import Assignments from "../Pages/Assignments";
import CreateAssignments from "../Pages/CreateAssignments";
import MyAssignments from "../Pages/MyAssignments";
import PrivetRoute from "./PrivetRoute";
import SubmittedAssignment from "../Pages/SubmittedAssignment";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              index: true,
              element: <Home/>
            },
            {
                path: 'assignments',
                element: <Assignments/>
            },
            {
                path: 'create-assignments',
                element: <PrivetRoute><CreateAssignments/></PrivetRoute>
            },
            {
                path: 'my-assignments',
                element: <PrivetRoute><MyAssignments/></PrivetRoute>
            },{
                path:'submitted-assignment',
                element: <PrivetRoute><SubmittedAssignment/></PrivetRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
])

export default Router;