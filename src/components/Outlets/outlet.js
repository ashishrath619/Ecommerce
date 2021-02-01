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
import {postDataAndImage,getData,postData} from '../FetchNodeService';
import {checkRequire,checkMobile,checkPassword,checkEmail,checkPhone,checkLat,checkLon}from '../Checks';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
      },
      
      subclass:{
        marginTop:3,
        marginBottom:4,
        display:'flex',
        flexDirection:'row'

      },

     

  }));
//   <FormControl className={clsx(classes.margin, classes.textField)}>
//   <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
//   <Input
//     id="standard-adornment-password"
//     type={values.showPassword ? 'text' : 'password'}
//     value={values.password}
//      onChange={handleChange('password')}
//     endAdornment={
//       <InputAdornment position="end">
//         <IconButton
//           aria-label="toggle password visibility"
//            onClick={handleClickShowPassword}
//            onMouseDown={handleMouseDownPassword}
//         >
//           {values.showPassword ? <Visibility /> : <VisibilityOff />}
//         </IconButton>
//       </InputAdornment>
//     }
//   />
// </FormControl>

export default function OutletInterface(props){
    const classes = useStyles();
    const [getFirm,setFirm]=useState('')
    const [getOner,setOner]=useState('')
    const [getMob,setMob]=useState('')
    const [getPhone,setPhone]=useState('')
    const [getRegn,setRegn]=useState('')
    const [getGst,setGst]=useState('')
    const [getAdd,setAdd]=useState('')
    const [getState,setState]=useState('')
    const [getCity,setCity]=useState('')
    const [getLoc,setLoc]=useState('')
    const [getPic,setPic]=useState({pic:'',filepic:''})
    const [getEmail,setEmail]=useState('')
    const [getDes,setDes]=useState('')
    const [getAvg,setAvg]=useState('')
    const [getRate,setRate]=useState('')
    const [getStatus,setStatus]=useState('')
    const [getPwd,setPwd]=useState('')
    const [getLat,setLat]=useState('')
    const [getLong,setLong]=useState('')
    const [getMsg,setMsg]=useState('')

    const [geterrorFirm,seterrorFirm]=useState('')
    const [geterrorOner,seterrorOner]=useState('')
    const [geterrorMob,seterrorMob]=useState('')
    const [geterrorPhone,seterrorPhone]=useState('')
    const [geterrorRegn,seterrorRegn]=useState('')
    const [geterrorGst,seterrorGst]=useState('')
    const [geterrorAdd,seterrorAdd]=useState('')
    const [geterrorState,seterrorState]=useState('')
    const [geterrorCity,seterrorCity]=useState('')
    const [geterrorLoc,seterrorLoc]=useState('')
    const [geterrorPic,seterrorPic]=useState({pic:'',filepic:''})
    const [geterrorEmail,seterrorEmail]=useState('')
    const [geterrorDes,seterrorDes]=useState('')
    const [geterrorAvg,seterrorAvg]=useState('')
    const [geterrorRate,seterrorRate]=useState('')
    const [geterrorStatus,seterrorStatus]=useState('')
    const [geterrorPwd,seterrorPwd]=useState('')
    const [geterrorLat,seterrorLat]=useState('')
    const [geterrorLong,seterrorLong]=useState('')



    const [getstateList,setstateList]=useState([])
    const [getCitylist,setCitylist]=useState([])
   

////////////////////////////////////////////
    const fetchState=async()=>{
      let list=await getData('statecity/displayall')
      setstateList(list)
    }
    useEffect(function(){
    
    
      fetchState()
   
    },[])

    const fillstateItems=()=>{
      return(
      
        getstateList.map((item,key)=>{
         return(
         <MenuItem value={item.stateid}>{item.statename}</MenuItem>
         )})
      )
    }
    const handleStateChange = (event) => {

      setState(event.target.value)
      fetchCity(event.target.value)



    };
    
    const fetchCity=async(stateid)=>{
      var body={'stateid':stateid}
      let list=await postData('statecity/displayallcity',body)
      setCitylist(list)
    }
    // useEffect(function(){
    
    
    //   fetchCity()
   
    // },[])

    const fillCityItem=()=>{
      return(
         
        getCitylist.map((item,key)=>{
      return(
      <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    
      )})
      )
    
    }
    
    const handleCityChange = (event) => {

      setCity(event.target.value)



    };
 

    const handlePic=(event)=>{
        setPic({pic:event.target.files[0],filepic:URL.createObjectURL(event.target.files[0])})
    
       }


    const handleChangeStatus=(event)=>{
        setStatus(event.target.value)
   
       }

const handleClear = () => {
  setFirm('')
  setOner('')
  setMob('')
  setPhone('')
  setRegn('')
  setGst('')
  setAdd('')
  setState('')
  setCity('')
  setLoc('')
  setEmail('')
  setDes('')
  setAvg('')
  setRate('')
  setPwd('')
  setLat('')
  setLong('')
  setStatus('')
  setPic('')
  seterrorStatus('')
  seterrorLong('')
  seterrorPwd('')
  seterrorRate('')
  seterrorPic('')
  seterrorLat('')
  seterrorAvg('')
  seterrorDes('')
  seterrorEmail('')
  seterrorCity('')
  seterrorLoc('')
  seterrorState('')
  seterrorAdd('')
  seterrorGst('')
  seterrorRegn('')
  seterrorPhone('')
  seterrorMob('')
  seterrorOner('')
  seterrorFirm('') 
  setMsg('')     
      };












    const [values, setValues] = useState({
        
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleSubmit=async()=>{

        var err=false;
        if(!checkRequire(getFirm))
        {
          err=true;
          seterrorFirm('/images/cross.png')
        }
        else
        {
          
          seterrorFirm('/images/tick.png')
        }
        if(!checkRequire(getOner))
        {
          err=true;
          seterrorOner('/images/cross.png')
        }
        else
        {
          seterrorOner('/images/tick.png')

        }
        if(!checkMobile(getMob))
        {
          err=true;
          seterrorMob('/images/cross.png')
        }
        else
        {
          seterrorMob('/images/tick.png')

        }
        if(!checkPhone(getPhone))
        {
          err=true;
          seterrorPhone('/images/cross.png')
        }
        else
        {
          seterrorPhone('/images/tick.png')

        }
        if(!checkRequire(getRegn))
        {
          err=true;
          seterrorRegn('/images/cross.png')
        }
        else
        {
          seterrorRegn('/images/tick.png')

        }
        if(!checkRequire(getRate))
        {
          err=true;
          seterrorRate('/images/cross.png')
        }
        else
        {
          seterrorRate('/images/tick.png')

        }
        if(!checkEmail(getEmail))
        {
          err=true;
          seterrorEmail('/images/cross.png')
        }
        else
        {
          seterrorEmail('/images/tick.png')

        }
        if(! checkPassword(getPwd))
        {
          err=true;
          seterrorPwd('/images/cross.png')
        }
        else
        {
          seterrorPwd('/images/tick.png')

        }
        if(!checkRequire(getDes))
        {
          err=true;
          seterrorDes('/images/cross.png')
        }
        else
        {
          seterrorDes('/images/tick.png')

        }
        if(!checkRequire(getLoc))
        {
          err=true;
          seterrorLoc('/images/cross.png')
        }
        else
        {
          seterrorLoc('/images/tick.png')

        }
        if(!checkLon(getLong))
        {
          err=true;
          seterrorLong('/images/cross.png')
        }
        else
        {
          seterrorLong('/images/tick.png')

        }
        if(!checkLat(getLat))
        {
          err=true;
          seterrorLat('/images/cross.png')
        }
        else
        {
          seterrorLat('/images/tick.png')

        }
        if(!checkRequire(getStatus))
        {
          err=true;
          seterrorStatus('/images/cross.png')
        }
        else
        {
          seterrorStatus('/images/tick.png')

        }
        if(!checkRequire(getLong))
        {
          err=true;
          seterrorState('/images/cross.png')
        }
        else
        {
          seterrorState('/images/tick.png')

        }
        if(!checkRequire(getGst))
        {
          err=true;
          seterrorGst('/images/cross.png')
        }
        else
        {
          seterrorGst('/images/tick.png')

        }
        if(!checkRequire(getEmail))
        {
          err=true;
          seterrorEmail('/images/cross.png')
        }
        else
        {
          seterrorState('/images/tick.png')

        }
        if(!checkRequire(getAvg))
        {
          err=true;
          seterrorAvg('/images/cross.png')
        }
        else
        {
          seterrorAvg('/images/tick.png')

        }
        if(!checkRequire(getAdd))
        {
          err=true;
          seterrorAdd('/images/cross.png')
        }
        else
        {
          seterrorAdd('/images/tick.png')

        }
        if(err)
        {  alert('invalid')}
        else{
        const formData=new FormData()
        formData.append('firmname',getFirm)
        formData.append('ownername',getOner)
        formData.append('mobile',getMob)
        formData.append('phone',getPhone)
        formData.append('registrationno',getRegn)
        formData.append('gstno',getGst)
        formData.append('address',getAdd)
        formData.append('state',getState)
        formData.append('city',getCity)
        formData.append('location',getLoc)
        formData.append('photograph',getPic.pic)
        formData.append('emailid',getEmail)
        formData.append('description',getDes)
        formData.append('averageprice',getAvg)
        formData.append('ratings',getRate)
        formData.append('status',getStatus)
        formData.append('password',getPwd)
        formData.append('lat',getLat)
        formData.append('lng',getLong)


        
        const config={headers:{'content-type':'multipart/form-data'}}
        var result=await postDataAndImage('outlet/addnewrecord',formData,config)
        console.log(result)
        if(result)
        {setMsg("Record Submitted...")}
        else
        {
          setMsg("Fail to Submit Record..")
        }
     
       }
      }
    

    return ( 
<div className={classes.root}>
    <Paper className={classes.paperstyle}>
        <Paper elevation={0} className={classes.headstyle}>
            <Typography  gutterBottom>
        <b>Add New Outlets</b>
      </Typography>
      </Paper>
    <Grid container spacing={3}>
        <Grid item xs={6}>
        <img src={geterrorFirm} width='10' height='10' />

        <TextField label="Firm Name"  value={getFirm} fullWidth  onChange={(event)=>{setFirm(event.target.value)}} />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorOner} width='10' height='10' />

        <TextField label="Owner Name" value={getOner} fullWidth onChange={(event)=>{setOner(event.target.value)}}  />
        </Grid>

        <Grid item xs={6}>
        <img src={geterrorMob} width='10' height='10' />

        <TextField label="Mobile No" value={getMob} fullWidth onChange={(event)=>{setMob(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorPhone} width='10' height='10' />

        <TextField label="Phone No" value={getPhone} fullWidth onChange={(event)=>{setPhone(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorRegn} width='10' height='10' />

        <TextField label="Resgistration No"  value={getRegn} fullWidth onChange={(event)=>{setRegn(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorGst} width='10' height='10' />

        <TextField label="Gst No"  value={getGst} fullWidth onChange={(event)=>{setGst(event.target.value)}}   />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorAdd} width='10' height='10' />

        <TextField label="Address" value={getAdd}  fullWidth  onChange={(event)=>{setAdd(event.target.value)}} />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorState} width='10' height='10' />

        <FormControl className={classes.subclass}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getState}
          onChange={(event)=>handleStateChange(event)}
          fullWidth
        >
         {fillstateItems()}
        </Select>
      </FormControl>
      </Grid> 

        {/* <Grid item xs={6}>
        <TextField label="State"  value={getState} onChange={(event)=>{setState(event.target.value)}}  fullWidth  />
        </Grid> */}
        {/* <Grid item xs={6}>
        <TextField label="City"  fullWidth value={getCity} onChange={(event)=>{setCity(event.target.value)}}   />
        </Grid> */}
        <Grid item xs={6}>
        <img src={geterrorCity} width='10' height='10' />

        <FormControl className={classes.subclass}>
        <InputLabel id="demo-simple-select-label">City </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCity}
          onChange={(event)=>handleCityChange(event)}  
          fullWidth     
        >
         {fillCityItem()}
        </Select>
      </FormControl>
      </Grid> 

        <Grid item xs={6}>
        <img src={geterrorLoc} width='10' height='10' />

        <TextField label="Location"  value={getLoc} onChange={(event)=>{setLoc(event.target.value)}}   fullWidth  />
        </Grid>
        <Grid item xs={6}>
        <img src={geterrorPic} width='10' height='10' />

        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-fileicon"
        multiple
        type="file"
           onChange={(event)=>handlePic(event)}
         />
        <label htmlFor="contained-button-fileicon">
{/* <img src={geterrorIcon} width='10' height='10' /> */}

       <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
       Picture
        </Button>
      </label>
      </Grid>
  <Grid item xs={6} className={classes.container}>
  <Avatar alt="Remy Sharp" variant='rounded'  style={{width:90,height:60}} src={getPic.filepic} />
  </Grid>
  <Grid item xs={6}>
            <img src={geterrorEmail} width='10' height='10' />

  <TextField label="Email id" value={getEmail} fullWidth onChange={(event)=>{setEmail(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
            <img src={geterrorPwd} width='10' height='10' />

  <TextField label="Password" value={getPwd} fullWidth onChange={(event)=>{setPwd(event.target.value)}}  />
  </Grid>

  <Grid item xs={6}>
            <img src={geterrorDes} width='10' height='10' />

  <TextField label="Description"  fullWidth value={getDes}   onChange={(event)=>{setDes(event.target.value)}} />
  </Grid>
  <Grid item xs={6}>
            <img src={geterrorAvg} width='10' height='10' />

  <TextField label="Averageprice" value={getAvg} fullWidth onChange={(event)=>{setAvg(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
            <img src={geterrorRate} width='10' height='10' />

  <TextField label="Ratings"  value={getRate} fullWidth onChange={(event)=>{setRate(event.target.value)}}   />
  </Grid>
          <Grid item xs={12}>
          <div>Ad Status:</div>
          <img src={geterrorStatus} width='10' height='10' />

          <Radio
        checked={getStatus === 'Yes'}
         onChange={(event)=>handleChangeStatus(event)}
        value="Yes"
        name="radio-button-demo"
       // inputProps={{ 'aria-label': 'A' }}
      /> Yes
      <Radio
         checked={getStatus === 'No'}
         onChange={(event)=>handleChangeStatus(event)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      /> No
     
        </Grid>
  <Grid item xs={6}>
            <img src={geterrorLat} width='10' height='10' />

    
  <TextField label="Latitude"  fullWidth value={getLat}  onChange={(event)=>{setLat(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
            <img src={geterrorLong} width='10' height='10' />

  <TextField label="Longititude" value={getLong}  fullWidth onChange={(event)=>{setLong(event.target.value)}}  />
  </Grid>

<Grid item xs={6}  className={classes.container}>

<Button variant="contained" className={classes.button} color="primary" onClick={()=>handleSubmit()}>Save</Button>
</Grid>

<Grid item xs={6} className={classes.container}>

<Button variant="contained" className={classes.button} color="primary" onClick={()=>handleClear()}>Reset</Button>
</Grid>

<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>
  


</Grid>
</Paper>
   </div> 
   )
}