export default function (sequelize, DataTypes) {
  const hotelRooms = sequelize.define(
    'hotelRooms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
      },
      hotelId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'hotel_id',
        references: {
          model: 'hotels',
          key: 'id'
        }
      },
      roomNo: {
        type: DataTypes.SMALLINT().UNSIGNED,
        allowNull: false,
        field: 'room_no'
      },
      floor: {
        type: DataTypes.SMALLINT().UNSIGNED,
        allowNull: false,
        field: 'floor'
      },
      roomPrice: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'room_price'
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        field: 'is_booked'
      },
      createdOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_on'
      },
      modifiedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'modified_on'
      }
    },
    {
      tableName: 'hotel_rooms',
      timestamps: false
    }
  );
  return hotelRooms;
}
