const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: { type: [String], enum: ['American', 'Southwest', 'United'] },
    airport: { type: [String], enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'LAX' },
    flightNo: { type: Number, required: true, min: 10, max: 9999 },
    departs: {
        type: Date, default: function getDateOneYearFromNow() {
            const currentDate = new Date();
            const oneYearFromNow = new Date(currentDate);
            oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
            return oneYearFromNow;
        }
    }
});

module.exports = mongoose.model('Flight', flightSchema);