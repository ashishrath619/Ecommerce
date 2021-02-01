import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import {
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeService";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Qtyctrl, qty } from "./Qtyctrl";
import TextField from "@material-ui/core/TextField";

import Footer from "./Footer";
import Mainview from "./Mainview";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  popover: {
    pointerEvents: "none",
  },
  paper1: {
    padding: theme.spacing(1),
    width: 700,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function ShowCartAddress(props) {
  const classes = useStyles();
  ///////////
  const [getAdd, setAdd] = useState("");
  const [getCity, setCity] = useState("");
  const [getPin, setPin] = useState();
  const [getStat, setStat] = useState();
  const [getMsg, setMsg] = useState();
  const [getaddrDataList, setaddrDataList] = useState([]);
  const [gettemplist, settemplist] = useState([]);
  /**---getadd data */
  const fetchadddata = async () => {
    var body = { mobileno: propsid.mobileno };
    let list = await postData("copy/Displydata", body);
    setaddrDataList(list);
    settemplist(list);
  };
  const handleadd = async () => {
    var body = {
      mobileno: propsid.mobileno,
      firstname: propsid.firstname,
      lastname: propsid.lastname,
      emailaddress: propsid.emailaddress,
      password: propsid.password,
      address: getAdd,
      city: getCity,
      state: getStat,
      zipcode: getPin,
    };
    var result = await postData("copy/updatenewrecord", body);
    if (result) {
      alert("Record Submitted ...");
    } else {
      alert("Fail to submit Record ..");
    }
  };
  var propsid = props.location.state.state.DATA[0];
  useEffect(() => {
    fetchadddata();
    console.log(propsid.mobileno);
  }, []);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-static"
            label="Address"
            multiline
            value={getAdd}
            onChange={(e) => {
              setAdd(e.target.value);
            }}
            rows={3}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Pincode"
            value={getPin}
            onChange={(e) => {
              setPin(e.target.value);
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="State"
            value={getStat}
            onChange={(e) => {
              setStat(e.target.value);
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="City"
            value={getCity}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleadd()}
          >
            Confirm
          </Button>
        </form>
      </List>
      <Divider />
    </div>
  );

  ///////////
  var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;
  var cartitems = Object.values(cart);
  // var total=cartitems.reduce((a,b)=>a+b.price,0);
  var total = cartitems.reduce(calculate, []);
  function calculate(a, b) {
    var price = parseInt(
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand
    );
    return parseInt(a + price);
  }

  var totalsaving = cartitems.reduce(calculatesavings, 0);
  function calculatesavings(a, b) {
    var price = b.price - b.offerprice;
    var netprice = price * b.qtydemand;
    return a + netprice;
  }

  console.log("xxxxxxxx", total);

  const [anchorEl, setAnchorEl] = React.useState(null);
  var dispatch = useDispatch();
  const [getCount, setCount] = React.useState(0);

  const handleQtyChange = (value, item, key) => {
    if (value == 0) {
      item["qtydemand"] = value;
      // var list=getList
      // list[key]['cartstatus']=0
      // setList(list)
      dispatch({ type: "REMOVE_ITEM", payload: [item.productreid, item] });
      setCount(value); //only rendring
    } else {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
      setCount(value); //only rendring
    }
  };

  const handleCupan = () => {
    return (
      <Grid container spacing={0}>
        <Grid item xs={5} sm={3}>
          <Paper
            style={{ width: "500px", marginTop: "70px" }}
            className={classes.paper}
          >
            <div>
              <h3>Apply Coupon </h3>
              <h5>Log in to see best offers and cashback deals</h5>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  const showAddress = () => {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={6}>
            <h3>{getAdd} </h3>
          </Grid>
        </Grid>
      </div>
    );
  };

  const handlePayment = () => {
    return (
      <Paper
        style={{ width: "500px", marginTop: "70px" }}
        className={classes.paper}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <h3>Payment Details </h3>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <b>MRP Total</b>
          </Grid>
          <Grid item xs={6} sm={6}>
            {total}
          </Grid>
          {/* <Divider variant="middle" /> */}
          <Divider />

          <Grid item xs={6} sm={6}>
            <b>Product Discount</b>
          </Grid>

          <Grid item xs={6} sm={6}>
            {totalsaving}
          </Grid>
          <Divider />
          <Grid item xs={6} sm={6}>
            <b>Total Amount</b>
          </Grid>
          <Grid item xs={6} sm={6}>
            {total - totalsaving}
          </Grid>

          <Grid item xs={6} sm={6}>
            <b>You Save</b>
          </Grid>
          <Grid item xs={6} sm={6}>
            {totalsaving}
          </Grid>
        </Grid>
      </Paper>
    );
  };
  const ShowCartItems = () => {
    return (
      <div className={classes.root}>
        <h2>My cart</h2>
        <Grid container spacing={0}>
          <Paper style={{ width: "700px" }} className={classes.paper}>
            <b>ORDER SUMMARY</b>
            {cartitems.map((item, key) => (
              <>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <img
                      src={`${ServerURL}/images/${item.ad}`}
                      width="40px"
                      height="50px"
                    />
                  </Grid>
                  <Grid item xs={5} sm={4}>
                    <ul style={{ listStyleType: "none" }}>
                      <li>{item.productname}</li>
                      <li>
                        <span>
                          <b>₹{item.offerprice}</b>
                        </span>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                            padding: "3px",
                          }}
                        >
                          ₹{item.price}
                        </span>
                        <span style={{ color: "green", textAlign: "left" }}>
                          Save ₹{item.price - item.offerprice}
                        </span>
                      </li>
                    </ul>

                    {/* {item.productname} */}
                  </Grid>

                  <Grid item xs={4}>
                    <Qtyctrl
                      value={item.qtydemand}
                      onChange={(value) => handleQtyChange(value, item, key)}
                    />
                    {/* <span>&#8377;</span>&nbsp;{item.offerprice==0?item.price:item.offerprice} X {item.qtydemand} */}
                  </Grid>
                </Grid>
              </>
            ))}
            <Grid item xs={3} sm={3}>
              <div>
                <b>
                  <span>&#8377;</span>&nbsp;{total}
                </b>
              </div>
              <small style={{ color: "#27ae60" }}>
                You save<span>&#8377;</span>&nbsp;{totalsaving}
              </small>
            </Grid>
            <Grid item xs={3} sm={3}>
              {/* <img src={`${ServerURL}/images/${item.productpicture}`} width="50px" height="30px" /> */}
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  };

  const Address = () => {
    return (
      <div>
        <Grid container spacing={0}>
          <Paper style={{ width: "700px" }} className={classes.paper}>
            <Grid item xs={12}>
              <h3>Select Delivery Address</h3>
              {gettemplist.map((iteme) =>
                iteme.address >= 0 ? (
                  <Grid item xs={6}>
                    <div>
                      <React.Fragment key={"right"}>
                        <Drawer
                          anchor={"right"}
                          open={state["right"]}
                          onClose={toggleDrawer("right", false)}
                        >
                          {list("right")}
                        </Drawer>

                        <Button
                          variant="contained"
                          className={classes.button}
                          color="primary"
                          onClick={toggleDrawer("right", true)}
                        >
                          Add Address
                        </Button>
                      </React.Fragment>
                    </div>
                  </Grid>
                ) : (
                  <div>
                    {getaddrDataList.map((item) => (
                      <Paper
                        elevation={0}
                        style={{
                          backgroundColor: "#f5f6fa",
                          borderRadius: 12,
                          width: "500px",
                          padding: 5,
                        }}
                      >
                        <ul style={{ listStyleType: "none", color: "#2f3640" }}>
                          <li>
                            <b>
                              {item.firstname} {item.lastname}
                            </b>
                          </li>
                          <li>Mob no-{item.mobileno}</li>
                          <li>{item.address}</li>
                          <li>
                            Pin code-
                            {item.zipcode}
                            {item.state} {item.city}
                          </li>
                        </ul>
                        <React.Fragment key={"right"}>
                          <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                          >
                            {list("right")}
                          </Drawer>

                          <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={toggleDrawer("right", true)}
                          >
                            Change Address
                          </Button>
                        </React.Fragment>
                      </Paper>
                    ))}
                  </div>
                )
              )}

              {/* {getaddrDataList.map((item) => (
                <Paper
                  elevation={0}
                  style={{
                    backgroundColor: "#f5f6fa",
                    borderRadius: 12,
                    width: "500px",
                    padding: 5,
                  }}
                >
                  <ul style={{ listStyleType: "none", color: "#2f3640" }}>
                    <li>
                      <b>
                        {item.firstname} {item.lastname}
                      </b>
                    </li>
                    <li>Mob no-{item.mobileno}</li>
                    <li>{item.address}</li>
                    <li>
                      Pin code-
                      {item.zipcode}
                      {item.state} {item.city}
                    </li>
                  </ul>
                </Paper>
              ))} */}
            </Grid>

            {/* <Grid item xs={6}>
              <div>
                <React.Fragment key={"right"}>
                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    {list("right")}
                  </Drawer>

                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={toggleDrawer("right", true)}
                  >
                    Add Address
                  </Button>
                </React.Fragment>
              </div>
            </Grid> */}
          </Paper>
        </Grid>
      </div>
    );
  };
  return (
    <div>
      <Mainview history={props.history} />

      <Grid container spacing={0}>
        <Grid item xs={7} style={{ marginTop: 70 }}>
          {Address()}
          {showAddress()}
          {ShowCartItems()}
        </Grid>
        <Grid item xs={5}>
          {handleCupan()}

          {handlePayment()}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
