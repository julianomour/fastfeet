module.exports = {
  up: queryInterface =>
    queryInterface.removeColumn('deliverymen', 'password_hash'),
};
