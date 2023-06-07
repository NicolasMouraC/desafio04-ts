import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar um erro caso o nome não seja fornecido', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve retornar um erro caso o email não seja fornecido', () => {
        const mockRequest = {
            body: {
                name: 'Nath'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    })

    it('Deve verificar se a função getAllUsers está sendo chamada', () => {
        const mockResponse = makeMockResponse();
        userController.getAllUsers({} as Request, mockResponse);    

        expect(mockUserService.getAllUsers).toBeCalled();
    })

    it('Deve deletar um usuário', () => {
        const mockRequest = {
            body: {
                user: 'Nath'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);    

        expect(mockUserService.deleteUser).toBeCalled();
        expect(mockResponse.state.status).toBe(204)
    })
})
