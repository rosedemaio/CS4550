var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// initial courses, same as last assignment
var courses = [
    { name: "Java 101", category: "PROG", dateCreated: "Thu Jan 01 2015", description: "Wow" },
    { name: "MongoDB 101", category: "DB", dateCreated: "Mon Feb 02 2015", description: "Good" },
    { name: "Express 101", category: "PROG", dateCreated: "Tue Mar 03 2015", description: "Better" },
    { name: "AngularJS 101", category: "WEB", dateCreated: "Sun Jan 04 2015", description: "Best" },
    { name: "NodeJS 101", category: "PROG", dateCreated: "Mon Jan 05 2015", description: "Awesome" }
];

// GET : return all courses
// /api/course
app.get('/api/course', function(req, res){
  res.json(courses);
});

// GET : return course at index
// /api/course/:index
app.get('/api/course/:index', function(req, res){
    var index = req.params.index;
    res.json(courses[index]);
});

// POST : accept JSON course object, add it to array, return all courses
// /api/course
app.post('/api/course', function(req, res){
    var courseToAdd = req.body;
    courses.push(courseToAdd);
    res.json(courses);
})

// DELETE : remove course at index, return remaining course
// /api/course/:index
app.delete('/api/course/:index', function(req, res){
    var index = req.params.index;
    courses.splice(index, 1);
    res.json(courses);
})

// PUT : accept JSON course object, update object at index, return all courses
// /api/course/:index
app.put('/api/course/:index', function(req, res){
    var index = req.params.index;
    var courseToUpdate = req.body;
    courses[index] = courseToUpdate;
    res.json(courses);
})

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);