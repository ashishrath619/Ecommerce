import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import Button from '@material-ui/core/Button';
import {Qtyctrl,qty} from './Qtyctrl'
import {useDispatch,useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { VerticalAlignCenter, VerticalAlignTop } from '@material-ui/icons';

  const useStyles = makeStyles((theme) => ({


  productpicturemedia: {
    display:'flex',
    width:'100%',
    height:'100%',
    
    
    
    
  },

  productpictureroot: {
    alignItems:'center',
    justifyContent:'center',
    display:'flex',
    //padding:0,
      width:window.screen.width*0.3,
      height:window.screen.height*0.45,
  // margin:30,
   
    // border:'1px solid #dfe6e9', 
    // borderRadius:12,
     
         },
        }))
 
         export default function SimpleSlider() {
          const classes = useStyles();

    const[getList,setList]=useState([])
    var params=useParams()

    const fetchDataadstatus=async()=>{
      let body={'productid':params.pn}

        let list=await postData('productpic/fetchproductpic',body)
            setList(list)
        
      }
      useEffect(()=>{
        fetchDataadstatus()
      },[])


      const slide=()=>{
        return (
          getList.map((item,key)=>{
              return (
      
<div className={classes.productpictureroot}>
<img src={`${ServerURL}/images/${item.productpicture}`} className={classes.productpicturemedia}/>

</div>  
                    
              )
          })
        );
      }
  return (
    
    <div style={{display:'flex',flexDirection:'row'}}>
    <div style={{padding:5,marginLeft:60,width:"60%"}}>

       <Carousel autoPlay showArrows={true} showIndicators={false} showStatus={false} thumbWidth={60}   >
               {slide()}
              
            </Carousel>
            </div>
            </div>

  
  );
}