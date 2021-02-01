import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { postDataAndImage, getData } from "../FetchNodeService";
import { checkRequire } from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Brand(props) {
  const classes = useStyles();
  const [getCategoryid, setCategoryid] = useState();
  const [getBrandname, setBrandname] = useState();
  const [getDescription, setDescription] = useState();
  const [getPicture, setPicture] = useState({ picture: "", filepicture: "" });
  const [getAd, setAd] = useState({ ad: "", filead: "" });
  const [getAdstatus, setAdstatus] = useState();
  const [getTopbrands, setTopbrands] = useState();
  const [getNewbrands, setNewbrands] = useState();
  const [getMsg, setMsg] = useState();
  const [getErrorCa, seterrorCa] = useState("");
  const [geterrorBrand, seterrorBrand] = useState("");
  const [geterrorDe, seterrorDe] = useState("");
  const [geterrorPic, seterrorPic] = useState("");
  const [geterrorAd, seterrorAd] = useState("");
  const [geterrorStatus, seterrorStatus] = useState("");
  const [geterrorTop, seterrorTop] = useState("");
  const [geterrorNew, seterrorNew] = useState("");

  const [getList, setList] = useState([]);

  const fetchCategory = async () => {
    let list = await getData("category/displayall");
    setList(list);
  };
  useEffect(function () {
    fetchCategory();
  }, []);
  const fillcategory = () => {
    return getList.map((item, key) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handlePicture = (event) => {
    setPicture({
      picture: event.target.files[0],
      filepicture: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleAd = (event) => {
    setAd({
      ad: event.target.files[0],
      filead: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeAdStatus = (event) => {
    setAdstatus(event.target.value);
  };

  const handleChangeTopbrands = (event) => {
    setTopbrands(event.target.value);
  };
  const handleChangeNewbrands = (event) => {
    setNewbrands(event.target.value);
  };
  const ClearData = () => {
    setCategoryid("");
    setBrandname("");
    setDescription("");
    setPicture({ picture: "", filepicture: "" });
    setAd({ ad: "", filead: "" });
    setAdstatus("");
    setTopbrands("");
    setNewbrands("");
    setMsg("");
    seterrorCa("");
    seterrorBrand("");
    seterrorDe("");
    seterrorAd(" ");
    seterrorStatus("");
    seterrorPic("");
    seterrorTop("");
    seterrorNew("");
  };

  const handleSubmit = async () => {
    var err = false;

    if (!checkRequire(getCategoryid)) {
      err = true;
      seterrorCa("/images/cross.png");
    }

    if (checkRequire(getCategoryid)) {
      seterrorCa("/images/tick.png");
    }

    if (!checkRequire(getBrandname)) {
      err = true;
      seterrorBrand("/images/cross.png");
    }
    if (checkRequire(getBrandname)) {
      seterrorBrand("/images/tick.png");
    }

    if (!checkRequire(getDescription)) {
      err = true;
      seterrorDe("/images/cross.png");
    }
    if (checkRequire(getDescription)) {
      seterrorDe("/images/tick.png");
    }

    if (!checkRequire(getPicture.picture)) {
      err = true;
      seterrorPic("/images/cross.png");
    }
    if (checkRequire(getPicture.picture)) {
      seterrorPic("/images/tick.png");
    }

    if (!checkRequire(getAd.ad)) {
      err = true;
      seterrorAd("/images/cross.png");
    }
    if (checkRequire(getAd.ad)) {
      seterrorAd("/images/tick.png");
    }

    if (!checkRequire(getAdstatus)) {
      err = true;
      seterrorStatus("/images/cross.png");
    }
    if (checkRequire(getAdstatus)) {
      seterrorStatus("/images/tick.png");
    }

    if (!checkRequire(getNewbrands)) {
      err = true;
      seterrorNew("/images/cross.png");
    }
    if (checkRequire(getNewbrands)) {
      seterrorNew("/images/tick.png");
    }
    if (!checkRequire(getTopbrands)) {
      err = true;
      seterrorTop("/images/cross.png");
    }
    if (checkRequire(getTopbrands)) {
      seterrorTop("/images/tick.png");
    }

    if (!err) {
      const formData = new FormData();
      formData.append("categoryid", getCategoryid);
      formData.append("brandname", getBrandname);
      formData.append("description", getDescription);
      formData.append("picture", getPicture.picture);
      formData.append("ad", getAd.ad);
      formData.append("adstatus", getAdstatus);
      formData.append("topbrands", getTopbrands);
      formData.append("newbrands", getNewbrands);

      const config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage("brand/addbrand", formData, config);
      console.log(result);
      if (result) {
        setMsg("Record Submitted...");
      } else {
        setMsg("Fail to Submit Record..");
      }
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryid(event.target.value);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{
            backgroundColor: "#dfe6e9",
            height: "120vh",
            padding: "20px",
          }}
        >
          <Typography gutterBottom>
            <b>Add New Brand</b>
          </Typography>
          <Grid container spacing={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getCategoryid}
                onChange={handleCategoryChange}
              >
                {fillcategory()}
              </Select>
            </FormControl>

            {/* <Grid item xs={6}>
        <img src={getErrorCa} width='10' height='10' />
        <TextField  value={getCategoryid} label="Categoryid"  onChange={(event)=>{setCategoryid(event.target.value)}}/>
          </Grid> */}
            <Grid item xs={12}>
              <img src={geterrorBrand} width="10" height="10" />

              <TextField
                id="standard-basic"
                value={getBrandname}
                label="Brandname"
                fullWidth
                onChange={(event) => {
                  setBrandname(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <img src={geterrorDe} width="10" height="10" />
              <TextField
                id="standard-basic"
                value={getDescription}
                label="Description"
                fullWidth
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.root}>
                <img src={geterrorPic} width="10" height="10" />

                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-filepicture"
                  multiple
                  type="file"
                  onChange={(event) => handlePicture(event)}
                />
              </div>

              <label htmlFor="contained-button-filepicture">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                >
                  Picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                src={getPicture.filepicture}
                className={classes.large}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className={classes.root}>
                <img src={geterrorAd} width="10" height="10" />

                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-filead"
                  multiple
                  type="file"
                  onChange={(event) => handleAd(event)}
                />
              </div>

              <label htmlFor="contained-button-filead">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                >
                  Ad
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                src={getAd.filead}
                className={classes.large}
              />
            </Grid>
          </Grid>
          <label>Ad Status</label>
          <Grid item xs={12}>
            <img src={geterrorStatus} width="10" height="10" />
            <Radio
              checked={getAdstatus === "Yes"}
              onChange={(event) => {
                handleChangeAdStatus(event);
              }}
              value="Yes"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'A' }}
            />
            Yes
            <Radio
              checked={getAdstatus === "No"}
              onChange={(event) => {
                handleChangeAdStatus(event);
              }}
              value="No"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'B' }}
            />
            No
          </Grid>
          <label>Top Brand</label>

          <Grid item xs={12}>
            <img src={geterrorTop} width="10" height="10" />
            <Radio
              checked={getTopbrands === "Yes"}
              onChange={(event) => {
                handleChangeTopbrands(event);
              }}
              value="Yes"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'A' }}
            />
            Yes
            <Radio
              checked={getTopbrands === "No"}
              onChange={(event) => {
                handleChangeTopbrands(event);
              }}
              value="No"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'B' }}
            />
            No
          </Grid>
          <label>New Brand</label>

          <Grid item xs={12}>
            <img src={geterrorNew} width="10" height="10" />
            <Radio
              checked={getNewbrands === "Yes"}
              onChange={(event) => {
                handleChangeNewbrands(event);
              }}
              value="Yes"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'A' }}
            />
            Yes
            <Radio
              checked={getNewbrands === "No"}
              onChange={(event) => {
                handleChangeNewbrands(event);
              }}
              value="No"
              name="radio-button-demo"
              // inputProps={{ 'aria-label': 'B' }}
            />
            No
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => ClearData()}
              >
                Reset
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <b>Message:&nbsp;&nbsp;{getMsg}</b>
          </Grid>
        </Typography>
      </Container>
    </>
  );
}
