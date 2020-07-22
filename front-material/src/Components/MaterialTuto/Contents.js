import React from "react";
import { Grid } from "@material-ui/core";
import CoffeeCard from "./CoffeeCard";

const Content = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <CoffeeCard
          avatarSrc="https://vipshopitaly.com/1487-large_default/coffee-machine-saeco-royal-gran-crema.jpg"
          title="Cuisinart Cafetera térmica programable, Acero inoxidable"
          subtitle="US$ 79.96"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CoffeeCard
          avatarSrc="https://vipshopitaly.com/1487-large_default/coffee-machine-saeco-royal-gran-crema.jpg"
          title="Cuisinart Cafetera térmica programable, Acero inoxidable"
          subtitle="US$ 79.96"
        />
      </Grid>
    </Grid>
  );
};

export default Content;
