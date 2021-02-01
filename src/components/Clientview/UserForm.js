import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import {
  checkRequire,
  checkEmail,
  checkMobile,
  checkPassword,
} from "../Checks";
import { postData, getData, ServerURL } from "../FetchNodeService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    width: 200,
  },

  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(1),
  },
  textField: {
    width: "45ch",
  },
}));
export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getOTP, setOTP] = useState("");
  const [getFnameerr, setFnameerr] = useState("");
  const [getLnameerr, setLnameerr] = useState("");
  const [getEmailerr, setEmailerr] = useState("");
  const [getOTPerr, setOTPerr] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getGotp, setGotp] = useState("");
  const [Pvalues, setPValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const otpCallback = async () => {
    let otp = parseInt(Math.random() * 9999) + 1000;
    let body = { otp: otp, mob: props.location.state };
    let result = await postData("smsapi/sendotp", body);
    if (result.result) {
      alert(result.result);
      setGotp(otp);
      alert(otp);
    }
  };
  useEffect(() => {
    otpCallback();
  }, []);
  const handlePChange = (prop) => (event) => {
    setPValues({ ...Pvalues, [prop]: event.target.value });
  };

  const handleClickShowPasswordP = () => {
    setPValues({ ...Pvalues, showPassword: !Pvalues.showPassword });
  };

  const handleMouseDownPasswordP = (event) => {
    event.preventDefault();
  };
  /** cp------*/
  const [CPvalues, setCPValues] = React.useState({
    password: "",
    showPassword: true,
  });

  const handleCPChange = (prop) => (event) => {
    setCPValues({ ...CPvalues, [prop]: event.target.value });
  };

  const handleClickShowPasswordC = () => {
    setCPValues({ ...CPvalues, showPassword: !CPvalues.showPassword });
  };

  const handleMouseDownPasswordC = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    var err = false;
    if (!checkRequire(getFname)) {
      err = true;
      setFnameerr(
        <font color="red" size="2">
          error in fisrt name
        </font>
      );
    }
    if (!checkRequire(getLname)) {
      err = true;
      setLnameerr(
        <font color="red" size="2">
          error in Last name
        </font>
      );
    }
    if (!checkRequire(getEmail)) {
      err = true;
      setEmailerr(
        <font color="red" size="2">
          error in Email
        </font>
      );
    }
    // if (Pvalues.password == CPvalues.password) {
    //   alert("matched");
    // } else {
    //   alert(" not matched");
    // }
    if (!err) {
      if (getGotp == getOTP) {
        let body = {
          mobileno: props.location.state,
          firstname: getFname,
          lastname: getLname,
          emailaddress: getEmail,
          password: Pvalues.password,
        };
        console.log(body);
        var result = await postData("copy/addnewrecord", body);
        if (result) {
          setMsg("Record Submitted ...");
        } else {
          setMsg("Fail to submit Record ..");
        }
      }
    }
  };
  return (
    <Grid className={classes.root} spacing={2}>
      <Paper>
        <Grid item lg={12} md={6}>
          <Grid container spacing={0}>
            <Grid item lg={6} md={6}>
              <img src="images/banner.jpg" />
            </Grid>
            <Grid item xs={6} md={6}>
              <div>
                <h2>Sign up</h2>
                <h4>Please enter your details</h4>
              </div>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  value={getFname}
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  variant="outlined"
                />
                {getFnameerr}
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  value={getLname}
                  onChange={(event) => setLname(event.target.value)}
                  variant="outlined"
                />
                {getLnameerr}
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  id="outlined-basic"
                  label="Email"
                  value={getEmail}
                  onChange={(event) => setEmail(event.target.value)}
                  variant="outlined"
                />
                {getEmailerr}
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={Pvalues.showPassword ? "text" : "password"}
                  value={Pvalues.password}
                  onChange={handlePChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordP}
                        onMouseDown={handleMouseDownPasswordP}
                        edge="end"
                      >
                        {Pvalues.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={CPvalues.showPassword ? "text" : "password"}
                  value={CPvalues.password}
                  onChange={handleCPChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordC}
                        onMouseDown={handleMouseDownPasswordC}
                        edge="end"
                      >
                        {CPvalues.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <h3>Verify</h3>
                <label>You have an OTP on +91{props.location.state}</label>
                <TextField
                  id="outlined-basic"
                  label="Otp"
                  value={getOTP}
                  onChange={(event) => setOTP(event.target.value)}
                  variant="outlined"
                />
              </FormControl>

              <Grid item xs={6} className={classes.center}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleSubmit()}
                >
                  Verify
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
