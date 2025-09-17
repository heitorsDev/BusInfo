# Projeto SA - BusInfo
Esse repositório contém o código utilizado no *backend* do Projeto SA de 2025 **BusInfo** da turma 3C (Desenvolvimento de Sistemas) do Sesi Senai São José.
## Membros da equipe:
- Heitor Hillesheim dos Santos
- Bruno Dal Prá
- Letícia Alves Coelho
- Enzo Cassol de Déa
## Breve explicação do projeto:
O BusInfo é um aplicativo que permite visualizar a quantidade de pessoas dentro do ônibus que você deseja pegar. Além disso, você consegue acompanhar em tempo real a rota que ele está fazendo.
## Dependências locais:
- **[NodeJS (22.12.0) e NPM (10.9.0)](https://nodejs.org/en/download/)**
- **[PostgreSQL](https://www.postgresql.org/download/)**
## Dependências do aplicativo:
```
Ôö£ÔöÇÔöÇ bcrypt@6.0.0
Ôö£ÔöÇÔöÇ cookie-parser@1.4.7
Ôö£ÔöÇÔöÇ dotenv@17.2.1
Ôö£ÔöÇÔöÇ express@5.1.0
Ôö£ÔöÇÔöÇ jsonwebtoken@9.0.2
Ôö£ÔöÇÔöÇ pg@8.16.3
ÔööÔöÇÔöÇ sequelize@6.37.7
```
## Variáveis de ambiente:
Na pasta raiz do seu projeto, deve existir um arquivo .env com as seguintes variáveis de ambiente:
```
DB_USER=AdminBusInfo
DB_PASSWORD=123456789
DB_NAME=BusInfo
PORT=4000
JWT_SECRET=subinoonibus
ADMIN_KEY=souadmin
```
## Sincronização do banco de dados:
Para sincronizar o banco de dados do projeto, execute na raiz do seu projeto:
```
node dbsync.js
```
## Inicialização do programa:
Para inicializar o programa, execute na raiz do seu projeto:
```
node index.js
```
## Endpoints:

# API de Gerenciamento de Motoristas, Rotas e Pontos

## Endpoints

### **POST Endpoints**

1. **/register** - Registro de Motoristas (usuários comuns)
    - **Schema**:
      ```json
      {
          "Name": "Heitor Santos",
          "Password": "123456",
          "CPF": "01681209330"
      }
      ```
    - **Descrição**: Endpoint utilizado para registrar motoristas no sistema.

2. **/adminRegister** - Registro de Administradores
    - **Schema**:
      ```json
      {
          "Name": "Heitor Santos 2",
          "Password": "123456",
          "CPF": "01681209331",
          "key": "souadmin"
      }
      ```
    - **Descrição**: Endpoint utilizado para registrar administradores. A chave "key" é necessária para validar a criação de um administrador.

3. **/login** - Login de Motoristas e Administradores
    - **Schema**:
      - **Administrador**:
        ```json
        {
            "CPF": "01681209331",
            "Password": "123456"
        }
        ```
      - **Motorista**:
        ```json
        {
            "CPF": "01681209330",
            "Password": "123456"
        }
        ```
    - **Descrição**: Endpoint para realizar login de motoristas e administradores no sistema.

4. **/rotacreate** - Criação de Rota (somente para administradores)
    - **Schema**:
      ```json
      {
          "Name": "Aririri", 
          "Numero": 363, 
          "HorarioPartida": "08:00", 
          "MaximoPassageiros": 40
      }
      ```
    - **Descrição**: Endpoint utilizado para criar novas rotas no sistema, acessível apenas para administradores.

5. **/pontocreate** - Criação de Ponto (somente para administradores)
    - **Schema**:
      ```json
      {
          "Localizacao": "Av. Paulista, 1000"
      }
      ```
    - **Descrição**: Endpoint utilizado para criar pontos no sistema, acessível apenas para administradores.

6. **/motoristaRotaRegister** - Associação de Motorista a Rota (somente para administradores)
    - **Schema**:
      ```json
      {
          "IdMotorista": 1, 
          "IdRota": 1, 
          "Horario": "08:00"
      }
      ```
    - **Descrição**: Endpoint utilizado para associar motoristas a rotas, acessível apenas para administradores.

7. **/pontorotacreate** - Associação de Ponto a Rota (somente para administradores)
    - **Schema**:
      ```json
      {
          "IdPonto": 1, 
          "IdRota": 1, 
          "Horario": "09:00"
      }
      ```
    - **Descrição**: Endpoint utilizado para associar pontos a rotas, acessível apenas para administradores.

8. **/rotaupdate** - Atualização de Rota (somente para motoristas associados à rota)
    - **Schema**:
      ```json
      {
          "IdRota": 1, 
          "Numeropassageiros": 20, 
          "Ativa": true, 
          "IdMotorista": 1
      }
      ```
    - **Descrição**: Endpoint utilizado para atualizar uma rota, acessível apenas aos motoristas associados à rota.

---

### **GET Endpoints**

1. **/getrota/:numero** - Obter detalhes de uma rota pelo número
    - **Descrição**: Endpoint público para obter detalhes de uma rota específica pelo número da rota.
    - **Exemplo de URL**: `localhost:4000/getrota/363`
    - **Resposta**: Retorna detalhes sobre a rota com o número especificado.

---

## Descrição das Middlewares

- **ValidateMotorista**: Middleware para validar se o usuário é um motorista.
- **ValidateAdmin**: Middleware para validar se o usuário é um administrador.

---


