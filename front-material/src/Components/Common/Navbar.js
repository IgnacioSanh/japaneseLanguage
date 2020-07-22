import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={"/practice"}
            className={classes.menuButton}
          >
            Practice
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={"/library"}
            className={classes.menuButton}
          >
            Library
          </Button>
          <Button
            color="default"
            variant="contained"
            component={Link}
            to={"/login"}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
