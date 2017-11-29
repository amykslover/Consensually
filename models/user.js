var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	
	var User = sequelize.define('User', {
		user_token: {
			type: DataTypes.STRING
		},
		user_name: {
			type: DataTypes.STRING
		}
	});

	User.associate = function(models) {
		User.hasMany(models.Codes, {
			onDelete: 'cascade'
		});

		User.belongsToMany(models.Encounters, {
			through: {model: models.UserEncounters}
		})
	};
	
	return User;
}