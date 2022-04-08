var express = require('express')
const Donneurs = require('./db.json')

var logger = require("morgan");
const bodyParser = require('body-parser');

var app = express()
app.use(logger('dev'));

app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { body, validationResult } = require('express-validator');


app.post('/Donneurs', 

body('id').isInt(),
body('Nom').not().isEmpty().trim().escape(),
body('Prenom').isString(),
body('gendre').isIn(['male', 'female']),
body('age').isInt(),
body('poid').isString(),
body('Telephone').isString(),
body('groupe_sanguin').isLength({ max: 3}),

(req, res, next)=>  {
    let content = req.body;
    const errors = validationResult(req);
    if (!content.id && !content.Nom && !content.Nom && !content.Prenom && !content.gendre && !content.age && !content.poid && !content.Telephone && !content.groupe_sanguin ) { 
        return res.status(400).json("Donneurs_non_cree");

    }
   
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    } 
  

    res.status(200).json({
        success: true,
        message: 'ajouter avec succès',
        
    })
    
});
/// GET 
app.get('/Donneurs', (req,res,next) => {
    res.status(200).json(Donneurs)
})

/// GET  BY ID
app.get('/Donneurs/:id', (req,res,next) => {


  
        const id = parseInt(req.params.id)

        const Donneur = Donneurs.find(Donneur => Donneur.id === id)
        if(Donneur){

        res.status(200).json(Donneur)
    }
    else {
        return res.status(400).end();

    }
  
})

///delete
app.delete('/Donneurs/:id', (req,res,next) => {
    const id = parseInt(req.params.id)
    let Donneur = Donneurs.find(Donneur => Donneur.id === id)
    Donneurs.splice(Donneurs.indexOf(Donneur),1)
    res.status(200).json(Donneurs)
})

// catch 404 and forward to error handler

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// error handler

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

module.exports = app;
