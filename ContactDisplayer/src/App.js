import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots'; // Have to destructure this because it is not export default

// State: the variables that can change in our app
// Components that manage the state need to be a class so it can access the superclass state variable
class App extends Component {
    constructor() {
        super(); // The constructor of Component
        
        // This is like the initial state of the app; all cards shown, with a blank search box
        // Will be altered by calls to this.setState()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users})); // Changed the state, so render() is called again 
    }

    // Occurs when text in the search box is changed
    // These methods that will alter state will be sent down the component tree as props
    // Use arrow functions for these methods that aren't part of React
    onSearchBoxChange = (event) => {
        this.setState({
            searchfield: event.target.value
        });
    }

    render() {

        // Create a new array with the filtered robots
        // Pass this filtered array as prop to the CardList component so it can display filtered results
        // This is how we can communicate state between different components in this one-way data flow
        //      - child component A notifies parent component to modify state
        //      - parent passes the modified state as props to child component B
        //      - these child components are just deterministic functions
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        if (this.state.robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>Robot Friends</h1>
    
                    {/* Passing method as a prop */}
                    <SearchBox searchChange={this.onSearchBoxChange} /> 
                    <CardList robots={filteredRobots}/>
                </div>
            );
        }
    }
}

export default App;