import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {getData,postData,postDataAndImage,ServerURL}  from '../FetchNodeService';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
      }
     

  }));
  
export default function MaterialTableDemo() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
          { title: 'Outletid', field: 'idoutlets' },
          { title: 'Firmname', field: 'firmname' },
        // { title: 'Contact Info', render:rowData=><div>{rowData.mobile}<br/>{rowData.emailid}<br/></div> },
          // { title: 'Emailid', field: 'emailid' },
          { title: 'Photograph', field: 'photograph',
          render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.photograph}`}/>
               </div>

        },
          { title: 'State', field: 'statename' },
          { title: 'City', field: 'cityname' },
          { title: 'Geo Location', render:rowData=><div><a href={`http://maps.google.com/maps?z=6&t=m&q=${rowData.lat},${rowData.lng}`}>Geo Location</a></div>},

    ],
});
const [getList,setList]=useState([])
const [getOpen,setOpen]=useState(false)
const [getOutletid,setOutletid]=useState('')

const [getFirm,setFirm]=useState('')
const [getOner,setOner]=useState('')
const [getMob,setMob]=useState('')
const [getPhone,setPhone]=useState('')
const [getRegn,setRegn]=useState('')
const [getGst,setGst]=useState('')
const [getAdd,setAdd]=useState('')
const [getStat,setStat]=useState('')
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
const [getstateList,setstateList]=useState([])
const [getCitylist,setCitylist]=useState([])

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

  setStat(event.target.value)
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

const fetchData=async()=>{
    let list=await getData('outlet/displayall')
        setList(list)
  }
  useEffect(function(){
  
  
 fetchData()
 
  },[])

  const handleClose = () => {
    setOpen(false);
    fetchData()

  };
  const handleClickOpen = (rowData) => {
    setOpen(true);
    fetchCity(rowData.state)
    setOutletid(rowData.idoutlets)
     setFirm(rowData.firmname)
     setOner(rowData.ownername)
     setMob(rowData.mobile)
     setPhone(rowData.phone)
     setRegn(rowData.registrationno)
     setGst(rowData.gstno)
     setAdd(rowData.address)
     setStat(rowData.state)
     setCity(rowData.city)
     setLoc(rowData.location)
     setPic({pic:'',filepic:`${ServerURL}/images/${rowData.photograph}`})
     setEmail(rowData.emailid)
     setDes(rowData.description)
     setAvg(rowData.averageprice)
     setRate(rowData.ratings)
     setStatus(rowData.status)
     setPwd(rowData.password)
     setLat(rowData.lat)
     setLong(rowData.lng)
     


  }
  
  const handleDelete=async(oldData)=>{
    let body={idoutlets:oldData.idoutlets}
    await postData('outlet/deleteData',body)
   
   }
  const handleSubmit=async()=>{

    const formData=new FormData()
    formData.append('idoutlets',getOutletid)

    formData.append('firmname',getFirm)
    formData.append('ownername',getOner)
    formData.append('mobile',getMob)
    formData.append('phone',getPhone)
    formData.append('registrationno',getRegn)
    formData.append('gstno',getGst)
    formData.append('address',getAdd)
    formData.append('state',getStat)
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
    var result=await postDataAndImage('outlet/editData',formData,config)
    console.log(result)
    if(result)
    {setMsg("Record Submitted...")}
    else
    {
      setMsg("Fail to Submit Record..")
    }
 
   }

  const editDailog=()=>{
    return(
      <Dialog
        open={getOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Outlet edit Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-dialog-description">
            
          <div className={classes.root}>
    
    <Grid container spacing={3}>
        <Grid item xs={6}>
        <TextField label="Firm Name"  value={getFirm} fullWidth  onChange={(event)=>{setFirm(event.target.value)}} />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Owner Name" value={getOner} fullWidth onChange={(event)=>{setOner(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Mobile No" value={getMob} fullWidth onChange={(event)=>{setMob(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Phone No" value={getPhone} fullWidth onChange={(event)=>{setPhone(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Resgistration No"  value={getRegn} fullWidth onChange={(event)=>{setRegn(event.target.value)}}  />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Gst No"  value={getGst} fullWidth onChange={(event)=>{setGst(event.target.value)}}   />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Address" value={getAdd}  fullWidth  onChange={(event)=>{setAdd(event.target.value)}} />
        </Grid>
        {/* <Grid item xs={6}>
        <TextField label="State"  value={getStat} onChange={(event)=>{setStat(event.target.value)}}  fullWidth  />
        </Grid> */}
         <Grid item xs={6}>

<FormControl className={classes.subclass}>
<InputLabel id="demo-simple-select-label">State</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={getStat}
  onChange={(event)=>handleStateChange(event)}
  fullWidth
>
 {fillstateItems()}
</Select>
</FormControl>
</Grid> 
        {/* <Grid item xs={6}>
        <TextField label="City"  fullWidth value={getCity} onChange={(event)=>{setCity(event.target.value)}}   />
        </Grid> */}
           <Grid item xs={6}>
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
        <TextField label="Location"  value={getLoc} onChange={(event)=>{setLoc(event.target.value)}}   fullWidth  />
        </Grid>
        <Grid item xs={6}>

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
  <TextField label="Email id" value={getEmail} fullWidth onChange={(event)=>{setEmail(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
  <TextField label="Password" value={getPwd} fullWidth onChange={(event)=>{setPwd(event.target.value)}}  />
  </Grid>

  <Grid item xs={6}>
  <TextField label="Description"  fullWidth value={getDes}   onChange={(event)=>{setDes(event.target.value)}} />
  </Grid>
  <Grid item xs={6}>
  <TextField label="Averageprice" value={getAvg} fullWidth onChange={(event)=>{setAvg(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
  <TextField label="Ratings"  value={getRate} fullWidth onChange={(event)=>{setRate(event.target.value)}}   />
  </Grid>
          <Grid item xs={12}>
          <div>Ad Status:</div>
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
  <TextField label="Latitude"  fullWidth value={getLat}  onChange={(event)=>{setLat(event.target.value)}}  />
  </Grid>
  <Grid item xs={6}>
  <TextField label="Longititude" value={getLong}  fullWidth onChange={(event)=>{setLong(event.target.value)}}  />
  </Grid>

<Grid item xs={6}  className={classes.container}>

<Button variant="contained" className={classes.button} color="primary" onClick={()=>handleSubmit()}>Save</Button>
</Grid>

<Grid item xs={6} className={classes.container}>

<Button variant="contained" className={classes.button} color="primary">Reset</Button>
</Grid>

<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>
  


</Grid>
   </div> 
   </DialogContentText>
   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose} color="primary">
       Close
     </Button>
     
   </DialogActions>
 </Dialog>
)
}

return (
    <div>
    <MaterialTable
    title="Outlet Table"
    columns={state.columns}
    data={getList}
    actions={[
      {
        icon: 'edit',
        tooltip: 'Edit',
         onClick: (event, rowData) => handleClickOpen(rowData)
      }
    ]}
    editable={{
    
      onRowDelete: (oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
              const data = [...getList];
              data.splice(data.indexOf(oldData), 1);
             setList(data)
          handleDelete(oldData)

          }, 600);
        }),
    }} 
    />
    {editDailog()}
    </div>
  );
}


   