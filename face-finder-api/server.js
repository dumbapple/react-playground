const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Need this to parse req.body into JSON!!!
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Andrew',
            email: 'andrew@gmail.com',
            password: 'chocobo',
            entries: 0,
            dateJoined: new Date()
        },
        {
            id: '12',
            name: 'Kimmy',
            email: 'Kimmy@gmail.com',
            password: 'moogle',
            entries: 0,
            dateJoined: new Date()
        }
    ]
}

// Basic route to check server is up
app.get('/', (req, res) => {
    res.send(database.users);
});

// Get the id from req.params
app.get('/profile/:id', (req, res) => {

    const { id } = req.params
    let isUserFound = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            isUserFound = true;
            return res.json(user);
        } 
    });

    if (!isUserFound) {
        res.status(400).json("User not found :(");
    }

});

app.put('/image', (req, res) => {
    const { id } = req.body
    let isUserFound = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            isUserFound = true;
            user.entries++;
            return res.json(user.entries);
        } 
    });

    if (!isUserFound) {
        res.status(400).json("User not found :(");
    }
});

// Check the user's input with current list of users for matching passwords
// Remember to use middleware to access request body!
// TODO: make database (hard-code something for now)
app.post('/signin', (req, res) => {
    
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json("Success");
    } else {
        res.status(400).json("Login failed");
    }

    
});

// Grab the req.body and enter the info into database
app.post('/register', (req, res) => {

    const { email, name, password } = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });

    database.users.push({
        id: '137',
        name: name,
        email: email,
        password: password,
        entries: 0,
        dateJoined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    // Function that runs right after listen happens
    console.log("Listening on port 3000...");
});

// Plan out the API endpoints before just coding
/*

/       --> res = This is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user


*/

