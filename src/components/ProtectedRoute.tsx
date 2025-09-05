import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: ReactNode;
  requiredRole?: "ADMIN" | "MEMBER";
}

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const context = useContext(AuthContext);
  const user = context?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    const redirectPath =
      user.role === "ADMIN" ? "/admin-dashboard" : "/member-dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
