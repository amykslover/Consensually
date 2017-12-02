var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	
	var User = sequelize.define('User', { 
		userFacebookID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		userToken: {
			type: DataTypes.STRING,
			allowNull: true
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userEmail: {
			type: DataTypes.STRING,
			allowNull: true
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