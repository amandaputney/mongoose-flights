const Flight = require('../models/flight')
const express = require('express');
const ticket = require('../models/ticket');
const router = express.Router()

module.exports = {
    new: newFlight, create, index, show
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
}


//NEED TO UPDATE show function to retreive ticket
// async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
//   const flight = await Flight.findById(req.params.id).populate('seat');
//   // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
//   const tickets = await Ticket.find({ _id: { $nin: ticket.seat } });
//   res.render('flights/show', { title: 'Flight Detail', flight, tickets });
// }

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: 'Flight Detail', flight });
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: '' });
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}

// async function create(req, res) {
//     try {
//         await Flight.create(req.body);
//         // Always redirect after CUDing data
//         // We'll refactor to redirect to the movies index after we implement it
//         res.redirect('/flights/new');
//     } catch (err) {
//         // Typically some sort of validation error
//         console.log(err);
//         res.render('flights/new', { errorMsg: err.message });
//     }
// }

async function create(req, res) {
    try {
        await Flight.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the movies index after we implement it
        res.redirect('/flights');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}

// function index(req, res) {
//     res.render('flights/index', {
//         flights: Flight.getAll()
//     })
// }