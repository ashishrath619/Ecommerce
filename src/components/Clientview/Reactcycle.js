import React from 'react';
export default class Reactcycle extends React.Component{

    constructor(){
       super();
        console.warn("constractor...")
    }

   componentDidUpdate(){
       console.warn("componentDidUpdate...")
   }
   render(){
       console.warn("render")
       return(
           <div>this is rending</div>
       )
   }
}