let express = require('express');
let logger = require('morgan');
let routes = require('./routes');

let app = express();

app.use(logger('dev'));

app.set('view engine', 'hbs');

app.get('/', routes.index);

app.get('/api', routes.apiIndex);

// These are also an option
// app.get('/api/users/:id([0-9{1,9}])?', routes.usersById);
// app.get('/api/users/:username?', routes.usersByUsername);

app.get('/api/users/:id?', routes.users);

app.get('/api/frontpage', routes.frontPage);
app.get('/api/profile/:id', routes.profilePage)
app.get('/api/posts/:id', routes.postDetails);
app.get('/api/stats', routes.statistics);
app.get('/api/stats/top10/followedusers', routes.top10FollowedUsers)
app.get('/api/stats/registrations', routes.userRegistrations)
app.get('/api/stats/genderdivision', routes.genderDivision)

app.get('*', routes.default);








let server = app.listen(3000, function() {
    console.log('Listening on port 3000')
});

