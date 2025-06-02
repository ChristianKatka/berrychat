import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "./home/store/state";

export const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const { getIsAuthenticated } = useStore().auth;

  return getIsAuthenticated() ? children : <Navigate to="/login" replace />;
};

export const UnAuthenticatedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { getIsAuthenticated } = useStore().auth;

  return !getIsAuthenticated() ? children : <Navigate to="/" replace />;
};
