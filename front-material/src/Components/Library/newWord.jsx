import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Dictionary
import jap from "./japanese.json";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SaveIcon from "@material-ui/icons/Save";
import BackspaceIcon from "@material-ui/icons/Backspace";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: "0 auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  newWord: {
    minHeight: "3.2rem",
  },
  input: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    width: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50%",
  },
}));

const NewWord = ({ onAddWord, currentWord }) => {
  const classes = useStyles();
  const defaultWord = {
    original: "",
    meaning: "",
    knowledge: false,
  };
  const [word, setWord] = useState(defaultWord);

  useEffect(() => {
    if (currentWord) setWord(currentWord);
  }, [currentWord]);

  const handleChange = ({ currentTarget: input }) => {
    let { value, name } = input;
    value = value.toLowerCase();
    if (name === "original") {
      const keys = Object.keys(jap);
      const similar = keys.filter((key) => value.includes(key));
      if (similar.length >= 1) {
        similar.sort((a, b) => b.length - a.length);
        let key = similar[0];
        value = value.replace(key, jap[key]);
      }
    }

    setWord({ ...word, [name]: value });
  };

  const handleSave = (word) => {
    onAddWord(word);
    setWord(defaultWord);
  };

  const handleKnowledge = (isKnown) => {
    setWord({ ...word, knowledge: isKnown });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {currentWord ? "Edit word" : "New word"}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          noWrap={true}
          className={classes.newWord}
        >
          {word.original}
        </Typography>
        <TextField
          className={classes.input}
          label="Japanese word"
          variant="outlined"
          autoComplete="off"
          name="original"
          onChange={handleChange}
          value={word.original}
        />
        <br />
        <TextField
          label="Meaning"
          autoComplete="off"
          variant="outlined"
          name="meaning"
          value={word.meaning}
          className={classes.input}
          onChange={handleChange}
        />
      </CardContent>
      <CardActions>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconButton
                aria-label="Known word"
                color={word.knowledge ? "primary" : "default"}
                onClick={() => handleKnowledge(true)}
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                aria-label="Unknown word"
                color={word.knowledge ? "default" : "primary"}
                onClick={() => handleKnowledge(false)}
              >
                <ThumbDownIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<BackspaceIcon />}
              >
                Clear
              </Button>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSave(word)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardActions>
    </Card>
  );
};

export default NewWord;
