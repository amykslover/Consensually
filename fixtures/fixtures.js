    var sequelize_fixtures = require('sequelize-fixtures');

    //a map of [model name] : model
    //see offical example on how to load models
    //https://github.com/sequelize/express-example/blob/master/models/index.js
    var models = require('../models');
    console.log(models)

    //array of files
    sequelize_fixtures.loadFiles(['fixtures/users.json', 'fixtures/codes.json', 'fixtures/encounters.json' ], models).then(function(){
        doStuffAfterLoad();
    });



    //apply transform for each model being loaded
    sequelize_fixtures.loadFile('fixtures/*.json', models, {
        transformFixtureDataFn: function (data) {
          if(data.createdAt
           && data.createdAt < 0) {
            data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
          }
          return data;
        }
    }).then(function() {
        doStuffAfterLoad();
    });

    //modify each model being loaded
    sequelize_fixtures.loadFile('fixtures/*.json', models, {
        modifyFixtureDataFn: function (data) {
          if(!data.createdAt) {
            data.createdAt = new Date();
          }
          return data;
        }
    }).then(function() {
        doStuffAfterLoad();
    });

    //from array
    var fixtures = [
        {
            model: 'Foo',
            data: {
                propA: 'bar',
                propB: 1
            }
        },
        {
            model: 'Foo',
            data: {
                propA: 'baz',
                propB: 3
            }
        }
    ];
    sequelize_fixtures.loadFixtures(fixtures, models).then(function(){
        doStuffAfterLoad();
    });