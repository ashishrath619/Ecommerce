import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {postDataAndImage,getData,postData} from '../FetchNodeService';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    },
    
    subclass:{
      marginTop:3,
      marginBottom:4,
      display:'flex',
      flexDirection:'row'

    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },

   

}));


export default function ModelInterface(props){
  const classes = useStyles();
  // const [getCategory,setCategory]=useState('')
  const [getCategoryid,setCategoryid]=useState('')
  const [getBrandid,setBrandid]=useState('')
  // const [getBrand,setBrand]=useState('')
  const [getModel,setModel]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getList,setList]=useState([])
  const [getBrandlist,setBrandlist]=useState([])



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
      setCategoryid(event.target.value)
      fetchBrand(event.target.value)
    };
    

    const fetchBrand=async(categoryid)=>{
      var body = {'categoryid':categoryid}
      let list=await postData('brand/displayallbrands',body)
          setBrandlist(list)
    }
    // useEffect(function(){
    
    
    //   fetchBrand()
      
    //    },[])
        const fillBrand=()=>{
        return(
        
         getBrandlist.map((item,key)=>{
           return(
           <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
           )})
        )
      }


       const handleBrandChange = (event) => {
        setBrandid(event.target.value)
      };

  const handleSubmit=async()=>{

    const formData=new FormData()
    formData.append('category',getCategoryid)
    formData.append('brand',getBrandid)
    formData.append('model',getModel)

    formData.append('description',getDescription)

    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('model/addnewrecord',formData,config)
    console.log(result)
    if(result)
    {setMsg("Record Submitted...")}
    else
    {
      setMsg("Fail to Submit Record..")
    }
 
   }
   return (
    <div className={classes.root}>
    <Paper className={classes.paperstyle}>
        <Paper elevation={0} className={classes.headstyle}>
            <Typography  gutterBottom>
        <b>Add New Category</b>
      </Typography>
      </Paper>
    <Grid container spacing={3}>
    <Grid item xs={12}>

    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCategoryid}
          onChange={(event)=>handleCategoryChange(event)}
          
        >
         {fillcategory()}
        </Select>
      </FormControl>
      </Grid> 

        {/* <Grid item xs={6}>
        <TextField label="Categoryname"  value={getCategory} fullWidth  onChange={(event)=>{setCategory(event.target.value)}} />
        </Grid> */}
         <Grid item xs={12}>

<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getBrandid}
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
</Paper>
   </div> 
   )
}