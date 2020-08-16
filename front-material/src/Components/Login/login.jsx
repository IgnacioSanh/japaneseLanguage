import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Joi from "@hapi/joi";

import { useAuth } from "../../Context/auth";
import { login } from "../../Services/authService";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const baseLogin = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(baseLogin);
  const [errors, setErrors] = useState(baseLogin);
  const { setAuthTokens } = useAuth();
  let history = useHistory();

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().min(2).required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validate form
    const validation = Joi.object(schema).validate(user, { abortEarly: false });
    if (validation.error) {
      let newErrors = { ...errors };
      validation.error.details.forEach((error) => {
        let name = error.context.key;
        newErrors[name] = error.message;
      });
      setErrors(newErrors);
    } else {
      //Send request
      const { email, password } = user;
      const { token, user: retUser, error } = await login(email, password);
      if (error) {
        setErrors(error);
      }
      if (token) {
        setAuthTokens(token, retUser);
        history.push("/");
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    let formUser = { ...user };
    formUser[name] = value;
    setUser(formUser);
    //Validate the input
    let errorMsg = "";
    const validation = Joi.object({ [name]: schema[name] }).validate({
      [name]: value,
    });
    if (validation.error) errorMsg = validation.error.message;
    let newErrors = { ...errors };
    newErrors[name] = errorMsg;
    setErrors(newErrors);
  };

  const { email, password } = user;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            value={email}
            onChange={handleChange}
            error={errors.email !== ""}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
            error={errors.password !== ""}
            helperText={errors.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">Don't have an account?. Sign up!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
