import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import WordList from "./wordList";
import NewWord from "./newWord";

import { saveWord, getWords, deleteWord } from "../../Services/wordService";

class Library extends Component {
  defaultWord = {
    original: "",
    meaning: "",
    knowledge: false,
  };

  async componentDidMount() {
    const { data: words } = await getWords();
    this.setState({ words });
  }

  state = {
    words: [],
    snackbar: {
      openSnackbar: false,
      message: "",
      severity: "success",
    },
  };

  addWord = async (word) => {
    //Add the user id
    word = { ...word, userId: "5f11dbed64aebf129629a9fc" };
    //Save in the DB
    const { error, word: retWord } = await saveWord(word);
    if (error) console.log(error);
    let words = [...this.state.words];

    words.push(retWord);
    let snackbar = {
      openSnackbar: true,
      message: "Word added",
      severity: "success",
    };
    this.setState({ words, snackbar });
  };

  deleteWord = async (id) => {
    let { words } = this.state;
    await deleteWord(id);
    words = words.filter((word) => word._id !== id);
    //Delete in the DB
    let snackbar = {
      openSnackbar: true,
      message: "Word deleted",
      severity: "warning",
    };
    this.setState({ words, snackbar });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    let snackbar = { ...this.state.snackbar, openSnackbar: false };
    this.setState({ snackbar });
  };

  Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  render() {
    const { openSnackbar, message, severity } = this.state.snackbar;
    const wordCount = this.state.words.length;
    return (
      <Grid container item xs={12} spacing={2}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          onClose={this.handleClose}
        >
          <this.Alert onClose={this.handleClose} severity={severity}>
            {message}
          </this.Alert>
        </Snackbar>
        <Grid item xs={12}>
          <Typography variant="h2">Library PO</Typography>
          <Typography variant="subtitle1">
            {wordCount} words in total
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <NewWord onAddWord={this.addWord} />
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper elevation={3}>
            <WordList words={this.state.words} onDelete={this.deleteWord} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Library;
