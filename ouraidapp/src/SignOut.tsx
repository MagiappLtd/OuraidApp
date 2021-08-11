import { useHistory } from "react-router-dom";
import { useAuth } from "./use-auth";

export const SignOut = () => {
  const auth = useAuth();
  const history = useHistory();
  const handleClick = () => {
    auth.signOut((result) => {
      if (result.isSuccessed) {
        // トップページに遷移
        history.replace({ pathname: "/" });
      } else {
        // エラー処理
        // ...
      }
    });
  };
  return <button onClick={handleClick}>SignOut</button>;
};