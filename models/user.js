var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	
	var User = sequelize.define('User', { 
		userFacebookID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userToken: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false
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
			through: {model: models.UserEncounter}
		})
	};
	
	return User;
}