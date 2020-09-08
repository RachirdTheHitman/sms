import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableComp from "./TableComp";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { addKey } from "../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  containerBot: {
    marginTop: theme.spacing(2),
  },
}));

const schema = yup.object().shape({
  apikey: yup.string().required(),
  apisecret: yup.string().required(),
  displayname: yup.string().required(),
});

export default function Settings() {
  const classes = useStyles();
  const rows = Object.values(useSelector((state) => state.keyReducer));
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            API Settings
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit((data) =>
              dispatch(addKey({ ...data, time: new Date().toLocaleString() }))
            )}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="API KEY"
              label="API KEY"
              name="apikey"
              type="text"
              autoComplete="email"
              autoFocus
            />
            <p>{errors.apikey?.message}</p>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="apisecret"
              label="API SECRET"
              type="text"
              id="password"
              autoComplete="current-password"
            />
            <p>{errors.apisecret?.message}</p>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="displayname"
              label="DISPLAY NAME"
              type="text"
              id="password"
              autoComplete="current-password"
            />
            <p>{errors.displayname?.message}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </div>
      </Container>

      <Divider />

      <Container className={classes.containerBot} maxWidth="md">
        <TableComp
          heads={["Name", "Key", "Secret", "Time Created"]}
          rows={rows}
        />
      </Container>
    </>
  );
}
