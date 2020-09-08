import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
});

export default function Credits({ credits }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Credits Remained</Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        ${credits}
      </Typography>
      <Typography color="textSecondary">
        on 11 September, 2020
      </Typography>
    </React.Fragment>
  );
}