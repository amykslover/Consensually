module.exports = function(sequelize, DataTypes) {

	var Code = sequelize.define('Code', {
		code: {
			type: DataTypes.INTEGER
		},
		codeType: {
			type: DataTypes.STRING
		}
	});

	Code.associate = function(models) {
		Code.belongsTo(models.User, {
	      foreignKey: {
	        allowNull: false
	      }			
		})
	}
	return Code;
}
