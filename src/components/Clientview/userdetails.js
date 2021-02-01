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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { postDataAndImage, postData } from "../FetchNodeService";
import { checkRequire } from "../Checks";
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
export default function SimplePaper(props) {
  const classes = useStyles();
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getOtp, setOtp] = useState("");
  const [getGOTP, setGOTP] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getFnameerr, setFnameerr] = useState("");
  const [getLnameerr, setLnameerr] = useState("");
  const [getEmailerr, setEmailerr] = useState("");
  const [getOtperr, setOtperr] = useState("");
  const [getPwd, setPwd] = useState("");
  const [getPhone, setPhone] = useState(props.location.state);

  // const [values, setValues] = React.useState({
  //   password: "",
  //   showPassword: false,
  // });

  const otpCallback = async () => {
    let otp = parseInt(Math.random() * 9999) + 1000;
    let body = { otp: otp, mob: props.location.state };
    let result = await postData("smsapi/sendotp", body);
    if (result) alert(result.result);
    setGOTP(otp);
  };
  useEffect(() => {
    otpCallback();
  }, []);

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = async () => {
    var err = false;

    if (!checkRequire(getFname)) {
      err = true;
      setFnameerr(
        <font color="red" size="2">
          <b>Error in No</b>
        </font>
      );
    } else {
      setFnameerr(
        <font color="red" size="2">
          <b> in No</b>
        </font>
      );
    }
    if (!err) {
      // if (getGOTP == getOTP) {
      let body = {
        mobileno: props.location.state,
        firstname: getFname,
        lastname: getLname,
        emailaddress: getEmail,
        password: getPwd,
      };
      var result = await postData("copy/addnewrecord", body);
      console.log("ashuish", result);
      if (result) {
        setMsg("Record submit....");
      } else {
        setMsg("failed to Submit....");
      }
    }
  };
  // };

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <img src="images/banner.jpg" />
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div>
                  <h1>Sign up</h1>
                  <h4>Please enter your details.</h4>
                </div>
              </Grid>

              <Grid item xs={10} style={{ padding: "5px" }}>
                <TextField
                  id="outlined-basic"
                  value={getFname}
                  label="First Name"
                  variant="outlined"
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  required
                  fullWidth
                />
                {getFnameerr}
              </Grid>

              <Grid item style={{ padding: "5px" }} xs={10}>
                <TextField
                  id="outlined-basic"
                  value={getLname}
                  label="Last Name"
                  variant="outlined"
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                  fullWidth
                  required
                />
                {getLnameerr}
              </Grid>

              <Grid item style={{ padding: "5px" }} xs={10}>
                <TextField
                  id="outlined-basic"
                  value={getEmail}
                  label="Email "
                  variant="outlined"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  fullWidth
                  required
                />
                {getEmailerr}
              </Grid>

              <Grid item style={{ padding: "5px" }} xs={10}>
                <TextField
                  id="outlined-basic"
                  value={getPwd}
                  onChange={(event) => setPwd(event.target.value)}
                  label="Password"
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <h2>Verify</h2>
                <span>
                  we have sent 6 digit OTP on mob no + {props.location.state}
                </span>
              </Grid>
              <Grid item style={{ padding: "5px" }} xs={12}>
                <TextField
                  id="outlined-basic"
                  value={getOtp}
                  label="OTP "
                  onChange={(event) => {
                    setOtp(event.target.value);
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={10}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit()}
                  fullWidth
                >
                  Verify
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
