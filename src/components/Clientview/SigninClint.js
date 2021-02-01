import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/ArrowForwardOutlined";
import { checkRequire, checkMobile } from "../Checks";
import {
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(400),
    },
  },
}));
// value={values.weight}
// onChange={handleChange('weight')}
export default function SigninClint(props) {
  const classes = useStyles();
  const [getMob, setMob] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getMoberr, setMoberr] = useState("");

  const handleSubmit = async () => {
    var err = false;
    if (!checkMobile(getMob)) {
      err = true;
      setMoberr(
        <font color="red" size="2">
          <b>Error in No</b>
        </font>
      );
    }
    if (!err) {
      var body = { mobileno: getMob };
      var result = await postData("copy/checkuser", body);
      if (result.RESULT == "NOT FOUND") {
        props.history.push({ pathname: `/UserForm` }, getMob);
      } else if (result.RESULT == "FOUND") {
        props.history.push(
          { pathname: `/ShowcartwithAddress` },
          { state: result }
        );
      }
    }
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Grid container>
          <Grid item xs={6}>
            <img src="images/banner.jpg" />
          </Grid>

          <Grid item xs={6}>
            <div>
              <h1>Sign In</h1>
              <h4>Sign in to access your Orders, Offers and Wishlist.</h4>

              <TextField
                id="outlined-basic"
                label="Contact No"
                variant="outlined"
                value={getMob}
                onChange={(event) => {
                  setMob(event.target.value);
                }}
                fullWidth
              />
              {getMoberr}

              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => handleSubmit()}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
