module.exports = function(sequelize, DataTypes) {
  
  var Encounter = sequelize.define('Encounter', {
    encounterStatus: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Encounter.associate = function(models) {
    
    Encounter.belongsToMany(models.User, {
      through: {model: models.UserEncounter}

      // foreignKey: {
      //   allowNull: false
      // }     
      
    })
  }

  return Encounter;
}