import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/Authenticator";
import { type ReactNode, type JSX } from "react";

function RequireAuth({ children }: { children: ReactNode }): JSX.Element {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p>Cargando sesión...</p>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    console.log(user)
    return <>{children}</>;
}

export default RequireAuth;