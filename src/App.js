import React from "react";
import Cata from "./components/categories/category";
import New from "./components/categories/new";
import Brand from "./components/brands/brand";
import Display from "./components/categories/displayall";
import DisplayTab from "./components/categories/Displaytable";
import DisplayBrand from "./components/brands/displaybrand";
import Outlet from "./components/Outlets/outlet";
import OutletDisplay from "./components/Outlets/Outeldisplay";
import Models from "./components/Modal/Modal";
import Modeltable from "./components/Modal/AddDisplay";
import Dashbord from "./components/admin/Dashbord";
import Login from "./components/admin/signup";
import Product from "./components/Product/product";
import UserLogin from "./components/user/userlog";
import Dashborduser from "./components/user/Dashborduser";
import Productdrop from "./components/Productpicture/Productpic";
import Addmodel from "./components/Modal/Addmodel";
import Mainpage from "./components/Clientview/Mainpage";
import Addproductpic from "./components/Product/Addproductpic";
import Footerpage from "./components/Clientview/Footer";
import headerpage from "./components/Clientview/header";
import Slider from "./components/Clientview/Slider";
import Showlist from "./components/Clientview/showlist";
import { Qtyctrl, qty } from "./components/Clientview/Qtyctrl";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import ProductListcategory from "./components/Clientview/ProductListcategory";
import Mainview from "./components/Clientview/Mainview";
import Firstpage from "./components/Clientview/Firstpage";
import AddProduct from "./components/Productpicture/AddProduct";
import ShowProductList from "./components/Clientview/ShowProductList";
import productslide from "./components/Clientview/productslide";
import SigninClint from "./components/Clientview/SigninClint";
import Showcart from "./components/Clientview/Showcart";
import Reactcycle from "./components/Clientview/Reactcycle";
import userdetails from "./components/Clientview/userdetails";
import SignInClient from "./components/Clientview/SignInClient";
import ShowcartIcon from './components/Clientview/ShowcartIcon'
import SignInUserForm from "./components/Clientview/SignInUserForm";
import UserForm from "./components/Clientview/UserForm";
import ShowcartwithAddress from "./components/Clientview/ShowcartwithAddress";
function App(props) {
  return (
    <div>
      <Router>
        <Route
          exact
          strict
          component={Cata}
          path="/category"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Brand}
          path="/brand"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Display}
          path="/displayall"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayTab}
          path="/Displaytable"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayBrand}
          path="/displaybrand"
          history={props.history}
        />
        <Route
          exact
          strict
          component={OutletDisplay}
          path="/Outeldisplay"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Outlet}
          path="/outlet"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Models}
          path="/Modal"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Modeltable}
          path="/displaymodel"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Login}
          path="/signup"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Dashbord}
          path="/Dashbord"
          history={props.history}
        />
         <Route
          exact
          strict
          component={ShowcartIcon}
          path="/ShowcartIcon"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Product}
          path="/Product"
          history={props.history}
        />
        <Route
          exact
          strict
          component={UserLogin}
          path="/UserLogin"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Dashborduser}
          path="/Dashborduser"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Productdrop}
          path="/Productdrop"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Addmodel}
          path="/Addmodel"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Mainpage}
          path="/Mainpage"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Addproductpic}
          path="/Addproductpic"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Footerpage}
          path="/Footerpage"
          history={props.history}
        />
        <Route
          exact
          strict
          component={headerpage}
          path="/headerpage"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Slider}
          path="/Slider"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Showlist}
          path="/Showlist"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Qtyctrl}
          path="/QTY"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ProductListcategory}
          path="/ProductListcategory/:cid"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Mainview}
          path="/Mainview"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Firstpage}
          path="/Firstpage"
          history={props.history}
        />
        <Route
          exact
          strict
          component={AddProduct}
          path="/AddProduct"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ShowProductList}
          path="/ShowProductList/:pid"
          history={props.history}
        />
        <Route
          exact
          strict
          component={productslide}
          path="/productslide/:pn"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SigninClint}
          path="/SigninClint"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Showcart}
          path="/Showcart"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Reactcycle}
          path="/reactcycle"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SignInClient}
          path="/SignInClient"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SignInUserForm}
          path="/SignInUserForm"
          history={props.history}
        />
        <Route
          exact
          strict
          component={UserForm}
          path="/UserForm"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ShowcartwithAddress}
          path="/ShowcartwithAddress"
          history={props.history}
        />
      </Router>
    </div>
  );
}

export default App;
