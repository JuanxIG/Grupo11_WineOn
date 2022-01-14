const fs = require("fs");
const path = require("path");

const fileName = path.join(__dirname, '../data/users.json')

const Usuarios = {
    
    traerDatos: () => {
		return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
	},

    generarId: ()=> {
        
        let usuariosTodos = this.buscarTodos();
        let ultimoUsuario = usuariosTodos.pop();
        if (ultimoUsuario) {
             return ultimoUsuario.id + 1;
        }
        return 1;
    },
    
    buscarTodos: () => {
		return this.traerDatos();
	},
    
    buscarPorId: (id) => { /* buscarPorPk mas adelante */
		let usuariosTodos = this.buscarTodos();
		let usuarioEncontrado = usuariosTodos.find(usuario => usuario.id === id);
		return usuarioEncontrado;
	},

    buscarPorCampo: (campo, text) => { /* buscarPorPk mas adelante */
		let usuariosTodos = this.buscarTodos();
		let usuarioEncontrado = usuariosTodos.find(usuario => usuario[campo] === text);
		return usuarioEncontrado;
	},

    crearUsuario: (datosUsuario) => {
        let usuariosTodos = this.buscarTodos();
        let nuevoUsuario = {
            id: this.generarId(),
            ...datosUsuario
        }
        usuariosTodos.push(nuevoUsuario);
        fs.writeFileSync(fileName, JSON.stringify(usuariosTodos, null, " "));
        return nuevoUsuario;
    },
    
    borrarUsuario: (id) => {
        let usuariosTodos = this.buscarTodos();
        let usuariosFinales = usuariosTodos.filter( unUsuario => unUsuario.id !== id);
        fs.writeFileSync(fileName, JSON.stringify(usuariosFinales, null, " "));
        return true;
    }
    
}






module.exports = Usuarios;