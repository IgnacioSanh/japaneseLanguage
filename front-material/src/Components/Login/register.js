import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Joi from "@hapi/joi";
import { useHistory } from "react-router-dom";

import { register, login } from "../../Services/authService";
import { useAuth } from "../../Context/auth";

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
    width: "100%", //Fix IE 11 issue
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const baseUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const schema = {
    firstname: Joi.string().required().label("First name"),
    lastname: Joi.string(),
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().min(2).required().label("Password"),
  };

  const [user, setUser] = useState(baseUser);
  const [errors, setErrors] = useState(baseUser);
  let history = useHistory();
  const { setAuthTokens } = useAuth();

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let userMod = { ...user };
    userMod[name] = value;
    if (schema[name]) {
      const objVal = { [name]: value };
      const validation = Joi.object({ [name]: schema[name] }).validate(objVal);
      let errorMsg = "";
      if (validation.error) {
        errorMsg = validation.error.message;
      }
      let newErrors = { ...errors };
      newErrors[name] = errorMsg;
      setErrors(newErrors);
    }
    setUser(userMod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //First validation
    const validation = Joi.object(schema).validate(user, { abortEarly: false });
    if (validation.error) {
      console.log("Validation error", validation.error);
      let newErrors = { ...errors };
      validation.error.details.forEach((error) => {
        let name = error.context.key;
        newErrors[name] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    //No validation errors
    const { error } = await register(user);
    //Check for back errors
    if (error) {
      setErrors(error);
      return;
    }
    //Login the user and redirect
    const { token, user: retUser, error: loginError } = await login(
      user.email,
      user.password
    );
    if (loginError) {
      setErrors(loginError);
    }
    if (token) {
      setAuthTokens(token, retUser);
      history.push("/");
    }
  };

  const { firstName, lastname, email, password } = user;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstname"
          label="First name"
          type="text"
          id="firstname"
          autoComplete="off"
          helperText={errors.firstname}
          error={errors.firstname === undefined}
          onChange={handleChange}
          value={firstName}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastname"
          label="Last name"
          type="text"
          id="lastname"
          autoComplete="off"
          onChange={handleChange}
          value={lastname}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="email"
          helperText={errors.email}
          error={errors.email !== ""}
          onChange={handleChange}
          value={email}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
          helperText={errors.password}
          error={errors.password !== ""}
          onChange={handleChange}
          value={password}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
