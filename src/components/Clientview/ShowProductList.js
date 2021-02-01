import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeService";
import Button from "@material-ui/core/Button";
import { Qtyctrl, qty } from "./Qtyctrl";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Mainview from "./Mainview";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import LocationCity from "@material-ui/icons/LocationCity";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  productpicturemedia: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  pricetxt: {
    textDecoration: "line-through",
    margin: "3px",
    color: "#353b48",
    fontWeight: "5px",
  },

  cart2: {
    paddingTop: "30px",
    paddingLeft: "60px",
  },
  cartbtn: {
    paddingTop: "10px",
  },

  productpictureroot: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    //padding:0,
    width: window.screen.width * 0.3,
    height: window.screen.height * 0.45,
    // margin:30,

    // border:'1px solid #dfe6e9',
    // borderRadius:12,
  },
}));

export default function ShowProduct(props) {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getListpic, setListpic] = useState([]);
  const [getCount, setCount] = React.useState(0);
  var dispatch = useDispatch();
  var params = useParams();

  const fetchproductbyid = async () => {
    let body = { productreid: params.pid };
    let list = await postData("productregister/displaybyid", body);
    setList(list);
  };

  const fetchDataadstatus = async () => {
    let body = { productid: params.pid };

    let list = await postData("productpic/fetchproductpic", body);
    setListpic(list);
  };

  useEffect(() => {
    fetchproductbyid();
    fetchDataadstatus();
  }, []);

  const slide = () => {
    return getListpic.map((item, key) => {
      return (
        <div className={classes.productpictureroot}>
          <img
            src={`${ServerURL}/images/${item.productpicture}`}
            className={classes.productpicturemedia}
          />
        </div>
      );
    });
  };

  // const handleQtyChange = (value, item, key) => {
  //   if (value == 0) {
  //     item["qtydemand"] = value;
  //     var list = getList;
  //     list[key]["cartstatus"] = 0;
  //     setList(list);
  //     dispatch({ type: "REMOVE_ITEM", payload: [item.productreid, item] });
  //     setCount(value); //only rendring
  //   } else {
  //     item["qtydemand"] = value;
  //     dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
  //     setCount(value); //only rendring
  //   }
  // };

  const addToCart = (item, key) => {
    item["qtydemand"] = 1;
    var list = getList;
    list[key]["cartstatus"] = 1;
    setList(list);
    dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
    setCount(item.productreid); //only rendring
  };
  const handleQtychange = (value, item, key) => {
    if (value == 0) {
      item["qtydemand"] = value;
      var list = getList;
      list[key]["cartstatus"] = 0;
      setList(list);
      dispatch({ type: "REMOVE_ITEM", payload: [item.productreid, item] });
      setCount(value);
    } else {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
      // setCount(item.productreid)
      setCount(value);
    }
  };
  const ShowProductbyid = () => {
    return getList.map((item, key) => {
      var cp = item.price;
      var op = item.offerprice;
      var save = cp - op;
      return (
        <div className={classes.cart2}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ padding: 5, marginLeft: 60, width: "54%" }}>
                  <Carousel
                    autoPlay
                    showArrows={true}
                    showIndicators={false}
                    showStatus={false}
                    thumbWidth={60}
                  >
                    {slide()}
                  </Carousel>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.cart2}>
                <h2>{item.productname}</h2>
                <div style={{ color: "#95a5a6" }}>{item.brandname}</div>

                <div className={classes.pricetxt}>
                  <b>M.R.P.{item.price}</b>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#2ecc71",
                    paddingTop: "5px",
                  }}
                >
                  Offer Price₹ {item.offerprice}
                </div>
                <div
                  style={{
                    color: "green",
                    textAlign: "left",
                    paddingTop: "5px",
                  }}
                >
                  <b>You Save ₹{save} </b>{" "}
                </div>
                <div>
                  {item.cartstatus == 0 ? (
                    <Button
                      className={classes.cartbtn}
                      variant="contained"
                      onClick={() => addToCart(item, key)}
                      color="primary"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Qtyctrl
                      onChange={(value) => handleQtychange(value, item, key)}
                    />
                  )}
                </div>

                <div>
                  <h2>Delivery</h2>

                  <FormControl className={classes.margin}>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <LocationCity />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="start">
                          <h4 style={{ color: "red" }}>Check</h4>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </Grid>
          </Grid>

          <Divider />
          <div>
            <h3>Description</h3>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Mainview history={props.history} />

      {ShowProductbyid()}

      <Footer />
    </div>
  );
}
