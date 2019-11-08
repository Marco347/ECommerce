const express = require ('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
//app.use(require("cors")); // méthode alternative

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";

app.listen(8888);

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("ESTELLE");

    /* Liste des produits */
    app.get("/produits", (req, res) => {
        console.log("/produits");
        try{
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });

    app.get("/produits/:categorie", (req, res) => {
        let categorie = req.params.categorie;
        console.log("/produits/"+categorie);
        try{
            db.collection("produits").find({categorie:categorie}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits/"+categorie+" : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des catégories de produits */
    app.get("/categories", (req, res) => {
        console.log("/categories");
        categories = [];
        try{
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents) {
                    if (!categories.includes(doc.categorie)) 
                        categories.push(doc.categorie);
                }
                console.log("Renvoi de "+JSON.stringify(categories));
                res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });


        /* Liste des materiaux de produits */
        app.get("/materiaux", (req, res) => {
            console.log("/materiaux");
            materiaux = [];
            try{
                db.collection("materiaux").find().toArray((err, documents) => {
                    for (let doc of documents) {
                        if (!materiaux.includes(doc.materiaux)) 
                        materiaux.push(doc.materiaux);
                    }
                    console.log("Renvoi de "+JSON.stringify(materiaux));
                    res.end(JSON.stringify(materiaux));
                });
            } catch(e) {
                console.log("Erreur sur /materiaux : " + e);
                res.end(JSON.stringify([]));
            }
        });


        /* Liste des materiauxPrincipaux de produits */
        app.get("/materiauxPrincipaux", (req, res) => {
            console.log("/materiauxPrincipaux");
            materiaux = [];
            try{
                db.collection("produits").find().toArray((err, documents) => {
                    for (let doc of documents) {
                        if (!materiaux.includes(doc.materiaux.materiau1)) 
                        materiaux.push(doc.materiaux.materiau1);
                    }
                    console.log("Renvoi de "+JSON.stringify(materiaux));
                    res.end(JSON.stringify(materiaux));
                });
            } catch(e) {
                console.log("Erreur sur /materiauxPrincipaux : " + e);
                res.end(JSON.stringify([]));
            }
        });

        /* Liste des materiauxSecondaires de produits */
        app.get("/materiauxSecondaires", (req, res) => {
            console.log("/materiauxSecondaires");
            materiaux = [];
            try{
                db.collection("produits").find().toArray((err, documents) => {
                    for (let doc of documents) {
                        if (!materiaux.includes(doc.materiaux.materiau2)) 
                        materiaux.push(doc.materiaux.materiau2);
                    }
                    console.log("Renvoi de "+JSON.stringify(materiaux));
                    res.end(JSON.stringify(materiaux));
                });
            } catch(e) {
                console.log("Erreur sur /materiauxSecondaires : " + e);
                res.end(JSON.stringify([]));
            }
        });

        /* Filtre par catégorie et par matériau */
        app.get("/produits/:categorie/:materiau", (req, res) => {
            let categorie = req.params.categorie;
            let materiau = req.params.materiau;
            retour = [];
            console.log("/produits/"+categorie+"/"+materiau);
            try{
                db.collection("produits").find({categorie:categorie}).toArray((err, documents) => {
                    for (let doc of documents) {
                        for (var i = 0; i < doc.materiaux.length; i++) { 
                            for (var key in doc.materiaux[i]){
                                var attrName = key;
                                var attrValue = obj[key];
                                if(attrValue.equals(materiau))
                                    retour.push(doc);
                            }
                        }
                           
                    }

                    console.log("Renvoi de "+JSON.stringify(retour));
                    res.end(JSON.stringify(retour));
                });
            } catch(e) {
                console.log("Erreur sur /produits/"+categorie+"/"+materiau+" : " + e);
                res.end(JSON.stringify([]));
            }
        });

    /* Connexion */
    app.post("/membre/connexion", (req, res) => {
        console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
        try{
            db.collection("membres")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch(e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });


});