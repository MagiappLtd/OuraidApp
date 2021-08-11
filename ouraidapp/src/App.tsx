import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./use-auth";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

const App = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    // 認証の確認中
    return <div></div>;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <p>トップページ</p>
          <p>
            <Link to="/signup">新規登録</Link>
          </p>
          <p>
            <Link to="/signin">ログイン</Link>
          </p>
          <p>
            <Link to="/mypage">マイページ</Link>
          </p>
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/mypage">
          <p>マイページ</p>
          <SignOut />
        </PrivateRoute>
        <Route path="/*">
          <p>Page Not Found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;