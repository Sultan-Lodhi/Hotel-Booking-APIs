export default function (sequelize, DataTypes) {
  const hotels = sequelize.define(
    'hotels',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      hotelName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'hotel_name',
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'city',
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'address',
      },
      rating: {
        type: DataTypes.SMALLINT(1),
        allowNull: false,
        field: 'rating',
      },
      createdOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_on',
      },
      modifiedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'modified_on',
      },
    },
    {
      tableName: 'hotels',
      timestamps: false,
    }
  );
  hotels.associate = (models) => {
    models.hotels.hasMany(models.hotelRooms, {
      foreignKey: 'hotel_id',
    });
  };
  return hotels;
}
