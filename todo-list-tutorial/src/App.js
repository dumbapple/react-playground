import React, {Component} from 'react'
import Table from './Table';
import Form from './Form';

// Splitting components up is unnecessary, but encouraged
class App extends Component {

    // State is an object
    state = {
        characters: []
    };

    // Method that alters the state by adding a character
    // Pass this function down as props to the Form component
    // This is the spread operator; it copies the old array and adds a new element at the end
    handleSubmit = (character) => {
        this.setState(
            {
                characters: [...this.state.characters, character]
            }
        );
    }

    // Method that alters the state by removing a character
    // Will have to pass this function down as props, so other components can call it
    // In our case, we want our TableBody component to call this when the Delete button is clicked
    removeCharacter = (index) => {
        const {characters} = this.state; // AKA const characters = this.state.characters

        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index;
            })
        });
    }

    render() {

        const { characters } = this.state;
        
        return (
            <div className="container">
                <Table characterData={characters} removeCharacter={this.removeCharacter} />
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App; // Lets index.js import the component
