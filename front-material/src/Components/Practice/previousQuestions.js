import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FolderIcon from "@material-ui/icons/Folder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {});

const PreviousQuestions = () => {
  const classes = useStyles();
  return (
    <div className={classes.demo}>
      <List>
        <ListItem dense>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Single-line item" secondary="secondaty" />
        </ListItem>
      </List>
    </div>
  );
};

export default PreviousQuestions;
