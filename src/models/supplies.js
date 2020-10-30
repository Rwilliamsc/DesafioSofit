export default (sequelize, DataTypes) => {
  const supplies = sequelize.define('supplies', {
    codigo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
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

  return supplies
}
