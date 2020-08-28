import React from 'react';
import Card from './Card';
 
const CardList = ({ robots }) => {



    return (
        <div> 
            {robots.map((user, i) => {
                // Remember to include return statement is needed in map
                // Need to have this key prop when manipulating iterables
                return <Card key={robots[i].id} id={robots[i].id} name={robots[i].name} email={robots[i].email} />
            })}
        </div>
    );
}

export default CardList;