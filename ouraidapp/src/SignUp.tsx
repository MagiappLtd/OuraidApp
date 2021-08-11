import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./use-auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        My Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Emailとパスワード入力フォーム
const SignUpForm = () => {
  const classes = useStyles();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // サインアップ処理
  const executeSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.signUp(email, password, () => {});
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <form className={classes.form} noValidate onSubmit={executeSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="パスワード(8文字以上かつ英数字混合)"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            新規登録
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                ログインはこちら
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

// 認証コード入力フォーム
const ConfirmForm = () => {
  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();
  const [verificationCode, setVerificationCode] = useState("");
  // 認証コード確認
  const executeConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.confirmSignUp(verificationCode, (result) => {
      if (result.isSuccessed) {
        // 認証に成功
        // マイページに遷移
        history.replace({ pathname: "/mypage" });
      } else {
        // 認証に失敗
        // エラー処理
        // ...
      }
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          認証コードを入力
        </Typography>
        <form className={classes.form} noValidate onSubmit={executeConfirm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="code"
                label="認証コード"
                name="code"
                placeholder="xxxxxx"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            認証
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export const SignUp = () => {
  const auth = useAuth();
  return <>{auth.email === "" ? <SignUpForm /> : <ConfirmForm />}</>;
};