import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toast from "../Common/Toast";
import { Switch, Route, Link } from "react-router-dom";

// Own creation
import WordPractice from "./wordPractice";
import Scoreboard from "./Score";

class PracticeView extends Component {
  state = {
    //scoreArray: [correct, wrong, strike, maxStrike]
    scoreArray: [0, 0, 0, 0],
    toast: { open: false, message: "", severity: "info" },
  };

  resetScore = () => {
    const scoreArray = [0, 0, 0, 0];
    this.setState({ scoreArray });
  };

  setScore = (correct, realAnswer) => {
    let score = [...this.state.scoreArray];
    let toastConfig = {};
    //Right answer
    if (correct) {
      score[0] += 1;
      score[2] += 1;
      if (score[3] < score[2]) score[3] = score[2];
      toastConfig = {
        open: true,
        message: `Correct!. The answer was: ${realAnswer}`,
        severity: "success",
      };
    } else {
      score[1] += 1;
      score[2] = 0;
      toastConfig = {
        open: true,
        message: `Wrong! The answer was: ${realAnswer}`,
        severity: "error",
      };
    }
    this.setState({ toast: toastConfig });
    this.setState({ scoreArray: score });
  };

  render() {
    const { scoreArray } = this.state;
    const { open, message, severity } = this.state.toast;
    return (
      <div styles={{ flexGrow: 1 }}>
        <CssBaseline />
        <Grid container direction="column" spacing={2}>
          <Hidden xsDown={true}>
            <Grid item xs={12}>
              <Typography variant="h2">Practice</Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <Scoreboard score={scoreArray} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Switch>
              <Route
                path="/practice/:mode"
                render={() => (
                  <WordPractice
                    setScore={this.setScore}
                    resetScore={this.resetScore}
                  />
                )}
              ></Route>
              <Route path="/practice" exact component={PracticeMenu}></Route>
            </Switch>
          </Grid>
        </Grid>
        <Toast open={open} message={message} severity={severity} />
      </div>
    );
  }
}

const PracticeMenu = () => {
  return (
    <Grid container item direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">Pick an option</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/practice/original"
        >
          From language to native
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/practice/meaning"
        >
          From native to language
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" fullWidth>
          Numbers
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" fullWidth>
          Sentences
        </Button>
      </Grid>
    </Grid>
  );
};

export default PracticeView;
