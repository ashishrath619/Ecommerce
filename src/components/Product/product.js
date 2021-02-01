import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { postDataAndImage, getData, postData } from "../FetchNodeService";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { checkRequire } from "../Checks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import DropzoneComponent from "react-dropzone-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  paperstyle: {
    width: 800,
    margin: 5,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  headstyle: {
    display: "flex",
    margin: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f6",
  },

  button: {
    margin: theme.spacing(2),
    width: 150,
  },
  input: {
    display: "none",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  subclass: {
    marginTop: 3,
    marginBottom: 4,
    display: "flex",
    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  textarea: {
    width: "100%",
    height: "20",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

export default function ProductInterface(props) {
  const classes = useStyles();
  const [getCategory, setCategory] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getvender, setvender] = useState("");
  const [getModel, setModel] = useState("");
  const [getProduct, setProduct] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getPicture, setPicture] = useState({ Picture: "", filepic: "" });
  const [getAd, setAd] = useState({ ad: "", filead: "" });

  const [getOffer, setOffer] = useState("");
  const [getColor, setColor] = useState("");
  const [getRatings, setRatings] = useState("");
  const [getDelivry, setDelivry] = useState("");
  const [getAdstatus, setAdstatus] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getBrand, setBrand] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getList, setList] = useState([]);
  const [getBrandlist, setBrandlist] = useState([]);
  const [getModellist, setModellist] = useState([]);

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
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    fetchBrand(event.target.value);
  };
  const fetchBrand = async (categoryid) => {
    var body = { categoryid: categoryid };
    let list = await postData("brand/displayallbrands", body);
    setBrandlist(list);
  };

  const fillBrand = () => {
    return getBrandlist.map((item, key) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
    fetchModel(event.target.value);
  };

  const fetchModel = async (brandid) => {
    var body = { brandid: brandid };
    let list = await postData("modelnew/displaybyid", body);
    setModellist(list);
  };

  const fillModel = () => {
    return getModellist.map((item, key) => {
      return <MenuItem value={item.modelid}>{item.modelnam}</MenuItem>;
    });
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  const handlePicture = (event) => {
    setPicture({
      Picture: event.target.files[0],
      filepic: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleAd = (event) => {
    setAd({
      ad: event.target.files[0],
      filead: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleChange = (event) => {
    setAdstatus(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("venderid", getvender);
    formData.append("category", getCategory);
    formData.append("brand", getBrand);
    formData.append("model", getModel);
    formData.append("productname", getProduct);
    formData.append("description", getDescription);
    formData.append("price", getPrice);
    formData.append("ad", getAd.ad);
    formData.append("productads", getPicture.Picture);

    formData.append("offerprice", getOffer);
    formData.append("devilrycharge", getDelivry);
    formData.append("ratings", getRatings);
    formData.append("color", getColor);
    formData.append("status", getStatus);
    formData.append("adstatus", getAdstatus);

    const config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "productregister/addproduct",
      formData,
      config
    );
    console.log(result);
    if (result) {
      setMsg("Record Submitted...");
    } else {
      setMsg("Fail to Submit Record..");
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paperstyle}>
        <Paper elevation={0} className={classes.headstyle}>
          <Typography gutterBottom>
            <b>Add New Product</b>
          </Typography>
        </Paper>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Vanderid"
              value={getvender}
              fullWidth
              onChange={(event) => {
                setvender(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getCategory}
                onChange={(event) => handleCategoryChange(event)}
              >
                {fillcategory()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getBrand}
                onChange={handleBrandChange}
              >
                {fillBrand()}
              </Select>
            </FormControl>
          </Grid>
          {/* <TextField label="Brand"  value={getBrand} fullWidth  onChange={(event)=>{setBrand(event.target.value)}} />
        </Grid> */}
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getModel}
                onChange={handleModelChange}
              >
                {fillModel()}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
        <TextField label="Model"  value={getModel} fullWidth  onChange={(event)=>{setModel(event.target.value)}} />
        </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              value={getProduct}
              fullWidth
              onChange={(event) => {
                setProduct(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={6}
              className={classes.textarea}
              placeholder="Description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              fullWidth
            />
            {/* <TextField label="Description"  value={getDescription} fullWidth  onChange={(event)=>{setDescription(event.target.value)}} /> */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              value={getPrice}
              fullWidth
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Offerprice"
              value={getOffer}
              fullWidth
              onChange={(event) => {
                setOffer(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Delivry Charges"
              value={getDelivry}
              fullWidth
              onChange={(event) => {
                setDelivry(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Color"
              value={getColor}
              fullWidth
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Ad Status
              </InputLabel>

              <NativeSelect
                id="demo-customized-select-native"
                value={getAdstatus}
                onChange={handleChange}
                className={classes.inputa}
                fullWidth
              >
                <option aria-label="None" value="" />
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Offer type
              </InputLabel>

              <NativeSelect
                id="demo-customized-select-native"
                value={getStatus}
                onChange={handleChangeStatus}
              >
                <option aria-label="None" value="" />
                <option value={"Discount"}>Discount</option>
                <option value={"Cashback"}>Cashback</option>
                <option value={"NoOffer"}>No Offer</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Ratings"
              value={getRatings}
              fullWidth
              onChange={(event) => {
                setRatings(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-fileicon"
              multiple
              type="file"
              onChange={(event) => handlePicture(event)}
            />
            <label htmlFor="contained-button-fileicon">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Picture ad
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} className={classes.container}>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              style={{ width: 90, height: 60 }}
              src={getPicture.filepic}
            />
          </Grid>

          <Grid item xs={6}>
            <input
              accept="image/jpeg"
              className={classes.input}
              id="contained-button-filead"
              multiple
              type="file"
              onChange={(event) => handleAd(event)}
            />
            <label htmlFor="contained-button-filead">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Ad
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} className={classes.container}>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              style={{ width: 90, height: 60 }}
              src={getAd.filead}
            />
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.container}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={12}>
            <b>Message:&nbsp;&nbsp;{getMsg}</b>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
