export default function (sequelize, DataTypes) {
  const hotelEmployees = sequelize.define(
    'hotelEmployees',
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
      employeeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'employee_id',
        references: {
          model: 'users',
          key: 'id'
        }
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
      tableName: 'hotel_employees',
      timestamps: false
    }
  );
  hotelEmployees.associate = (models) => {
    models.hotelEmployees.belongsTo(models.users, { foreignKey: 'employee_id' });
    models.hotelEmployees.belongsTo(models.hotels, { foreignKey: 'hotel_id' });
  };
  return hotelEmployees;
}
