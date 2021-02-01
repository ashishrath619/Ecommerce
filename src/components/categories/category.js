import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { findByLabelText } from '@testing-library/react';
import {postDataAndImage} from '../FetchNodeService';
import {checkRequire}from '../Checks';

const useStyles = makeStyles((theme) => ({
    root: {
      
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop:10 
    },
    paperstyle:{
    width:450,
    margin:5,
    padding:20,
    backgroundColor:'#f5f6fa'

    },
    headstyle:{
        display:'flex',
        margin:10,
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f1f2f6'
        },


    button: {
        margin: theme.spacing(1),
        width:160,
      },
      input: {
        display: 'none',
      },
      container:{
     justifyContent:'center',
     alignItems:'center',
     display:'flex',
      }
     

  }));

export default function CategoryInterface(props){
    const classes = useStyles();
    const [getAdStatus,setAdStatus]=useState('')
    const [getCategoryName,setCategoryName]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getIcon,setIcon]=useState({icon:'',fileicon:''})
    const [getAd,setAd]=useState({ad:'',filead:''})
    const [getMsg,setMsg]=useState('')
    const [geterrorCn,seterrorCn]=useState('')
    const [geterrorde,seterrorde]=useState('')
    const [geterrorIcon,seterrorIcon]=useState('')
    const [geterrorAd,seterrorAd]=useState('')
    const [geterrorAdstatus,seterrorAdstatus]=useState('')




   const handleIcon=(event)=>{
    setIcon({icon:event.target.files[0],fileicon:URL.createObjectURL(event.target.files[0])})

   }
   const handleAd=(event)=>{
    setAd({ad:event.target.files[0],filead:URL.createObjectURL(event.target.files[0])})

   }

    const handleChangeAdStatus=(event)=>{
     setAdStatus(event.target.value)

    }
   const ClearData=()=>{
   setCategoryName('')
   setDescription('')
   setIcon({icon:'',fileicon:''})
   setAd({ad:'',filead:''})
   setAdStatus('')
   setMsg('')
   seterrorCn('')
   seterrorIcon('')
   seterrorde('')
   seterrorAd('')
   seterrorAdstatus('')
   
   }

  const handleSubmit=async()=>{
     
    var err=false;
    if(!checkRequire(getCategoryName))
    {
      err=true;
      seterrorCn('/images/cross.png')
    }
    else
    {seterrorCn('/images/tick.png') }

    if(!checkRequire(getDescription))
    {
      err=true;
      seterrorde('/images/cross.png')
    }
    else
    {seterrorde('/images/tick.png') }

    if(!checkRequire(getIcon.icon))
      { err=true
        seterrorIcon('/images/cross.png')
     }
 
else  
    { 
        seterrorIcon('/images/tick.png')
       }

    if(!checkRequire(getAd.ad))
    {
      err=true;
      seterrorAd('/images/cross.png')
    }
    else
    {seterrorAd('/images/tick.png') }

    if(!checkRequire(getAdStatus))
    {
      err=true;
      seterrorAdstatus('/images/cross.png')
    }
    else
    {seterrorAdstatus('/images/tick.png') }


    
    
   const formData=new FormData()
   formData.append('categoryname',getCategoryName)
   formData.append('description',getDescription)
   formData.append('icon',getIcon.icon)
   formData.append('ad',getAd.ad)
   formData.append('adstatus',getAdStatus)
   const config={headers:{'content-type':'multipart/form-data'}}
   var result=await postDataAndImage('category/addnewrecord',formData,config)
   console.log(result)
   if(result)
   {setMsg("Record Submitted...")}
   else
   {
     setMsg("Fail to Submit Record..")
   }

  }



return(
<div className={classes.root}>
    <Paper className={classes.paperstyle}>
        <Paper elevation={0} className={classes.headstyle}>
            <Typography  gutterBottom>
        <b>Add New Category</b>
      </Typography>
      
      </Paper>
    <Grid container spacing={1}>
        <Grid item xs={12}>
        <img src={geterrorCn} width='10' height='10' />

        <TextField label="Category Name" value={getCategoryName} fullWidth onChange={(event)=>{setCategoryName(event.target.value)}} />
        </Grid>
        <Grid item xs={12}>
        <img src={geterrorde} width='10' height='10' />

        <TextField label="Description" value={getDescription} onChange={(event)=>{setDescription(event.target.value)}} fullWidth />
        </Grid>

        <Grid item xs={6}>

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-fileicon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
      />
      <label htmlFor="contained-button-fileicon">
      <img src={geterrorIcon} width='10' height='10' />

        <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
          Upload Icon
        </Button>
      </label>
 </Grid>
        <Grid item xs={6} className={classes.container}>
        <Avatar alt="Remy Sharp" variant='rounded'  style={{width:90,height:60}} src={getIcon.fileicon} />
        </Grid>


        <Grid item xs={6}>
                  <img src={geterrorAd} width='10' height='10' />

         <input
        accept="image/jpeg"
        className={classes.input}
        id="contained-button-filead"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <label htmlFor="contained-button-filead">
        <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
          Upload Ad
        </Button>
      </label>
      </Grid>
        <Grid item xs={6} className={classes.container}>
        <Avatar alt="Remy Sharp" variant='rounded' style={{width:90,height:60}} src={getAd.filead} />
        </Grid>
        <Grid item xs={12}>
        <div>Ad Status:</div>   
        <img src={geterrorAdstatus} width='10' height='10' />
 
        <Radio
        checked={getAdStatus === 'Yes'}
        onChange={(event)=>handleChangeAdStatus(event)}
        value="Yes"
        name="radio-button-demo"
       // inputProps={{ 'aria-label': 'A' }}
      /> Yes
      <Radio
        checked={getAdStatus === 'No'}
        onChange={(event)=>handleChangeAdStatus(event)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      /> No
     
        </Grid>
       <Grid item xs={6}  className={classes.container}>

       <Button variant="contained" className={classes.button} color="primary" onClick={()=>handleSubmit()}>Save</Button>
       </Grid>

       <Grid item xs={6} className={classes.container}>

<Button variant="contained" className={classes.button} color="primary" onClick={()=>ClearData()}>Reset</Button>
</Grid>

<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>

        </Grid> 
    </Paper>

</div>)
}