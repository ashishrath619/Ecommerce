import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },

}));



export default function MaterialTableDemo() {
  const classes = useStyles();

  
  const [state, setState] = useState({
    columns: [
      { title: 'Brand ID', field: 'brandid' },
      { title: 'categoryid', field: 'categoryname' },
      // { title: 'CategoryName', field: 'categoryname' },

      { title: 'Brandname', field: 'brandname' },
      { title: 'Description ', field: 'description'},
      { title: 'Picture',field: 'picture',
      render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.picture}`}/>
      </div>
    
    },
      { title: 'Ad',field: 'ad',
      render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.ad}`}/>
     </div>
    },
      { title: 'Status',field: 'adstatus'},
      { title: 'TopBrands',field: 'topbrands'},
      { title: 'NewBrands',field: 'newbrands'},

    ],
    
  });
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getBrandid,setBrandid]=useState();

  const [getCategoryid,setCategoryid]=useState();
  const [getBrandname,setBrandname]=useState();
  const [getDescription,setDescription]=useState();
  const [getPicture,setPicture]=useState({picture:'',filepicture:''});
  const [getAd,setAd]=useState({ad:'',filead:''});
  const [getAdstatus,setAdstatus]=useState();
  const [getTopbrands,setTopbrands]=useState();
  const [getNewbrands,setNewbrands]=useState();
  const [getMsg,setMsg]=useState();
  const [getLis,setLis]=useState([])

  


  const handlePicture=(event)=>{
    setPicture({picture:event.target.files[0],filepicture:URL.createObjectURL(event.target.files[0])})
  }
  const handleAd=(event)=>{
    setAd({ad:event.target.files[0],filead:URL.createObjectURL(event.target.files[0])})
  }

const handleChangeAdStatus=(event)=>{
  setAdstatus(event.target.value)
}

const handleChangeTopbrands=(event)=>{
  setTopbrands(event.target.value)
}
const handleChangeNewbrands=(event)=>{
  setNewbrands(event.target.value)
}

  const handleDelete=async(oldData)=>{
    let body={brandid:oldData.brandid}
    await postData('brand/deleteData',body)
   
   }
   const handleClickOpen = (rowData) => {
    setOpen(true);
    setBrandid(rowData.brandid)

     setCategoryid(rowData.categoryid)
    setBrandname(rowData.brandname)
    setDescription(rowData.description)
    setPicture({picture:'',filepicture:`${ServerURL}/images/${rowData.picture}`})
    setAd({ad:'',filead:`${ServerURL}/images/${rowData.ad}`})
    setAdstatus(rowData.adstatus)
    setTopbrands(rowData.topbrands)
    setNewbrands(rowData.newbrands)

  };

  const handleClose = () => {
    setOpen(false);
    fetchData()

  };




  const fetchData=async()=>{
    let list=await getData('brand/displayall')
        setList(list)
  }
  useEffect(function(){
  
  
 fetchData()
 
  },[])
  const fetchCategory=async()=>{
    let list=await getData('category/displayall')
        setLis(list)
  }
  useEffect(function(){
  
  
    fetchCategory()
    
     },[])
     const fillcategory=()=>{
       return(
       
        getLis.map((item,key)=>{
          return(
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          )})
       )
     }

  const handleSubmit=async()=>{
    const formData=new FormData()
    formData.append('brandid',getBrandid)

    formData.append('categoryid',getCategoryid)
    formData.append('brandname',getBrandname)
    formData.append('description',getDescription)
    formData.append('picture',getPicture.picture)
    formData.append('ad',getAd.ad)
    formData.append('adstatus',getAdstatus)
    formData.append('topbrands',getTopbrands)
    formData.append('newbrands',getNewbrands)
  
    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('brand/editData',formData,config)
    console.log(result)
     if(result)
     {setMsg("Record Submitted...")}
     else
     {
       setMsg("Fail to Submit Record..")
     }
  
  }
  const handleCategoryChange = (event) => {
    setCategoryid(event.target.value)
  };

  const editDailog=()=>{
    return(
      <Dialog
        open={getOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Brand edit Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#dfe6e9', height: '102vh',padding:'20px' }} >
   
    <Grid container spacing={3}>
          
      
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCategoryid}
          onChange={handleCategoryChange}
          
        >
         {fillcategory()}
        </Select>
      </FormControl>
          <Grid item xs={6}>
          {/* <img src={geterrorBrand} width='10' height='10' /> */}

        <TextField id="standard-basic" value={getBrandname} label="Brandname" onChange={(event)=>{setBrandname(event.target.value)}}/>
          </Grid>
          <Grid item xs={12}>
          {/* <img src={geterrorDe} width='10' height='10' /> */}
        <TextField id="standard-basic" value={getDescription} label="Description" onChange={(event)=>{setDescription(event.target.value)}}/>
          </Grid>
        <Grid item xs={6}>

    <div className={classes.root}>
    {/* <img src={geterrorPic} width='10' height='10' /> */}

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filepicture"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
          </div>

      <label htmlFor="contained-button-filepicture">
        <Button variant="contained" color="primary" component="span"fullWidth>
          Picture
        </Button>
      </label>
      </Grid>
      <Grid item xs={6}>

      <Avatar alt="Remy Sharp" variant='rounded' src={getPicture.filepicture}className={classes.large} />
      </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
    <div className={classes.root}>
    {/* <img src={geterrorAd} width='10' height='10' /> */}

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filead"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}

      />
          </div>

      <label htmlFor="contained-button-filead">
        <Button variant="contained" color="primary" component="span" fullWidth>
          Ad
        </Button>
      </label>
      </Grid>
      <Grid item xs={6}>

      <Avatar alt="Remy Sharp"  variant='rounded'src={getAd.filead} className={classes.large} />
      </Grid>
      </Grid>
      <label>Ad Status</label>
      <Grid item xs={12}>
      {/* <img src={geterrorStatus} width='10' height='10' /> */}

      <Radio
       checked={getAdstatus === 'Yes'}
        onChange={(event)=>{handleChangeAdStatus(event)}}
        value="Yes"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getAdstatus === 'No'}
        onChange={(event)=>{handleChangeAdStatus(event)}}
        value="No"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'B' }}
      />No
</Grid>
<label>Top Brand</label>

<Grid item xs={12}>
      {/* <img src={geterrorTop} width='10' height='10' /> */}

      <Radio
       checked={getTopbrands === 'Yes'}
        onChange={(event)=>{handleChangeTopbrands(event)}}
        value="Yes"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getTopbrands === 'No'}
        onChange={(event)=>{handleChangeTopbrands(event)}}
        value="No"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'B' }}
      />No
</Grid>
<label>New Brand</label>

<Grid item xs={12}>
      {/* <img src={geterrorNew} width='10' height='10' /> */}

      <Radio
       checked={getNewbrands === 'Yes'}
        onChange={(event)=>{handleChangeNewbrands(event)}}
        value="Yes"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getNewbrands === 'No'}
        onChange={(event)=>{handleChangeNewbrands(event)}}
        value="No"
        name="radio-button-demo"
        // inputProps={{ 'aria-label': 'B' }}
      />No
</Grid>


        <Grid item xs={6}>
        <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
      </Grid>

      

        <Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>



        </Typography>

        </Container>

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
      title="Brand Table"
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
  )
}


