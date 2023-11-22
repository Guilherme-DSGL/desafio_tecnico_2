# O Desafio

O desafio consistia em cria uma api de autenticação de usuários utilizando JavaScript.

As Tecnologias utilizadas foram:

- NodeJS v18.16.0
- Express v4.18.2

## Considerações ‼️ 
 - Peço encarecidamente paciência ao realizar a primeira requisição, pois a API está hospeda no [Render](https://render.com/), e o servidor provavelmente estará ocioso o que pode levar ele a demorar para responder.
 - Uma outra alternativa é utilizar a hospedagem da Vercel:
   
```
    https://deploy-desafio-1lfusb81p-guilherme-dsgl.vercel.app/
```
   
## Requisitos 📦
  - Persistencia de dados: MongoDB, mongoose.✅
  - Framework: Express.✅
  - Padronização de estilo: EsLint.✅
  - Task runner para build: Grunt✅
  - Gerenciamento de dependências: Npm.✅
  - Jwt com jsonwebtoken.✅
  - Testes com mocha.✅
  - Criptografia hash com crypto-js.✅

## Uso da Api

Requisições para a API devem seguir os padrões:

| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um cadastro. |
| `POST` | Utilizado para criar um novo cadastro. |

## Cadastro de Usuário (/sign-up)

| Método | URL |
|---|---|
| `POST` | ``` https://user-auth-desafio.onrender.com/sign-up ``` |

+ Requisição (application/json)

    + HEADER

            {
              "Content-Type": "application/json"
            }
    + BODY

            {
              "nome": "Antonio de Souza",
              "email": "antonio@gmail.com",
              "senha": "antonio#123",
              "telefones": [
                 {
                   "numero": "123456789",
                    "ddd": "11"
                 }
              ]
            }
      
+ Response 

    + Status 201 CREATED   
    + BODY

            {
              "id": "GUID/ID",
              "name": "Antonio de Souza",
              "data_criacao": "2023-11-22T14:38:34.911Z",
              "data_atualizacao": "2023-11-22T14:38:34.911Z",
              "ultimo_login": "2023-11-22T14:38:34.700Z",
              "token": "GUID/JWT"
            }
+ Erros Possíveis
  
  | Status | Descrição |
  |---|---|
  | `401 - Unauthorized` | Usuário e/ou senha incorretos |
  | `422 - Unprocessable Entity` | A requisição é compreendida porém o corpo contém erros |

## Autenticação (/sign-in)

| Método | URL |
|---|---|
| `POST` | ``` https://user-auth-desafio.onrender.com/sign-in ``` |

+ Requisição (application/json)

    + HEADER

            {
              "Content-Type": "application/json"
            }
    + BODY

            {
              "email": "antonio@gmail.com",
              "senha": "antonio#123"
            }
      
+ Response 

    + Status 200 OK    
    + BODY

            {
              "id": "GUID/ID",
              "name": "Antonio de Souza",
              "data_criacao": "2023-11-22T14:38:34.911Z",
              "data_atualizacao": "2023-11-22T14:38:34.911Z",
              "ultimo_login": "2023-11-22T14:45:34.700Z",
              "token": "GUID/JWT"
            }
+ Erros Possíveis
  
  | Status | Descrição |
  |---|---|
  | `409 - Conflict` | Tentativa de cadastro com um email já existente |
  | `422 - Unprocessable Entity` | A requisição é compreendida porém o corpo contém erros |

## Buscas Usuário (/user)

| Método | URL |
|---|---|
| `GET` | ``` https://user-auth-desafio.onrender.com/user ``` |

+ Requisição

    + HEADER

            {
              "Authentication": "Bearer {token}"
            }
      
+ Response 

    + Status 200 OK    
    + BODY

            {
              "id": "GUID/ID",
              "name": "Antonio de Souza",
              "data_criacao": "2023-11-22T14:38:34.911Z",
              "data_atualizacao": "2023-11-22T14:38:34.911Z",
              "ultimo_login": "2023-11-22T14:45:34.700Z",
            }
+ Erros Possíveis
  
  | Status | Descrição |
  |---|---|
  | `401 - Unauthorized` | Token inválido |
  | `401 - Unauthorized (Sessão inválida)` | O token expirou |
  
## Desenvolvedor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Guilherme-DSGL">
        <img src="https://avatars.githubusercontent.com/u/72310683?s=400&u=9f0ec757e6df46288a0bff579b2648b151319db7&v=4" width="100px;" alt="Kauê Sena"/><br>
        <sub>
          <b>Guilherme de Souza</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

### Obrigado pela atenção!
