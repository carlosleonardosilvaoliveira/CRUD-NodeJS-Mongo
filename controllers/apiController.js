//Importar modelo
const PI = require('../models/PImodel');

exports.test = function (req, res) {
    res.send(`Olá! Teste ao Controller`);
}

//TODO: listar pontos de interesse da BD
/* exports.details = function (req, res) {
    PI.find({}).then(function(pi){
        res.send(pi);
    });
}; */

//Listar PIs baseado na distancia relativa aos valores de longitude e latitude passados pelo cliente
module.exports.details = (req, res, next) => {
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    const maxDist = 100000;
    PI.aggregate([
        {
            '$geoNear': {
                "near": {
                    'type': 'Point', //Procuramos um ponto no mapa
                    'coordinates': [parseFloat(lng), parseFloat(lat)] //Array de coordenadas, esses valores são recebidos como strings mas queremos números por isso utilizamos parse destes valores 
                },
                "spherical": true, //Define que a distancia medida deverá ter em conta a curvatura da Terra
                "distanceField": 'dist', //Distancia calculada entre o PI no BD e o ponto passado pelo cliente (lng e lat)
                "maxDistance": maxDist //Define o raio de pontos a procurar(PIs na base de dados), relativamente ao ponto passado pelo cleinte(lng e lat). O valor de 'maxDist' é em metros   
            }
        },
        { '$limit': 3 } //Max nº de documentos a devolver será 3   
    ])
        .then(pi => res.send(pi))
        .catch(next);
};

//TODO: adicionar novo ponto de interesse
//Ocorrido um erro, 'next' chama o proximo middleware
exports.create = function (req, res, next) {
    //Cria novo 'pi' no BD a partir do request, depois devolve o 'pi' criado ao cliente
    PI.create(req.body).then(function (pi) {
        res.send(pi);
    }).catch(next);
};

//TODO: atualizar ponto de interesse
//Atualiza 'pi' do BD com as propriedades em 'req.body' depois procura de novo
// no BD o 'pi' atualizado (senão manda o pi não atualizado), depois devolve o 'pi' atualizado ao cliente
exports.update = function (req, res, next) {
    PI.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        PI.findOne({ _id: req.params.id }).then(function (pi) {
            res.send(pi);
        });
    }).catch(next);
};

//TODO: apagar ponto de interesse
//'_id:'->nome da propriedade no BD,
//'req.params.id'->devolve-me o parametro id na req
exports.delete = function (req, res, next) {
    //Apaga 'pi' do BD, depois devolve o 'pi' apagado ao cliente
    PI.findByIdAndRemove({ _id: req.params.id }).then(function (pi) {
        res.send(pi);
    }).catch(next);
};
