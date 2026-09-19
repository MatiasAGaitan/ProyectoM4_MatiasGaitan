import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Tasks from "../pages/Tasks"
import Login from "../pages/Login"
import Register from "../pages/Register"
import RequireAuth from "../components/RequireAuth"

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tasks" element={
                    <RequireAuth>
                        <Tasks />
                    </RequireAuth>
                } />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes