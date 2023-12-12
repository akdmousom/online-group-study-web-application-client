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
import UpdateAssignment from "../Pages/UpdateAssignment";
import AssignmentDetails from "../Pages/AssignmentDetails";
import Blogs from "../Pages/Blogs";

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
                path: 'blogs',
                element: <Blogs/>
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
            },
            {
                path: 'update-assignment/:id',
                element: <PrivetRoute><UpdateAssignment></UpdateAssignment></PrivetRoute>,
                
            },
            {
                path: 'assignment-details/:id',
                element: <PrivetRoute><AssignmentDetails/></PrivetRoute>
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