import React,{useState, useEffect} from 'react';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';



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
        { title: 'Id', field: 'modelid' },
        { title: 'Category', field: 'categoryname' },
        { title: 'Brand', field: 'brandname' },
        { title: 'Description ', field: 'description'},
        { title: 'Model ', field: 'model'},

    ],
});
const [getList,setList]=useState([])
const [getOpen,setOpen]=useState(false)
const [getModelid,setModelid]=useState('')
const [getMsg,setMsg]=useState('')

const [getModel,setModel]=useState('')
const [getCategory,setCategory]=useState('')
const [getBrand,setBrand]=useState('')
const [getDescription,setDescription]=useState('')
const [getBrandlist,setBrandlist]=useState([])

    const fetchData=async()=>{
        let list=await getData('model/displayall')
            setList(list)
        
      }
      useEffect(function(){
        fetchData()
         },[])

         const handleDelete=async(oldData)=>{
          let body={modelid:oldData.modelid}
          await postData('model/deleteData',body)
         }
         
         const handleClickOpen = (rowData) => {
            setOpen(true);
            setModelid(rowData.modelid)
            setCategory(rowData.category)
            setBrand(rowData.brand)
            setDescription(rowData.description)
            setModel(rowData.model)

        };
        const fetchCategory=async()=>{
          let list=await getData('category/displayall')
              setList(list)
        }
        useEffect(function(){
        
        
          fetchCategory()
          
           },[])
           const fillcategory=()=>{
             return(
             
              getList.map((item,key)=>{
                return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                )})
             )
           }
      
           const handleCategoryChange = (event) => {
            setCategory(event.target.value)
            fetchBrand(event.target.value)
          };
          
      
          const fetchBrand=async(categoryid)=>{
            var body = {'categoryid':categoryid}
            let list=await postData('brand/displayallbrands',body)
                setBrandlist(list)
          }
          
              const fillBrand=()=>{
              return(
              
               getBrandlist.map((item,key)=>{
                 return(
                 <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
                 )})
              )
            }
      
      
             const handleBrandChange = (event) => {
              setBrand(event.target.value)
            };
      
        const handleSubmit=async()=>{
      
          const formData=new FormData()
          formData.append('modelid',getModelid)

          formData.append('category',getCategory)
          formData.append('brand',getBrand)
          formData.append('model',getModel)
      
          formData.append('description',getDescription)
      
          const config={headers:{'content-type':'multipart/form-data'}}
          var result=await postDataAndImage('model/editData',formData,config)
          console.log(result)
          if(result)
          {setMsg("Record Submitted...")}
          else
          {
            setMsg("Fail to Submit Record..")
          }
       
         }

        const handleClose = () => {
          setOpen(false);
          fetchData()
        };
        const editDailog=()=>{
          return(
            <Dialog
              open={getOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Model edit Record</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <Container maxWidth="sm">
              <Typography component="div" style={{ backgroundColor: '#dfe6e9', height: '102vh',padding:'20px' }} >
         
          <Grid container spacing={3}>
                
            
          
            
    <Grid item xs={12}>

    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCategory}
          onChange={handleCategoryChange}
          
        >
         {fillcategory()}
        </Select>
      </FormControl>
      </Grid> 

       
         <Grid item xs={12}>

<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getBrand}
          onChange={handleBrandChange}
          
        >
         {fillBrand()}
        </Select>
      </FormControl>
      </Grid> 

         {/* <Grid item xs={6}>
        <TextField label="Brand"  value={getBrand} fullWidth  onChange={(event)=>{setBrand(event.target.value)}} />
        </Grid>  */}
        <Grid item xs={6}>
        <TextField label="Model"  value={getModel} fullWidth  onChange={(event)=>{setModel(event.target.value)}} />
        </Grid>
        <Grid item xs={6}>
        <TextField label="Description"  value={getDescription} fullWidth  onChange={(event)=>{setDescription(event.target.value)}} />
        </Grid>
        <Grid item xs={6}  className={classes.container}>

<Button variant="contained" className={classes.button} color="primary" onClick={()=>handleSubmit()}>Save</Button>
</Grid>
<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>


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
              title="Model Table"
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
        