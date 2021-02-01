import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';







// const handleSubmit = () => {
//     // your submit logic
// }




export default function DisplaydisAll(props){
  const [email,setemail]=useState('')
  
  const handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
}
  return( 
    <ValidatorForm
    ref="form"
    // onSubmit={this.handleSubmit}
    onError={errors => console.log(errors)}
>
    <TextValidator
        label="Email"
        // onChange={this.handleChange}
        onChange={(event)=>handleChange(event)}
        name="email"
        value={email}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
    />
    <Button type="submit">Submit</Button>
</ValidatorForm>

  )
}