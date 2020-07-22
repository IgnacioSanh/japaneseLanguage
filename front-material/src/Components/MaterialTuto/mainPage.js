import React from "react";
import { Grid } from "@material-ui/core";
// import Header from "../Navbar/Header";
import Content from "./Contents";

function mainPage() {
  return (
    <Grid container direction="column">
      {/* <Grid item xs={12}>
        <Header />
      </Grid> */}
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Content />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default mainPage;
