const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Geolocalização Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

//PI Schema
const PISchema = new Schema({
    name: {
        type: String,
        required: [true, '*Campo obrigatório!']
    },
    details: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    geometry: GeoSchema
});

//Criar Modelo_PI baseado em PISchema: 'PontosInteresse'->nome da // coleção
const PI = mongoose.model('PontosInteresse', PISchema);

//Exportar Modelo_PI
module.exports = PI;