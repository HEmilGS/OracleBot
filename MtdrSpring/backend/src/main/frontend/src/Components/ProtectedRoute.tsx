import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null; // o un loader
  return isSignedIn ? <>{children}</> : <Navigate to="/auth/login" />;
}