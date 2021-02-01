import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Slider from "react-slick";
import Icon from '@material-ui/core/Icon';


var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
const useStyles = makeStyles((theme) => ({
    cardtext:{
        padding:'15px',
         textAlign:'center',
         fontSize:'30',
         margin:'2px'
       },
       cardtex:{
         textAlign:'center',
         fontSize:'30',
         display: "block",
         fontWeight: "bold",
       }, 
        pricetxt:{
         textAlign:'left',
         fontSize:'30',
         display: "block",
         textDecorationLine:"line-through",
       },
       cardroot: {
         padding:20,
         justifyContent:'center',
         alignItems:'center',
          display: 'flex',
       flexDirection:'row',
       height:130,
       width:150,
       borderRadius:12,
       margin:25,  
       flex:'wrap',
     
       },
       productroot: {
         padding:40,
         justifyContent:'center',
         alignItems:'center',
       height:210,
       width:120,
       border:'1px solid #2ecc71',
       borderRadius:12,
       margin:30,  
       verticalAlgin:"top" ,
       display: "inline-block",
       textAlign: "center",
       },
       categoryroot: {
         padding:20,
         justifyContent:'center',
         alignItems:'center',
       height:150,
       width:120,
       borderRadius:12,
       margin:25,  
       verticalAlgin:"top" ,
       display: "inline-block",
       textAlign: "center",
       flexDirection:'row',
       flex:'wrap',
     
       },
       categoryitem:{
         flex:'wrap',
         flexDirection:'row',
         display:'flex',
     
       },
       cardmedia: {
         flex:'wrap',
         margin:'20px',
         display:'flex',
         width:120,
         height: 140,
         
       },
       productmedia: {
         flexDirection:'row',
         flex:'wrap',
         margin:'10px',
         display:'flex',
         width:100,
         height: 90,
         
       },
       sectionMobile: {
         display: 'flex',
         [theme.breakpoints.up('md')]: {
           display: 'none',
         },
         aroot: {
           display: 'flex',
           flexWrap: 'wrap',
           justifyContent: 'space-around',
           overflow: 'hidden',
           backgroundColor: theme.palette.background.paper,
           
         },
         page:{
           height:'100vh',
           width:'100vh'
         },
         groot: {
            display: 'flex',
            flexWrap: 'wrap',
            // justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
          },
          gridList: {
            width: 500,
            height: 450,
          },
        
        }
        

    } )) 
