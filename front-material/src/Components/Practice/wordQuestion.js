import React, { useState } from "react";
import { Link, Switch, Route, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Loader from "../Common/Loader";

// Icons
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

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

const returnContent = (word, hasWords, getWord, type) => {
  if (!word && !hasWords) return <NoWords />;
  if (!word && hasWords) return <StartTest getWord={getWord} />;
  return <WordsExist word={word} getWord={getWord} />;
};

//This is the export default
const WordQuestion = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.wordPaper} elevation={6}>
        {/* {returnContent(word, hasWords, getWord)} */}
        {/* <Typography variant="h3">Hola</Typography> */}
        <Switch>
          <Route path="/practice/vocabulary/:type">
            <Typography>Jap 2 Spanish</Typography>
          </Route>
          <Route path="/practice/">
            <Typography>Spanish 2 Jap</Typography>
          </Route>
        </Switch>
      </Paper>
    </Grid>
  );
};

const WordsExist = ({ word, getWord }) => {
  //Styles
  const classes = useStyles();
  //States
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(1);
  //Actions
  const onCheck = () => {
    if (word.meaning === answer) {
      //Agrega puntaje + 1
      word = { ...word, correct: true };
    } else {
      //Agrega error + 1
      word = { ...word, correct: false };
    }
    setAnswer("");
    setHint(1);
    getWord(word);
  };

  const onHint = () => {
    const { meaning } = word;
    if (meaning.length >= hint) {
      const hintWord = meaning.slice(0, hint);
      setAnswer(hintWord);
      setHint(hint + 1);
    }
  };

  const onPass = () => {
    word = { ...word, correct: false };
    setAnswer("");
    setHint(1);
    getWord(word);
  };

  return (
    <Grid container item direction="column" spacing={2}>
      <Grid item>{false && <Loader />}</Grid>
      <Grid item>
        <Typography variant="h2" gutterBottom>
          {word.original}
        </Typography>
      </Grid>
      <Grid item>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="Meaning"
            value={answer}
            variant="outlined"
            fullWidth
            className={classes.input}
            onChange={({ currentTarget: input }) => {
              setAnswer(input.value);
            }}
          />
        </form>
      </Grid>
      <Grid item>
        <Grid container item direction="row" justify="space-between">
          <Button
            variant="contained"
            startIcon={<LiveHelpIcon />}
            onClick={onHint}
          >
            Hint
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ClearIcon />}
            onClick={onPass}
          >
            Pass
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SendIcon />}
            onClick={onCheck}
          >
            Check
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const NoWords = () => {
  return (
    <Typography variant="h4">
      Please add words in <Link to="/library">Library</Link>
    </Typography>
  );
};

const StartTest = ({ getWord }) => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h4">Start the practice!</Typography>
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          getWord(undefined);
        }}
      >
        Start!
      </Button>
      <Grid item>
        <Button variant="contained" color="primary">
          Japanese to Native
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Native to Japanese
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(WordQuestion);
