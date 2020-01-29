import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class CreateUserPage extends Component{
    render(){
        return(
            <form>
                <div>
                    <label>Nombre</label>
                    <Field name="name" type="" component="input"/>
                </div>
            </form>
        ); 
    }
}

export default reduxForm({ form: 'CreateUserForm' })(CreateUserPage);