import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import {
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeService";
import Avatar from "@material-ui/core/Avatar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Icon from "@material-ui/core/Icon";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { useDispatch, useSelector } from "react-redux";
import { ShowChart } from "@material-ui/icons";
import Showcarticon from "./ShowcartIcon";
import { Qtyctrl, qty } from "./Qtyctrl";
import ProductListcategory from "./ProductListcategory";
import productslide from "./productslide";

import Footer from "./Footer";
import Mainview from "./Mainview";
/*slider */

var settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    color: "secondary",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  titlemenu: {
    flexGrow: 1,
  },
  main: {
    display: "flex",
    flexDirection: "row",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  cardtext: {
    padding: "15px",
    textAlign: "center",
    fontSize: "30",
    margin: "2px",
  },
  cardtex: {
    textAlign: "center",
    fontSize: "30",
    display: "block",
    fontWeight: "bold",
  },
  pricetxt: {
    textAlign: "left",
    fontSize: "30",
    display: "block",
    textDecorationLine: "line-through",
  },
  cardroot: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 130,
    width: 150,
    borderRadius: 12,
    margin: 25,
    flex: "wrap",
  },
  productroot: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 120,
    border: "1px solid #2ecc71",
    borderRadius: 12,
    margin: 30,
    verticalAlgin: "top",
    display: "inline-block",
    textAlign: "center",
  },
  categoryroot: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 120,
    borderRadius: 12,
    margin: 25,
    verticalAlgin: "top",
    display: "inline-block",
    textAlign: "center",
    flexDirection: "row",
    flex: "wrap",
  },
  categoryitem: {
    flex: "wrap",
    width: "90%",
    // height: 300px;
    flexDirection: "row",
    display: "flex",
  },
  cardmedia: {
    flex: "wrap",
    margin: "20px",
    display: "flex",
    width: 120,
    height: 140,
    objectFit: "contain",
  },
  productmedia: {
    flexDirection: "row",
    flex: "wrap",
    margin: "10px",
    display: "flex",
    width: 100,
    height: 90,
    objectFit: "contain",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    aroot: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    page: {
      height: "100vh",
      width: "100vh",
    },
    gridList: {
      width: 500,
      height: 500,
    },
    papercss: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();

  //
  var dispatch = useDispatch();
  var cartitems = useSelector((state) => state.cart);
  const [getCount, setCount] = React.useState(cartitems.length);

  /////////////////////////////

  const [getList, setList] = useState([]);

  const [getListad, setListad] = useState([]);
  const [getProductlist, setProductlist] = useState([]);
  const [getListtopbrand, setListtopbrand] = useState([]);

  //product//
  const fetchproductData = async () => {
    let list = await getData("productregister/displayallproduct");
    setProductlist(list);
  };

  ///////adstatus///
  const fetchDataadstatus = async () => {
    let list = await getData("category/fetchcategoryadstatus");
    setListad(list);
  };
  ///////topbrands///
  const fetchDatatopbrands = async () => {
    let list = await getData("brand/fetchtopbrand");
    setListtopbrand(list);
  };

  const fetchData = async () => {
    let list = await getData("category/fetchcategory");
    setList(list);
  };
  //ad
  const fetchDatabrandad = async () => {
    let list = await getData("brand/displayallbrandad");
    setbrandad(list);
  };
  useEffect(function () {
    fetchData();
    fetchDataadstatus();
    fetchproductData();
    fetchDatabrandad();
    fetchDatatopbrands();
  }, []);

  // /////
  const handleShowproduct = (categoryid) => {
    props.history.push({ pathname: `/ProductListcategory/${categoryid}` });
  };
  const handleShowproductbyid = (productreid) => {
    props.history.push({ pathname: `/ShowProductList/${productreid}` });
    // props.history.push({pathname:`/productslide/${productname}`})
  };

  /////////card/////
  const showCategory = () => {
    var colors = ["#fad390", "#ff4d4d", "#fffa65", "#dff9fb", "#d2dae2"];
    return getListad.map((item, key) => {
      return (
        //   <div>
        //   <Card className={classes.cardroot}>
        //   <CardActionArea>
        //     <CardMedia
        //       className={classes.cardmedia}
        //       image={`${ServerURL}/images/${item.ad}`}
        //       title={item.categoryname}
        //     />
        //    <div className={classes.cardtext}>
        //       {item.categoryname}
        //       </div>
        //   </CardActionArea>

        // </Card>

        //   </div>

        <div>
          <Grid container>
            <Grid item xs={3}>
              <div
                className={classes.cardroot}
                style={{
                  backgroundColor: `${colors[Math.floor(Math.random() * 5)]}`,
                }}
                onClick={() => handleShowproduct(item.categoryid)}
              >
                {/* <Avatar
                  variant="rounded"
                  className={classes.cardmedia}
                  alt={item.categoryname}
                  src={`${ServerURL}/images/${item.icon}`}
                /> */}
                <img
                  src={`${ServerURL}/images/${item.icon}`}
                  className={classes.cardmedia}
                />
              </div>
              <div className={classes.cardtext}>{item.categoryname}</div>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  /*product*/
  const showProduct = () => {
    return getProductlist.map((item, key) => {
      var cp = item.price;
      var op = item.offerprice;
      var save = cp - op;
      return (
        <div>
          <Paper elevation={3} className={classes.productroot}>
            <div onClick={() => handleShowproductbyid(item.productreid)}>
              {/* <Avatar
                variant="rounded"
                className={classes.productmedia}
                alt={item.categoryname}
                src={`${ServerURL}/images/${item.ad}`}
              /> */}
              <img
                src={`${ServerURL}/images/${item.ad}`}
                className={classes.productmedia}
              />
              <div className={classes.cardtex}>{item.productname}</div>
              <div className={classes.pricetxt}>M.R.P.{item.price}</div>
              <div style={{ fontWeight: "bold", textAlign: "left" }}>
                ₹ {item.offerprice}
              </div>
              <div style={{ color: "green", textAlign: "left" }}>
                Save ₹{save}
              </div>
            </div>

            {item.cartstatus == 0 ? (
              <Button
                style={{
                  textAlign: "left",
                  fontSize: "10px",
                  marginTop: "10px",
                }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => addToCart(item, key)}
                color="primary"
              >
                Add to Cart
                <Icon style={{ fontSize: 12, margin: "2px" }}>add_circle</Icon>
              </Button>
            ) : (
              <Qtyctrl
                value={1}
                onChange={(value) => handleQtychange(value, item, key)}
              />
            )}
          </Paper>
        </div>
      );
    });
  };

  const handleQtychange = (value, item, key) => {
    if (value == 0) {
      item["qtydemand"] = value;
      var list = getProductlist;
      list[key]["cartstatus"] = 0;
      setProductlist(list);
      dispatch({ type: "REMOVE_ITEM", payload: [item.productreid, item] });
      setCount(value);
    } else {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
      // setCount(item.productreid)
      setCount(value);
    }
  };
  const addToCart = (item, key) => {
    item["qtydemand"] = 1;
    var list = getProductlist;
    list[key]["cartstatus"] = 1;
    setProductlist(list);
    dispatch({ type: "ADD_CART", payload: [item.productreid, item] });
    setCount(item.productreid);
    // setShowhidebtn(false)
  };
  // //////
  const changeView = (value, parameter) => {
    if (value == 1)
      setContainer(<ProductListcategory categoryid={parameter.categoryid} />);
  };

  const [getContainer, setContainer] = React.useState(
    <ProductListcategory changeView={changeView} />
  );
  // //////
  const countCartItems = () => {
    var count = cartitems.length;
    setCount(cartitems.length);
  };

  /**shop category */
  const showcategory = () => {
    return getList.map((item, key) => {
      return (
        <div className={classes.papercss}>
          <Paper elevation={3} className={classes.categoryroot}>
            <div>
              <Avatar
                variant="rounded"
                className={classes.productmedia}
                src={`${ServerURL}/images/${item.icon}`}
              />
              <div className={classes.cardtex}>{item.categoryname}</div>
            </div>
          </Paper>
        </div>
      );
    });
  };
  /**shop top brabd */
  const showtopbrands = () => {
    return getListtopbrand.map((item, key) => {
      return (
        <div className={classes.papercss}>
          <Paper elevation={3} className={classes.categoryroot}>
            <div>
              {/* <Avatar
                variant="rounded"
                className={classes.productmedia}
                src={`${ServerURL}/images/${item.ad}`}
              /> */}
              <img
                src={`${ServerURL}/images/${item.ad}`}
                className={classes.productmedia}
              />
              <div className={classes.cardtex}>{item.brandname}</div>
            </div>
          </Paper>
        </div>
      );
    });
  };
  const slider = () => {
    return getListad.map((item, key) => {
      return (
        // <Carousel showArrows={true} autoPlay={true} showThumbs={false} showStatus={true} showIndicators={true}>
        <div>
          <img src={`${ServerURL}/images/${item.ad}`} />
        </div>

        // </Carousel>
      );
    });
  };
  /*ad brand */
  const [getbrandad, setbrandad] = useState([]);

  const brandsad = () => {
    return (
      <div className={classes.aroot}>
        <GridList cellHeight={"100%"} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            {/* <ListSubheader component="div">December</ListSubheader> */}
          </GridListTile>
          {getbrandad.map((item) => (
            <GridListTile key={item.img}>
              <img src={`${ServerURL}/images/${item.ad}`} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  return (
    <div classNmae={classes.page}>
      <div className={classes.grow}>
        <Mainview history={props.history} />

        <Carousel
          showArrows={true}
          autoPlay={true}
          showThumbs={false}
          showStatus={true}
          showIndicators={true}
        >
          {slider()}
        </Carousel>
        <Typography style={{ marginLeft: 50, paddingTop: 25 }}>
          <h2>Show from top Categories</h2>
        </Typography>
        <div className={classes.cardmedia}>{showCategory()}</div>
        <Typography style={{ marginLeft: 50, paddingTop: 150 }}>
          <h3>Show from top Product</h3>
        </Typography>
        <Slider {...settings} style={{ width: "95%", marginLeft: "5px" }}>
          {showProduct()}
          {showProduct()}
        </Slider>
        {brandsad()}

        <Typography style={{ marginLeft: 50 }}>
          <h3>Shop from Categories</h3>
        </Typography>

        <div className={classes.categoryitem}>{showcategory()}</div>
        <Grid container>
          <Grid item xs={8}>
            <Typography style={{ marginLeft: 50 }}>
              <h3>Shop from Brands</h3>
            </Typography>

            <div
              style={{ flexDirection: "row", flex: "wrap", display: "flex" }}
            >
              {showtopbrands()}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
