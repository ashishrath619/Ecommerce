import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import {Qtyctrl,qty} from './Qtyctrl'
import Divider from '@material-ui/core/Divider';

import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
     
      popover: {
        pointerEvents: 'none',
        
      },
      paper1: {
        padding: theme.spacing(1),
        width:700,
         
      },
      paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
      },
    
}));

export default function ShowCartIcon(props)

{ const classes = useStyles();
    
    var cart=useSelector(state=>state.cart)
  var length=Object.keys(cart).length
  var cartitems=Object.values(cart)
  // var total=cartitems.reduce((a,b)=>a+b.price,0);
  var total=cartitems.reduce(calculate,[]);
   function calculate(a,b){
   var price=parseInt(b.offerprice==0?(b.price*b.qtydemand):(b.offerprice*b.qtydemand))
   return parseInt(a+price)

   }

   var totalsaving=cartitems.reduce(calculatesavings,0);
   function calculatesavings(a,b){
   var price=b.price-b.offerprice
   var netprice=price*b.qtydemand
   return a+(netprice)

   }
  
  console.log('xxxxxxxx',total) 

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  var dispatch=useDispatch()
  const [getCount,setCount]=React.useState(0)

  const handleQtyChange=(value,item,key)=>
  { if(value==0)
    { 
      item['qtydemand']=value
      // var list=getList
      // list[key]['cartstatus']=0
      // setList(list)
      dispatch({type:"REMOVE_ITEM",payload:[item.productreid,item]})
      setCount(value)//only rendring
  
    }
    else
    {
    item['qtydemand']=value
    dispatch({type:"ADD_CART",payload:[item.productreid,item]})
    setCount(value)//only rendring
  
  }
  }



  const handleCupan=()=>{
    return(

    <Grid container spacing={0}>

    <Grid item xs={5}>
    <Paper style={{width:'500px',marginTop:'70px'}} className={classes.paper}>
      <div>
      <h3>Apply Coupon </h3>
      <h5>Log in to see best offers and cashback deals
</h5>

      </div>

    </Paper>
  </Grid> 
  </Grid> 
    )

  }

  const handlePayment=()=>{
    return(

    <Paper style={{width:'500px',marginTop:'70px'}} className={classes.paper}>
    <Grid container spacing={0}>

    <Grid item xs={12}>
      <h3>Payment Details </h3>
      
      </Grid> 
      </Grid> 

      <Grid container spacing={2}>

      <Grid item xs={6}>
      <b>MRP Total</b>
      </Grid> 
      <Grid item xs={6}>
        {total}
        </Grid>
        {/* <Divider variant="middle" /> */}
        <Divider />


        <Grid item xs={6}>
      <b>Product Discount</b>
      </Grid> 

      <Grid item xs={6}>
        {totalsaving}

        </Grid>
        <Divider />
        <Grid item xs={6}>
      <b>Total Amount</b>
      </Grid> 
      <Grid item xs={6}>
        {total-totalsaving}

        </Grid>

        <Grid item xs={6}>
      <b>You Save</b>
      </Grid> 
      <Grid item xs={6}>
        {totalsaving}

        </Grid>
      
        

  </Grid> 
  </Paper>

    )

  }
  const ShowCartItems=()=>{
    return(
    <div className={classes.root}>
      <h2>My cart</h2>
      <Grid container spacing={0}>
          <Paper  style={{width:'700px'}}className={classes.paper}>
          <b>ORDER SUMMARY</b>
          {cartitems.map((item,key)=>(
   <>
          <Grid container spacing={0}>
          <Grid item xs={3}>
          <img src={`${ServerURL}/images/${item.ad}`} width="40px" height="50px"/>

        </Grid>
          <Grid   item xs={5}>
            <ul style={{listStyleType:'none'}}>
              <li>{item.productname}</li>
              <li> <span><b>₹{item.offerprice}</b></span><span  style={{textDecoration:'line-through',color:"gray",padding:"3px"}}>₹{item.price}</span>
              <span style={{color:"green",textAlign:'left'}}>Save ₹{(item.price)-(item.offerprice)}</span>
              </li>
            </ul>

            

         {/* {item.productname} */}
          
        </Grid>
        
        <Grid item xs={4}>
          <Qtyctrl  value={item.qtydemand}
          onChange={(value)=>handleQtyChange(value,item,key)} />
        {/* <span>&#8377;</span>&nbsp;{item.offerprice==0?item.price:item.offerprice} X {item.qtydemand} */}
        </Grid>
        </Grid>

        </>

      ))}
        <Grid item xs={3}>
        <div><b><span>&#8377;</span>&nbsp;{total}</b></div>
    <small style={{color:'#27ae60'}}>You save<span>&#8377;</span>&nbsp;{totalsaving}</small>
        </Grid>
        <Grid item xs={3}>
        {/* <img src={`${ServerURL}/images/${item.productpicture}`} width="50px" height="30px" /> */}
        </Grid>










          </Paper>







 
       
        </Grid>
   

</div>
   )


  }
  
  return(
    <div>
       <Grid container spacing={0}>

<Grid item xs={7}>
             {ShowCartItems()}     

       </Grid>
       <Grid item xs={5}>

{ handleCupan()}

{ handlePayment()}

</Grid>

</Grid>

    </div>
          
  )

}