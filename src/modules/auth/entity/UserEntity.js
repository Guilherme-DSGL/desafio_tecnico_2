class User {
    constructor(id, name, email, password, phones, lastLogin, createdAt, updatedAt, authToken){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.lastLogin = lastLogin; 
        this.createdAt = createdAt; 
        this.updatedAt = updatedAt; 
        this.authToken = authToken;
        this.phones = phones;
    }

    
    static fromJson(json) {
        const { id, nome, email, senha, lastLogin, createdAt, updatedAt, authToken, telefones } = json;
        return new User(id, nome, email, senha, telefones, lastLogin, createdAt, updatedAt, authToken);
    }

    static fromDb(userModel){
        return new User(userModel.id, 
            userModel.name,
            userModel.email, 
            userModel.password, 
            userModel.phones, 
            userModel.lastLogin, 
            userModel.createdAt, 
            userModel.updatedAt, 
        );
    }

    getUserDetails(){
        return {
            'id': this.id,
            'name': this.name,
            'data_criacao': this.createdAt,
            'data_atualizacao': this.updatedAt,
            'ultimo_login': this.lastLogin,
            'token': this.token,
        };
    }

}

module.exports = User;