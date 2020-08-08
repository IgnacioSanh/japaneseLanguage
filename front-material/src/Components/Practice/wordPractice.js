import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";

//Icons
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

//Services
import { getPracticeWords } from "../../Services/wordService";
import transformWord from "../Common/LanguageInput";

const useStyle = makeStyles((theme) => ({
  paperMargin: {
    padding: theme.spacing(5),
  },
  form: {
    flexGrow: 1,
  },
  center: {
    textAlign: "center",
  },
}));

const WordPractice = (props) => {
  const classes = useStyle();
  const { setScore, resetScore } = props;
  const { mode } = props.match.params;
  const modeAnswer = mode === "original" ? "meaning" : "original";
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(1);

  //First load
  useEffect(() => {
    const fetchWords = async () => {
      const { words: practiceWords } = await getPracticeWords();
      getCurrentWord(practiceWords);
    };
    fetchWords();
    resetScore();
  }, [resetScore]);

  const getCurrentWord = (practiceWords) => {
    let selectedWord = undefined;
    if (practiceWords.length > 0) {
      const index = Math.floor(Math.random() * practiceWords.length);
      selectedWord = practiceWords[index];
      practiceWords.splice(index, 1);
    }
    setWords(practiceWords);
    setCurrentWord(selectedWord);
  };

  const handleInputChange = ({ currentTarget: input }) => {
    let { value } = input;
    // In case of multiple languages, change this:
    const currentLanguage = "japanese";
    const lang = mode === "original" ? "" : currentLanguage;
    value = transformWord(lang, value);
    setAnswer(value);
  };

  const onCheck = () => {
    if (currentWord[modeAnswer] === answer)
      setScore(true, currentWord[modeAnswer]);
    else setScore(false, currentWord[modeAnswer]);
    setAnswer("");
    setHint(1);
    getCurrentWord(words);
  };

  const onHint = () => {
    const realAnswer = currentWord[modeAnswer];
    if (realAnswer.length >= hint) {
      const hintWord = realAnswer.slice(0, hint);
      setAnswer(hintWord);
      setHint(hint + 1);
    }
  };

  const onPass = () => {
    setScore(false, currentWord[modeAnswer]);
    setAnswer("");
    setHint(1);
    getCurrentWord(words);
  };

  const ButtonXS = () => {
    return (
      <Grid container item direction="row" justify="space-between">
        <Grid item>
          <Fab color="default" onClick={onHint}>
            <LiveHelpIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab color="secondary" onClick={onPass}>
            <ClearIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab color="primary" onClick={onCheck}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  };

  const ButtonSmallUp = () => {
    return (
      <Grid container item direction="row" justify="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="default"
            endIcon={<LiveHelpIcon />}
            onClick={onHint}
          >
            Hint
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ClearIcon />}
            onClick={onPass}
          >
            Pass
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={onCheck}
          >
            Check
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Paper elevation={3} className={classes.paperMargin}>
      {!currentWord && (
        <Typography variant="h5">
          You have no words left! Training is over
        </Typography>
      )}
      {currentWord && (
        <Grid container item direction="column" spacing={4}>
          <Grid item xs={false}>
            <Hidden only="xs">
              <Typography variant="h4" align="center" noWrap={true}>
                {currentWord[mode]}
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="h6" align="center" noWrap={true}>
                {currentWord[mode]}
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <form className={classes.form}>
              <TextField
                autoComplete="off"
                autoFocus={true}
                fullWidth
                onChange={handleInputChange}
                value={answer}
              ></TextField>
            </form>
          </Grid>
          <Grid item>
            <Hidden only="xs">
              <ButtonSmallUp />
            </Hidden>
            <Hidden smUp>
              <ButtonXS />
            </Hidden>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default withRouter(WordPractice);
