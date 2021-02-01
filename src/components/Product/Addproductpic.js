import React,{useState, useEffect, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {postDataAndImage,getData,postData,ServerURL} from '../FetchNodeService';
import Select from '@material-ui/core/Select';
import DropzoneComponent from 'react-dropzone-component'
import Grid from '@material-ui/core/Grid';
import { InputLabel,Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles=makeStyles((theme)=>({

    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    paperstyle:{
        width:650,
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
        backgroundColor:'#f1f2f6',

    },
    button:{
        margin:theme.spacing(2),
        width:150,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
      },
      dropbox:{
          margin:5,
          padding:3,
      },
      button: {
        margin: theme.spacing(1),
        width:160,
      },

}))

export default function Addproduct(props){
    const classes = useStyles();
    const[getProduct,setProduct]=useState('')
    const[getProductid,setProductid]=useState('')

    const[getList,setList]=useState([])
    const [getMsg,setMsg]=useState('')



//    const fetchProduct=async()=>{
//         let list=await getData('productregister/displayproduct')
//         setList(list)
//     }
//     useEffect(function(){
//         fetchProduct()
//     },[])

//     const fillProduct=()=>{
//         return(
//             getList.map((item,key)=>{
//                 return(
//                     <MenuItem value={item.productreid}>{item.productname}</MenuItem>
//                 ) 
//             })
//         )
//     }
    const handleProductChange=(event)=>{
        setProduct(event.target.value)
    }
    const handleProductidChange=(event)=>{
        setProductid(event.target.value)
    }
    const fetchProduct=async()=>{
        let list=await getData('productregister/displayallproduct')
            setList(list)
      }
      useEffect(function(){
      
      
        fetchProduct()
        
         },[])
         const fillproduct=()=>{
          return(
          
           getList.map((item,key)=>{
             return(
             <MenuItem value={item.productreid}>{item.productname}</MenuItem>
             )})
          )
        }
        const fillproductid=()=>{
            return(
            
             getList.map((item,key)=>{
               return(
               <MenuItem value={item.productreid}>{item.productreid}</MenuItem>
               )})
            )
          }
    /* -----------dropzone-------- */
    // var dropzone=null
    var dref=createRef()
    var djsConfing={
        addRemoveLinks:true,
        acceptedFiles:'image/jpeg,image/png,image/gif',
        autoProcessQueue:false,
        uploadMultiple:true,
    }
    var componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: `${ServerURL}/productpic/addpic`,
        
    };
    const sending=async(file,x,formData)=>{

    }
    const success=(file)=>{}
    const removedfile=file=>console.log('removing....',file)
    const callback=()=>console.log('hello')

    var callbackArray = [
        function () {
            console.log('Look Ma, I\'m a callback in an array!');
        },
        function () {
            console.log('Wooooow!');
        }
      ];
     async function handlepost(){
        console.log(dref)
        console.log(dref.current.files)
        const formData=new FormData()
        formData.append('productname',getProduct)
        formData.append('productid',getProductid)

  dref.current.state.files.map((file,index)=>{//alert(file+","+index)
  formData.append('pictures'+index,file)

     })
     const config={headers:{'content-type':'multipart/form-data'}}
  let result=await postDataAndImage('productpic/addpicinfo',formData,config)
  console.log(result)
  if(result)
   {setMsg("Record Submitted...")}
   else
   {
     setMsg("Fail to Submit Record..")
   }

  
    }
    const eventHandlers = {
        // init:dz =>dropzone = dz,
         drop: callbackArray,
         addedfile:callback,
         success:success,
         removedfile:removedfile,
         sending:sending,
          
         }

    return(
        <div className={classes.root}>
            <Paper className={classes.paperstyle}>
                <Paper elevation={0} className={classes.headstyle}>
                    <Typography gutterBottom>
                        <b>Add Product Pic</b>
                    </Typography>
                </Paper>
            
            <Grid container spacing={3}>
            <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" fullwidth>
                            Product id
                        </InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getProductid}
                    onChange={(event)=>handleProductidChange(event)}>
                    {fillproductid()}
                    </Select>

                </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" fullwidth>
                            Product Name
                        </InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getProduct}
                    onChange={(event)=>handleProductChange(event)}>
                    {fillproduct()}
                    </Select>

                </FormControl>
                </Grid>

            </Grid>
            <div className={classes.dropbox}>
            <label>Picture</label>
            <DropzoneComponent config={componentConfig}
                       ref={dref}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfing}
                       />
                                   </div>

            <div>
            <button onClick={()=>handlepost()}>Upload</button>
              </div> 
              <Grid item xs={12}>
  
  <b>Message:&nbsp;&nbsp;{getMsg}
  </b>
  </Grid>
            </Paper>

        </div>
    )
}