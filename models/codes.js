module.exports = function(sequelize, DataTypes) {

	var Codes = sequelize.define('Codes', {
		code: {
			type: DataTypes.INTEGER,
		},
		codeType: {
			type: DataTypes.STRING,
		}
	});

	Codes.associate = function(models) {
		Codes.belongsTo(models.User, {
	      foreignKey: {
	        allowNull: false
	      }			
		})
	}
	return Codes;
}
