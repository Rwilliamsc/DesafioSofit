export default (sequelize, DataTypes) => {
  const prices = sequelize.define('prices', {
    codigo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  })

  return prices
}
