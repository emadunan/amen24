import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../store/authApi";

const ProtectedRoute = () => {
  const { data: _user, isLoading, isError } = useGetMeQuery();

  if (isLoading) return null;

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
