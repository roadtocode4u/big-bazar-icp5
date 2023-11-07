import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    "path": "/",
    "element": <Home />
  },
  {
    "path": "/signup",
    "element": <Signup />
  },
  {
    "path": "/login",
    "element": <Login />
  }
])

root.render(<RouterProvider router={router} />);
