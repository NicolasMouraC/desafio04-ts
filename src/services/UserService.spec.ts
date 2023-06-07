import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [
        {
            name: 'Nath',
            email: 'nath@dio.bank'
        }
    ]
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve deletar um usuário', () => {
        const response = userService.deleteUser('Nath');
        expect(response).toBe('Usuário deletado');
    })

    it('Deve retornar negativo para uma tentativa de deletar um usuário inválido', () => {
        const response = userService.deleteUser('inválido');
        expect(response).toBe('Usuário inválido');
    })
})
