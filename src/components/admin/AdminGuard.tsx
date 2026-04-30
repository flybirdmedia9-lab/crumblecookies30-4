import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AdminLayout } from "./AdminLayout";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};
