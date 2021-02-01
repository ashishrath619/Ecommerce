import React,{useState, useEffect} from 'react';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';




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

  const [state, setState] = useState({
    
    columns: [
      { title: 'ID', field: 'categoryid' },
      { title: 'Name', field: 'categoryname' },
      { title: 'Description ', field: 'description'},
      { title: 'Icon',field: 'icon',
      render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.icon}`}/>
      </div>
    
    },
      { title: 'Ad',field: 'ad',
      render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.ad}`}/>
     </div>
    },
      { title: 'Status',field: 'adstatus'},

    ],
    
  });
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)

  const [getAdStatus,setAdStatus]=useState('')
  const [getCategoryId,setCategoryId]=useState('')
  const [getCategoryName,setCategoryName]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getIcon,setIcon]=useState({icon:'',fileicon:''})
  const [getAd,setAd]=useState({ad:'',filead:''})
  const [getMsg,setMsg]=useState('')
  // const [geterrorCn,seterrorCn]=useState('')
  // const [geterrorde,seterrorde]=useState('')
  // const [geterrorIcon,seterrorIcon]=useState('')
  // const [geterrorAd,seterrorAd]=useState('')
  // const [geterrorAdstatus,seterrorAdstatus]=useState('')

  const fetchData=async()=>{
    let list=await getData('category/displayall')
        setList(list)
    
  }
  const handleIcon=(event)=>{
    setIcon({icon:event.target.files[0],fileicon:URL.createObjectURL(event.target.files[0])})

   }
   const handleAd=(event)=>{
    setAd({ad:event.target.files[0],filead:URL.createObjectURL(event.target.files[0])})

   }

    const handleChangeAdStatus=(event)=>{
     setAdStatus(event.target.value)

    }

   
  
  useEffect(function(){
 fetchData()
  },[])
  const handleDelete=async(oldData)=>{
    let body={categoryid:oldData.categoryid}
    await postData('category/deleteData',body)
  }

  const handleClickOpen = (rowData) => {
    setOpen(true);
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setDescription(rowData.description)
    setIcon({icon:'',fileicon:`${ServerURL}/images/${rowData.icon}`})
    setAd({ad:'',filead:`${ServerURL}/images/${rowData.ad}`})
    setAdStatus(rowData.adstatus)
  
  };
  

  const handleClose = () => {
    setOpen(false);
    fetchData()
  };

  const handleSubmit=async()=>{
  
    
    const formData=new FormData()
    formData.append('categoryid',getCategoryId)
   formData.append('categoryname',getCategoryName)
   formData.append('description',getDescription)
   formData.append('icon',getIcon.icon)
   formData.append('ad',getAd.ad)
   formData.append('adstatus',getAdStatus)
   const config={headers:{'content-type':'multipart/form-data'}}
   let result=await postDataAndImage('category/editData',formData,config)
   console.log(result)
   if(result)
   {setMsg("Record Updated...")}
   else
   {
     setMsg("Fail to Update Record..")
   }
  }
  
  
  const editDailog=()=>{
    return( <div>
      <Dialog
        open={getOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Category[edit Record]</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          </DialogContentText>
          <div className={classes.root}>
    <Paper className={classes.paperstyle}>
       
    <Grid container spacing={1}>
    {/* <Grid item xs={12}>

        <TextField label="Category Id" value={getrowData.categoryid} fullWidth  />
        </Grid> */}
        <Grid item xs={12}>
        {/* <img src={geterrorCn} width='10' height='10' /> */}

        <TextField label="Category Name" value={getCategoryName} fullWidth onChange={(event)=>{setCategoryName(event.target.value)}} />
        </Grid>
        <Grid item xs={12}>
        {/* <img src={geterrorde} width='10' height='10' /> */}

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
      {/* <img src={geterrorIcon} width='10' height='10' /> */}

        <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
          Upload Icon
        </Button>
      </label>
 </Grid>
        <Grid item xs={6} className={classes.container}>
        <Avatar alt="Remy Sharp" variant='rounded'  style={{width:90,height:60}} src={getIcon.fileicon} />
        </Grid>


        <Grid item xs={6}>
                  {/* <img src={geterrorAd} width='10' height='10' /> */}

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
        {/* <img src={geterrorAdstatus} width='10' height='10' /> */}
 
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

       <Button variant="contained" className={classes.button} color="primary" onClick={()=>handleSubmit()}>Save Record</Button>
       </Grid>

       

<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>

        </Grid> 
    </Paper>

</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancle
          </Button>
         
        </DialogActions>
      </Dialog>
      </div>
    )
  }
 
  return (
    <div>
    <MaterialTable
      title="Category Table"
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
