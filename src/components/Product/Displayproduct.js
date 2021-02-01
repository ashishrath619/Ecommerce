import React,{useState, useEffect} from 'react';
import {getData,postData,ServerURL,postDataAndImage}  from '../FetchNodeService';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';

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
        { title: 'Productreid', field: 'productreid' },

        { title: 'venderid', field: 'venderid' },
        { title: 'category', field: 'categoryname' },
        { title: 'brand ', field: 'brandname'},
        { title: 'Model ', field: 'modelnam'},
        { title: 'productname', field: 'productname' },
        { title: 'Brand', field: 'price' },
        { title: 'Description ', field: 'description'},
      //   { title: 'picture ', field: 'picture',
       
      // render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.picture}`}/>
      // </div>},

         { title: 'offerprice', field: 'offerprice' },
        { title: 'devilrycharge', field: 'devilrycharge' },
        { title: 'ratings ', field: 'ratings'},
        { title: 'color ', field: 'color'}, 
        { title: 'status', field: 'status' },
        { title: 'ad ', field: 'ad',
        render:rowData=><div> <Avatar variant='rounded' src={`${ServerURL}/images/${rowData.ad}`}/>
        </div>},
        { title: 'adstatus ', field: 'adstatus'},

    ],
});
const [getList,setList]=useState([])
const [getOpen,setOpen]=useState(false)


   const fetchData=async()=>{
        let list=await getData('productregister/displayall')
            setList(list)
        
      }
      useEffect(function(){
        fetchData()
         },[])

         const handleClickOpen =async (rowData) => {
            setOpen(true);
            

        };
  

        const handleClose = () => {
          setOpen(false);
          fetchData()
        };
        const handleDelete=async(oldData)=>{
          var body={productreid:oldData.productreid}
          var result=await postData('productregister/deleterecord',body)
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
                    }, 300);
                  }),
              }}
            />
             {/* {editDailog()}  */}
        </div>
          );
        }
        