import React, { useEffect } from "react";
import { Container, makeStyles, Grid, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Chart from "./Chart";
import Credits from "./Credits";
import MsgHistory from "./MsgHistory";
import clsx from "clsx";
import { getMessages, getBalance } from "../../actions";
import getPastDate from "../../utils/getPastDate";
import msgCount from "../../utils/msgCount";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "100px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "30px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const ReportingStatus = () => {
  const classes = useStyles();

  //fetch messages list from redux
  let messages = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  //balance data for credits component
  let userBalance = useSelector((state) => state.balanceReducer);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dateList = getPastDate(3);
  const count = msgCount(messages);
  let data = [];

  dateList.map((date) => {
    data.push({ time: date, amount: count[date] });
  });

  useEffect(() => {
    dispatch(getMessages);
    dispatch(getBalance);
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={data} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Credits credits={userBalance} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MsgHistory rows={messages} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportingStatus;
