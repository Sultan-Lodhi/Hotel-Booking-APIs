export default function (sequelize, DataTypes) {
  const userBookings = sequelize.define(
    'userBookings',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
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
      roomId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'room_id',
        references: {
          model: 'hotel_rooms',
          key: 'id'
        }
      },
      noOfGuests: {
        type: DataTypes.SMALLINT().UNSIGNED,
        allowNull: false,
        field: 'no_of_guests'
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_in'
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_out'
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
      tableName: 'user_bookings',
      timestamps: false
    }
  );
  userBookings.associate = (models) => {
    models.userBookings.belongsTo(models.users, { foreignKey: 'user_id' });
    models.userBookings.belongsTo(models.hotels, { foreignKey: 'hotel_id' });
    models.userBookings.belongsTo(models.hotelRooms, { foreignKey: 'room_id' });
  };
  return userBookings;
}
