import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./views/Login";
import SignupPage from "./views/Signup";
import TaskManager from "./components/CreateTask";
import TaskList from "./components/Index";
import EditTask from "./components/EditTask";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <TaskList />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignupPage />
            },
            {
                path: "/create-task",
                element: <TaskManager />
            },
            {
                path: `/update-task/:id`,
                element: <EditTask />
            }
        ]
    }
])

export default routes;