import { Navigate } from 'react-router-dom';

const AdminAuthWrapper = ({ children }) => {
  // In a real application, you would check a global state, context, or token here.
  // For this MVP, we simulate that the user is an admin.
  const isAdmin = true; // Set to false to test redirect

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminAuthWrapper;
