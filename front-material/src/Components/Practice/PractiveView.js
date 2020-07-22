import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Toast from "../Common/Toast";

// Own creation
import { getPracticeWords } from "../../Services/wordService";
import WordQuestion from "./wordQuestion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
  },
  wordPaper: {
    height: 400,
    textAlign: "center",
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

class PracticeView extends Component {
  async componentDidMount() {
    const { words: practiceWords } = await getPracticeWords(
      "5f11dbed64aebf129629a9fc"
    );
    const hasWords = practiceWords.length > 0;
    this.setState({ practiceWords, hasWords });
  }

  state = {
    practiceWords: [],
    answeredWords: [],
    score: [0, 0, 0],
    currentWord: undefined,
    hasWords: false,
    toast: { open: false, message: "" },
  };

  getCurrentWord = (prevWord) => {
    if (prevWord) {
      const { score } = this.state;
      if (prevWord.correct) {
        score[0] += 1;
        score[2] += 1;
        const openSuccess = {
          open: true,
          message: `Correct!. The answer was: ${prevWord.meaning}`,
          severity: "success",
        };
        this.setState({ toast: openSuccess });
      } else {
        score[1] += 1;
        score[2] = 0;
        const openFail = {
          open: true,
          message: `Wrong! The answer was: ${prevWord.meaning}`,
          severity: "error",
        };
        this.setState({ toast: openFail });
      }
      this.setState({ score });
    }
    const { practiceWords } = this.state;
    if (practiceWords.length === 0) return undefined;
    const index = Math.floor(Math.random() * practiceWords.length);
    const currentWord = practiceWords[index];
    practiceWords.splice(index, 1);

    this.setState({ currentWord, practiceWords });
  };

  render() {
    const { currentWord, hasWords, score } = this.state;
    const { open, message, severity } = this.state.toast;
    return (
      <div styles={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Typography variant="h2">Practice</Typography>
          </Grid>
          <Grid container item sm={3}>
            <Score right={score[0]} wrong={score[1]} strike={score[2]} />
          </Grid>
          <Grid container item sm={6}>
            <WordQuestion
              word={currentWord}
              hasWords={hasWords}
              getWord={this.getCurrentWord}
            />
          </Grid>
        </Grid>
        <Toast open={open} message={message} severity={severity} />
      </div>
    );
  }
}

const Score = ({ right, wrong, strike }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} direction="column" spacing={1}>
      <Paper className={classes.paper} elevation={4}>
        <Grid container item justify="center" alignItems="center" spacing={2}>
          <CounterBox text="Rights" counter={right} />
          <CounterBox text="Wrongs" counter={wrong} />
          <CounterBox text="Strike" counter={strike} />
        </Grid>
      </Paper>
    </Grid>
  );
};

const CounterBox = ({ text = "Counter", counter = 0 }) => {
  const classes = useStyles();
  return (
    <Grid item xs={8}>
      <Paper className={classes.paper}>
        <Typography>{text}</Typography>
        <Grid container item justify="center">
          <Avatar className={classes.orange}>{counter}</Avatar>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PracticeView;