export default function Showlist(){
    const classes = useStyles();
    const [getList,setList]=useState([])
    const [getListbrand,setListbrand]=useState([])
    const [getListad,setListad]=useState([])
    const[getProductlist,setProductlist]=useState([])
    const[getListtopbrand,setListtopbrand]=useState([])

    //product//
 const fetchproductData=async()=>{
    let list=await getData("productregister/displayallproduct")
    setProductlist(list)
  }
 
 const fetchDatabrand=async(categoryid)=>{
      let  body={'categoryid':categoryid}
     let list=await postData('brand/displayallbrandmainmenu',body)
     setListbrand(list)
     
   }
   ///////adstatus///
   const fetchDataadstatus=async()=>{
     let list=await getData('category/fetchcategoryadstatus')
         setListad(list)
     
   }
    ///////topbrands///
    const fetchDatatopbrands=async()=>{
     let list=await getData('brand/fetchtopbrand')
         setListtopbrand(list)
     
   }
 
 const fetchData=async()=>{
   let list=await getData('category/fetchcategory')
       setList(list)
   
 }
 //ad
 const fetchDatabrandad=async()=>{
   let list=await getData('brand/displayallbrandad')
       setbrandad(list)
   
 }
 useEffect(function(){
 
 fetchData()
 fetchDataadstatus()
 fetchproductData()
 fetchDatabrandad()
 fetchDatatopbrands()
 },[])

 const [getbrandad,setbrandad]=useState([])


 const brandsad=() =>{

  return (
    
    <div className={classes.groot}>
    <GridList cellHeight={'100%'} className={classes.gridList}>
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
      </GridListTile>
      {getbrandad.map((item) => (
          <GridListTile key={item.img}>
            <img src={`${ServerURL}/images/${item.ad}`} />
            
        </GridListTile>
      ))}
    </GridList>
  </div>

  );
}
/////////card/////
const showCategory=()=>{
    var colors=['#fad390','#ff4d4d','#fffa65','#dff9fb','#d2dae2']
    return(
      getListad.map((item,key)=>{
    return(
   

    <div>
       <Grid container spacing={3}>
        <Grid item xs={3}>
      <div className={classes.cardroot} style={{backgroundColor:`${colors[Math.floor((Math.random()*5))]}`}}>
        <Avatar variant="rounded"  className={classes.cardmedia} alt={item.categoryname} src={`${ServerURL}/images/${item.icon}`} />
      </div>
      <div className={classes.cardtext}>{item.categoryname}</div>
      </Grid>
        </Grid>
    </div>
    )
  })
    )}  
    
/*product*/
    const showProduct=()=>{
      return(
        getProductlist.map((item,key)=>{
          var cp=(item.price);
          var op=(item.offerprice)
          var save=cp-op
      return(
        <div>
                <Paper elevation={3} className={classes.productroot}>

      <div  >

        <Avatar variant="rounded"  className={classes.productmedia} alt={item.categoryname} src={`${ServerURL}/images/${item.ad}`} />
        <div className={classes.cardtex}>{item.productname}</div>
        <div className={classes.pricetxt}>M.R.P.{item.price}</div>
        <div style={{fontWeight: "bold",textAlign:'left'}}>₹ {item.offerprice}</div>
        <div style={{color:"green",textAlign:'left'}}>Save ₹{save}</div>
        <Button  style={{textAlign:'left',fontSize:"10px"}} variant="contained" color="primary"fullWidth >Add to Cart<Icon style={{ fontSize: 12 ,margin:"2px"}} >add_circle</Icon>
      </Button>
      </div>

</Paper>
      </div>
    )
  })
    )}  
    
    const showcategory =()=>{
        return(
          getList.map((item,key)=>{
            return(
  
      <div className={classes.papercss}>
      
            <Paper elevation={3} className={classes.categoryroot}>
           <div  >
  
           <Avatar variant="rounded"  className={classes.productmedia}  src={`${ServerURL}/images/${item.icon}`} />
           <div className={classes.cardtex}>{item.categoryname}</div>
  
           </div>
  
             </Paper>
  
          
          </div>
            )
          }
        ))
        }
        /**shop top brabd */
      const showtopbrands =()=>{
        return(
          getListtopbrand.map((item,key)=>{
            return(
  
      <div className={classes.papercss}>
      
            <Paper elevation={3} className={classes.categoryroot}>
           <div  >
  
           <Avatar variant="rounded"  className={classes.productmedia}  src={`${ServerURL}/images/${item.ad}`} />
           <div className={classes.cardtex}>{item.brandname}</div>
  
           </div>
  
             </Paper>
  
          
          </div>
            )
          }
        ))
        }
        return (
            <div>
            <Typography style={{marginLeft:50,paddingTop:25}}><h2>Show from top Categories</h2></Typography>
      <div className={classes.cardmedia}>
     

        {showCategory()}
        
      </div>
      <Typography style={{marginLeft:50,paddingTop:150}}><h3>Show from top Product</h3></Typography>
      <Slider {...settings} style={{width:'95%',marginLeft:"5px"}} >

        {showProduct()}
        {showProduct()}
        {showProduct()}

        </Slider>
   
        <div className={classes.groot}>

       {brandsad()}
       </div>

       <Typography style={{marginLeft:50}}><h3>Shop from Categories</h3></Typography>

       <div className={classes.categoryitem}>

       { showcategory()}
       </div>

               <Typography style={{marginLeft:50}}><h3>Shop from Brands</h3></Typography>
       <div className={classes.categoryitem}>

               {showtopbrands()}
               </div>

              

        </div>
        )
}