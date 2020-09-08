import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Send } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { sendMessage } from "../actions";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
  textarea: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2)
  }
}));

const schema = yup.object().shape({
  from: yup.string().required(),
  to: yup.number().positive().integer().required(),
  message: yup.string().required(),
});

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(sendMessage(data));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Send />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send Message
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="from"
              label="FROM:"
              name="from"
              type="text"
              autoComplete="email"
              autoFocus
            />
            <p>{errors.from?.message}</p>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="to"
              label="TO:"
              type="text"
              id="to"
              autoComplete="current-password"
            />
            <p>{errors.to?.message}</p>

            <Controller className={classes.textarea} as={TextareaAutosize} control={control} aria-label="minimum height" rowsMin={5} name="message" placeholder='Maximum character count to 160, massage will be sent as multiple part if surpass limit'/>
            <p>{errors.message?.message}</p>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SEND
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
