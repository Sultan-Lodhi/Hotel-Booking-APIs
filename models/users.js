export default function (sequelize, DataTypes) {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
      },
      userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'user_name'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'email'
      },
      mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'mobile'
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password'
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        field: 'is_active'
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'token'
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
      tableName: 'users',
      timestamps: false
    }
  );
  users.associate = (models) => {
    models.users.hasMany(models.userBookings, {
      foreignKey: 'user_id',
    });
  };
  return users;
}
