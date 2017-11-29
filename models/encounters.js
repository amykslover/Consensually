module.exports = function(sequelize, DataTypes) {
  
  var Encounters = sequelize.define('Encounters', {
    encounter_status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Encounters.associate = function(models) {
    
    Encounters.belongsToMany(models.User, {
      through: {model: models.UserEncounters},

      foreignKey: {
        allowNull: false
      }     
      
    })
  }

  return Encounters;
}