import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

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
    const { data } = await getWords();
    const words = data.words;
    this.setState({ words, filteredWords: words });
  }

  state = {
    words: [],
    filteredWords: [],
    snackbar: {
      openSnackbar: false,
      message: "",
      severity: "success",
    },
  };

  addWord = async (word) => {
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

    const onSearch = ({ currentTarget: input }) => {
      const { value: search } = input;
      const { words } = this.state;
      let filteredWords = words.filter((word) => word.meaning.includes(search));
      this.setState({ filteredWords });
    };
    const { filteredWords } = this.state;
    return (
      <div>
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
        <Grid container spacing={2} direction="column">
          <Grid item style={{ marginTop: 20 }}>
            <Typography variant="h3">Library</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              item
              direction="row"
              alignContent="center"
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={12} sm={3}>
                <Typography>Showing {wordCount} words.</Typography>
              </Grid>
              <Grid item xs={12} sm={5} style={{ paddingRight: 20 }}>
                <form>
                  <TextField
                    fullWidth
                    placeholder="Type a word"
                    autoComplete="off"
                    variant="outlined"
                    label="Search a word"
                    onChange={onSearch}
                  ></TextField>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container item direction="row" spacing={4}>
              <Grid item md={8} xs={12}>
                <Paper elevation={3}>
                  <WordList words={filteredWords} onDelete={this.deleteWord} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <NewWord onAddWord={this.addWord} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Library;
