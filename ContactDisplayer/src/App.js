import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots'; // Have to destructure this because it is not export default

// State: the variables that can change in our app
// Components that manage the state need to be a class so it can access the superclass variable _state
class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    // Occurs when text in the search box is changed
    onSearchBoxChange = (event) => {
        this.setState({
            searchfield: event.target.value
        });
        
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });
        return (
            <div className='tc'>
                <h1>Robot Friends</h1>
                <SearchBox searchChange={this.onSearchBoxChange} />
                <CardList robots={filteredRobots}/>
            </div>
        );
    }
}

export default App;