import React,{createRef,useRef,useCallback,useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DropzoneComponent from 'react-dropzone-component'
import TextField from '@material-ui/core/TextField';
import {postDataAndImage,ServerURL} from '../FetchNodeService'
import Grid from '@material-ui/core/Grid';
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
      gridStyle:{display:'flex',flexDirection:'row'},
     

  }));

export default function CategoryInterface(props){
 // var dropzone = null;
  var dref=createRef()

    const classes = useStyles();
    const [getProductId,setProductId]=useState('')
    var djsConfig = {
      addRemoveLinks:true,
   
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false,
      uploadMultiple:true,
     
  };
  
 
    var componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: `${ServerURL}/productpic/addpic`,
      
  };
  const sending=async(file,x,formData) =>{
 
}
const success=(file) =>{}

const removedfile = file => console.log('removing...', file);
const callback = () => console.log('Hello!');

var callbackArray = [
  function () {
      console.log('Look Ma, I\'m a callback in an array!');
  },
  function () {
      console.log('Wooooow!');
  }
];


async function handlePost() {
 // alert(dref.current.files)
  console.log(dref)
  console.log(dref.current.files)
  const formData=new FormData()
  formData.append('productid',getProductId)
  dref.current.state.files.map((file,index)=>{//alert(file+","+index)
  formData.append('pictures'+index,file)
  
})
   
   
  const config={headers:{'content-type':'multipart/form-data'}}
  let result=await postDataAndImage('productpic/addpicinfo',formData,config)
  console.log(result)
 //dref.current.t.processQueue()
 //dropzone.processQueue();
  
}

const eventHandlers = {
 // init:dz =>dropzone = dz,
  drop: callbackArray,
  addedfile:callback,
  success:success,
  removedfile:removedfile,
  sending:sending,
   
  }
        return (
          <div>
             
            <Grid container spacing={1}>
        <Grid item xs={12} className={classes.gridStyle}>
        
        <TextField label="Product Id:" value={getProductId} fullWidth onChange={(event)=>{setProductId(event.target.value)}} />
        </Grid>
         
        </Grid>
            <DropzoneComponent config={componentConfig}
                       ref={dref}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig}
                       />
            <div>
            <button onClick={()=>handlePost()}>Upload</button>
              </div>           
          </div>
        )
      }
    

    
 