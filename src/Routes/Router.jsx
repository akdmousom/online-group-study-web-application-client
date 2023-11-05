import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from "../Pages/Register";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              index: true,
              element: <Home/>
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