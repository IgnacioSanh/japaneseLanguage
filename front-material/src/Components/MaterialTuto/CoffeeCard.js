import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import { red } from "@material-ui/core/colors";
import CardMedia from "@material-ui/core/CardMedia";
import {
  CardHeader,
  Typography,
  Button,
  CardContent,
  Avatar,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: { maxWidth: 345 },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: 150,
    width: 150,
    margin: "0px auto",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CoffeeCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { avatarSrc, title, subtitle } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt="" src={avatarSrc} />}
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardMedia className={classes.media} image={avatarSrc} />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
