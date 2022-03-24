import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../../components/Navbar/landingNav";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { green, blue } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Input from "@material-ui/core/Input";

const GreenRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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

export default function SignUpPage() {
  const history = useHistory();

  const [selectedValue, setSelectedValue] = useState("user");
  const [file, setFile] = useState([]);
  const [username, setUsername] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleChange = (e) => setSelectedValue(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleFnameChange = (e) => setfname(e.target.value);
  const handleLnameChange = (e) => setlname(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setemail(e.target.value);
  const handleCPassChange = (e) => setconfirmPassword(e.target.value);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      history.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    // console.log(selectedValue);
    e.preventDefault();
    try {
      if (
        username.trim().length &&
        confirmPassword.trim().length &&
        password.trim().length
      ) {
        if (selectedValue === "user") {
          console.log(selectedValue);
          const data = {
            username: username,
            email,
            password,
            confirmPassword,
            bio: "",
          };
          console.log(data);
          const reguser = await axios.post("/api/user/register", data);
          alert("Success, now you can login");
          history.push("/login");
        } else {
          if (
            fname.trim().length &&
            lname.trim().length &&
            email.trim().length
          ) {
            const form = new FormData();
            form.append("userName", username);
            form.append("password", password);
            form.append("confirmPassword", confirmPassword);
            form.append("fname", fname);
            form.append("lname", lname);
            form.append("email", email);
            form.append("certificate", file);
            // console.log(form);

            const reguser = await axios.post("/api/users/registerdoc", form, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            // console.log(reguser);
            alert(
              "You have successfully applied for a position of a doctor, and will be reviewed soon"
            );
            history.push("/");
          } else {
            return alert("Please enter all details");
          }
        }
      } else {
        alert("Please fill all the fields");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

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
            Sign Up
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="uname"
                  label="Username"
                  name="uname"
                  value={username}
                  onChange={handleUsernameChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  label="Password"
                  onChange={handlePassChange}
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleCPassChange}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
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
              Sign Up
            </Button>
            <Link
              onClick={() => {
                history.push("/login");
              }}
              variant="body2"
              style={{ cursor: "pointer" }}
            >
              {"Already a user? Sign In"}
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
}
