const Sequelize = require("sequelize");

module.exports = class Content extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Content",
        tablename: "contents",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
