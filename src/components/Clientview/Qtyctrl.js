import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        padding:'8',
          width:'8',
          height:'8',
      },
      divcontanier:{
          display:'flex',
          flexDirection:'row',
          
          


          
      }

}))
 function Qtyctrl(props){
    const classes = useStyles();
    const[getcounter,setcounter]=useState(props.value)
    

    const handleIncrement=()=>{
      var qty=getcounter+1
     setcounter(qty)
     props.onChange(qty)
    }
    const handleDecrement=()=>{
        if(getcounter=>1)
       { var qty=getcounter-1
        setcounter(qty)
        props.onChange(qty)

    }
       }
    return (
    <div className={classes.divcontanier}>
    <div className={classes.root}>
      <Avatar style={{marginRight:'20px',height:'27px',width:'21px',
         }} className={classes.orange}onClick={()=>handleIncrement()}>+</Avatar>
    <span style={{fontSize:'20px'}}>{getcounter}</span>
      <Avatar style={{marginLeft:'20px',width:'21px', height:'27px'}} className={classes.orange} onClick={()=>handleDecrement()}>-</Avatar>
    </div>
    </div>
    )

}
export {Qtyctrl}