var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	
	var User = sequelize.define('User', { 
		userToken: {
			type: DataTypes.STRING
		},
		userName: {
			type: DataTypes.STRING
		},
		userEmail: {
			type: DataTypes.STRING
		}
	})

	User.associate = function(models) {
		User.hasMany(models.Code, {
			onDelete: 'cascade'
		});

		User.belongsToMany(models.Encounter, {
			through: {model: models.UserEncounters}
		})
	};
	
	return User;
}