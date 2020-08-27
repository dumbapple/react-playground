import React, { Component } from 'react';

class Form extends Component {

    // Don't need a constructor for class components, unlike Java

    initialState = {
        name: '',
        job: ''
    }

    state = this.initialState;

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            {
                [name]: value
            }
        );
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        
        const { name, job } = this.state;
        return (
            <div>
            <form>
                <label htmlFor="name">Name</label>
                <input
                 type="text"
                 name="name"
                 id="name" 
                 value={name}
                 onChange={this.handleChange} />
                <label htmlFor="job">Job</label>
                <input
                 type="text"
                 name="job"
                 id="job" 
                 value={job}
                 onChange={this.handleChange} />
            </form>
            <input type="button" value="Submit" onClick={this.submitForm} />
        </div>
        );
    }

}

export default Form;