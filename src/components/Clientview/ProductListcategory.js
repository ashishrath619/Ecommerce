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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  toproot: {
    // alignItems: "center",
    // justifyContent: "center",
    display: "flex",
    padding: 20,
    width: "auto",
    height: "auto",
    margin: 10,
    border: "1px solid #dcdde1",
    borderRadius: 12,
    backgroundColor: "white",
  },
  topmedia: {
    display: "flex",
    width: 150,
    height: 150,
    objectFit: "contain",
  },
  scardview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default function CategoryInterface(props) {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getCount, setCount] = React.useState(0);
  // const [checked, setChecked] = React.useState([0]);

  var dispatch = useDispatch();
  var params = useParams();
  const fetchProducts = async () => {
    let body = { category: params.cid };
    let list = await postData("productregister/productbycategorylist", body);
    setList(list);
  };

  useEffect(function () {
    fetchProducts();
  }, []);

  const CheckboxList = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    return (
      <List className={classes.root}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const showProducts = () => {
    return getList.map((item, key) => {
      var save = item.price - item.offerprice;
      return (
        <div>
          <div className={classes.toproot}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Avatar
                variant="square"
                className={classes.topmedia}
                alt={item.productname}
                src={`${ServerURL}/images/${item.ad}`}
              /> */}
              <img
                src={`${ServerURL}/images/${item.ad}`}
                className={classes.topmedia}
              />
              <div className={classes.text}>
                <b>
                  {item.productname.length >= 40
                    ? item.productname.toString().substring(0, 20) + "..."
                    : item.productname}
                </b>
              </div>
              <div>
                M.R.P{" "}
                <s>
                  <span>&#8377;</span> {item.price}
                </s>
              </div>
              <div>
                <b>
                  <span>&#8377;</span> {item.offerprice}
                </b>
              </div>
              <div>
                <small>
                  <font color="green">
                    Save <span>&#8377;</span> {save}
                  </font>
                </small>
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
                    value={1}
                    onChange={(value) => handleQtyChange(value, item, key)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleQtyChange = (value, item, key) => {
    if (value == 0) {
      item["qtydemand"] = value;
      var list = getList;
      list[key]["cartstatus"] = 0;
      setList(list);
      dispatch({ type: "REMOVE_ITEM", payload: [item.productreid, item] });
      setCount(value); //only rendring
    } else {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
      setCount(value); //only rendring
    }
  };

  const addToCart = (item, key) => {
    item["qtydemand"] = 1;
    var list = getList;
    list[key]["cartstatus"] = 1;
    setList(list);
    dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
    setCount(item.productreid); //only rendring
  };

  return (
    <div>
      <Mainview />
      <Grid container>
        <Grid item xs={12}>
          <img
            src="https://rukminim1.flixcart.com/flap/1500/1000/image/27bdf595e19887a3.jpg?q=50"
            width="100%"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              {CheckboxList()}
            </Grid>
            <Grid item xs={9}>
              <div className={classes.scardview}>{showProducts()}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}
