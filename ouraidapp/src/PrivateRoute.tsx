import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./use-auth";

export const PrivateRoute: React.FC<{ exact?: boolean; path: string }> = ({
  children,
  exact,
  path,
}) => {
  const auth = useAuth();
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};