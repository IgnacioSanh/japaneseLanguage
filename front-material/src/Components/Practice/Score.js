import React from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  scoreBox: {
    padding: theme.spacing(2),
  },
  avatarSize: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const Scoreboard = ({ score }) => {
  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <ScoreBox title="Correct" score={score[0]} />
        <ScoreBox title="Wrong" score={score[1]} />
        <ScoreBox title="Strike" score={score[2]} />
      </Grid>
    </Paper>
  );
};

const ScoreBox = ({ title = "Score", score = 0 }) => {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Paper className={classes.scoreBox} elevation={3}>
        <Grid container item direction="column" alignItems="center">
          <Avatar className={classes.avatarSize}>{score}</Avatar>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Scoreboard;
