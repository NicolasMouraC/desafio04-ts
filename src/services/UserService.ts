export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser= (name: string) => {
        const user = this.db.find(item => item.name === name);
        if(user) {
            this.db.filter(user => user.name !== name)
            return 'Usuário deletado'
        }

        return 'Usuário inválido'
    }
}

