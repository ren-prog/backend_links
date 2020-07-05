module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Não pode ser arrow functions
    // se usar, o this será referente a essa função enão ao Account
    Account.prototype.ToJSON = function(){
        const values = { ...this.get()}
        delete values.password;
        return values;
    }
    return Account;
}