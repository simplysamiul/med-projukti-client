import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Login from "../pages/Login/Login";
import OPD from "../pages/Dashboard/OPD/OPD";
import Departments from "../pages/Dashboard/Departments/Departments";

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: "/",
                element: <Navigate to="/login" />, 
            },
            {
                path: "login",
                Component: Login
            },
        ]
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "opd",
                Component: OPD
            }, 
            {
                path: "departments", 
                Component: Departments
            }
        ]
    }
]);



export default router;