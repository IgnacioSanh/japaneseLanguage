import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: 340,
    maxHeight: 340,
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
  },
  textPrimary: {
    fontSize: "1.6rem",
  },
  leftBorder: {
    borderLeft: "5px solid red",
  },
}));

const renderNoWords = (hasWords) => {
  if (!hasWords) {
    return (
      <div style={{ marginTop: 40 }}>
        <Typography variant="h4" display="block" align="center" gutterBottom>
          You have no words
        </Typography>
        <Typography variant="subtitle1" display="block" align="center">
          Try adding a new word!
        </Typography>
      </div>
    );
  }
};

export default function WordList({ onDelete, words }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {renderNoWords(words.length > 0)}
        {words.map(({ original, meaning, _id, knowledge }) => {
          const labelId = `checkbox-list-label-${_id}`;
          return (
            <ListItem
              key={_id}
              classes={{ root: classes.leftBorder }}
              role={undefined}
              dense
              button
            >
              <ListItemText
                id={labelId}
                primary={original}
                classes={{ primary: classes.textPrimary }}
                secondary={meaning}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  color={knowledge ? "primary" : "default"}
                >
                  <ThumbUpIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  color={knowledge ? "default" : "primary"}
                >
                  <ThumbDownIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  color="secondary"
                  onClick={() => {
                    onDelete(_id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
