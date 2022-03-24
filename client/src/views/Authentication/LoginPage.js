import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navbar/landingNav";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { username: userName, password };
      // console.log(loginUser);
      const loginRes = await axios.post("/api/user/login", loginUser);
      console.log(loginUser);

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  //

  const classes = useStyles();
  return (
    <div
      style={{
        maxWidth: "100vw",
        height: "100vh",
        background:
          "radial-gradient(ellipse at center,rgba(255, 254, 234, 1) 0%,rgba(255, 254, 234, 1) 35%,#b7e8eb 100%",
      }}
    >
      {" "}
      <Navigation />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          <form onSubmit={submit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Link
              onClick={() => {
                history.push("/signup");
              }}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
}
