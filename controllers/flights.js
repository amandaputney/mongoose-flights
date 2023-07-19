const Flight = require('../models/flights')
const express = require('express')
const router = express.Router()

module.exports = {
    new: newFlight, create, index, show
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
}

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