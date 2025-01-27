var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('game','root', 'mhallacht', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});

var players = sequelize.import('../database/models/players');
var cardsInMiddle = sequelize.import('../database/models/cardsInMiddle');
var usedCards = sequelize.import('../database/models/usedCards');
var round = sequelize.import('../database/models/round');

sequelize.authenticate().then(function (err) {
    if (err) {
        console.error('SAVE SEQUELIZE: Connection Error' + err);
    } else {
        console.log('SAVE SEQUELIZE: Successfully connected');
    }
});


router.get('/save-games', function (req, res, next) {
    players.findAll({attributes: ['idPlayer', 'playerName', 'playerCardOne', 'playerCardTwo','playerCardThree', 'playerCardFour', 'playerCardFive', 'activePlayer', 'playerRole']}).then(function (players){
      cardsInMiddle.findAll({attributes: ['idCard', 'value']}).then(function (cardsInMiddle){
        usedCards.findAll({attributes: ['idCard', 'value']}).then(function (usedCards){
          round.findAll({attributes: ['idRound', 'value']}).then(function (round) {
              res.json({players: players, cardsInMiddle: cardsInMiddle, usedCards:usedCards, round: round});
          });
        });
      });
    });

});
router.post('/save-games', function (req, res, next) {
    // console.log(req.body);
    // req.body.players.forEach((item, i) => {
    //     var playerName = item.playerName || '';
    //     var playerCardOne = item.playerCardOne || '';
    //     var playerCardTwo = item.playerCardTwo || '';
    //     var playerCardThree  = item.playerCardThree || '';
    //     var playerCardFour  = item.playerCardFour || '';
    //     var playerCardFive  = item.playerCardFive || '';
    //     var activePlayer = item.activePlayer || 0;
    //     var playerRole = item.playerRole || 0;
    //
    //   var newPlayer = players.build({
    //       playerName: playerName,
    //       playerCardOne: playerCardOne,
    //       playerCardTwo: playerCardTwo,
    //       playerCardThree: playerCardThree,
    //       playerCardFour: playerCardFour,
    //       playerCardFive: playerCardFive,
    //       activePlayer:activePlayer,
    //       playerRole: playerRole,
    //   });
    //
    //   newPlayer.save().catch(function (error) {
    //       console.log('Error while inserting: ' + error.stack);
    //   });
    //   res.json({"info": "Player gespeichert"});
    // });
    console.log(req.body)
    var playerName = req.body.playerName || '';
    var playerCardOne = req.body.playerCardOne || '';
    var playerCardTwo = req.body.playerCardTwo || '';
    var playerCardThree  = req.body.playerCardThree || '';
    var playerCardFour  = req.body.playerCardFour || '';
    var playerCardFive  = req.body.playerCardFive || '';
    var activePlayer = req.body.activePlayer || 0;
    var playerRole = req.body.playerRole || 0;

    var newPlayer = players.build({
        playerName: playerName,
        playerCardOne: playerCardOne,
        playerCardTwo: playerCardTwo,
        playerCardThree: playerCardThree,
        playerCardFour: playerCardFour,
        playerCardFive: playerCardFive,
        activePlayer:activePlayer,
        playerRole: playerRole,
    });

    newPlayer.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Player gespeichert"});
});

router.get('/players', function (req, res, next) {
    players.findAll({attributes: ['idPlayer', 'playerName', 'playerCardOne', 'playerCardTwo','playerCardThree', 'playerCardFour', 'playerCardFive', 'activePlayer', 'playerRole']}).then(function (players) {
        res.json({players: players});
    })
});

router.get('/middleCards', function (req, res, next) {
    cardsInMiddle.findAll({attributes: ['idCard', 'value']}).then(function (cardsInMiddle) {
        res.json({cardsInMiddle: cardsInMiddle});
    })
});

router.get('/usedCards', function (req, res, next) {
    usedCards.findAll({attributes: ['idCard', 'value']}).then(function (usedCards) {
        res.json({usedCards: usedCards});
    })
});

router.get('/rounds', function (req, res, next) {
    round.findAll({attributes: ['idRound', 'value']}).then(function (round) {
        res.json({round: round});
    })
});

router.delete('/save-games', function (req, res, next) {
    players.destroy({truncate:true});
    cardsInMiddle.destroy({truncate:true});
    usedCards.destroy({truncate:true});
    round.destroy({truncate:true});
    res.json({info: ("everything deleted")});
});


router.post('/players', function (req, res, next) {
    console.log(req.body)
    var playerName = req.body.playerName || '';
    var playerCardOne = req.body.playerCardOne || '';
    var playerCardTwo = req.body.playerCardTwo || '';
    var playerCardThree  = req.body.playerCardThree || '';
    var playerCardFour  = req.body.playerCardFour || '';
    var playerCardFive  = req.body.playerCardFive || '';
    var activePlayer = req.body.activePlayer || 0;
    var playerRole = req.body.playerRole || 0;

    var newPlayer = players.build({
        playerName: playerName,
        playerCardOne: playerCardOne,
        playerCardTwo: playerCardTwo,
        playerCardThree: playerCardThree,
        playerCardFour: playerCardFour,
        playerCardFive: playerCardFive,
        activePlayer:activePlayer,
        playerRole: playerRole,
    });

    newPlayer.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Player gespeichert"});
});

router.post('/middle-cards', function (req, res, next) {
    console.log(req.body)
    var cardValue = req.body.value || '';

    var newMiddleCard = cardsInMiddle.build({
        value: cardValue,
    });

    newMiddleCard.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Middle Card gespeichert"});
});

router.post('/used-cards', function (req, res, next) {
    console.log(req.body)
    var cardValue = req.body.value || '';

    var newUsedCard = usedCards.build({
        value: cardValue,
    });

    newUsedCard.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Used Card gespeichert"});
});

router.post('/rounds', function (req, res, next) {
    console.log(req.body);
    var roundValue = req.body.value;

    var newRound = round.build({
        value: roundValue,
    });

    newRound.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Runde gespeichert"});
});
// router.put('/edit/:idCat', function (req, res, next) {
//     console.log(req.params);
//     var playerId = req.params.idPlayer || '';
//     var namePlayer = req.body.playerName || '';
//     var playerCardOne = req.body.playerCardOne || '';
//     var playerCardTwo = req.body.playerCardTwo || '';
//     var playerCardThree  = req.body.playerCardThree || '';
//     var playerCardFour  = req.body.playerCardFour || '';
//     cats.update(
//       {   playerName: namePlayer,
//           playerCardOne: playerCardOne,
//           playerCardTwo: playerCardTwo,
//           playerCardThree: playerCardThree,
//           playerCardFour: playerCardFour
//       {where: {idPlayer: playerId}}
//     )
//     res.json({"info": "Player geändert"});
// });

module.exports = router;
