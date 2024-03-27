# Teste Técnico de Backend - Wefit

Este projeto é uma aplicação desenvolvida seguindo os princípios da arquitetura hexagonal, utilizando TDD (Desenvolvimento Orientado a Testes), Express, TypeOrm, Command Pattern, JWT (JSON Web Token) e BCrypt.

## Decisões de Projeto

### Arquitetura Hexagonal

A arquitetura hexagonal foi escolhida para este projeto com o objetivo de manter a camada do domínio (regras de negócio) isolada do restante da aplicação. Isso facilita a inversão de dependências e proporciona uma estrutura altamente testável, escalável e de fácil manutenção.

### TDD (Desenvolvimento Orientado a Testes)

Juntamente com a Arquitetura Hexagonal, foi adotado o TDD para garantir o correto funcionamento do código durante todo o desenvolvimento. Os testes foram escritos antes da implementação do código de produção, garantindo a confiabilidade e robustez do sistema.

### Command Pattern

O padrão Command foi utilizado para separar as regras de negócio das lógicas de execução. Isso permite manter dentro do domínio apenas a lógica necessária, tornando o código mais coeso e fácil de entender.

### TypeOrm

Para manipulação do banco de dados, foi escolhido o TypeOrm devido à sua facilidade de uso e integração com o TypeScript. Ele simplifica a implementação da lógica do banco de dados e facilita a mudança para um banco de dados em memória para os casos de teste.

### JWT (JSON Web Token)

Para garantir a segurança da aplicação, foi utilizado o JWT para gerenciar a autenticação e autorização dos usuários. Ele fornece um meio seguro e eficiente de transmitir informações entre cliente e servidor de forma criptografada.

### BCrypt

Para armazenar as senhas dos usuários de forma segura, foi utilizado o BCrypt para criptografar as senhas antes de serem armazenadas no banco de dados.

## Rodando a aplicação 🚀

```bash
# Clone este repositório
$ git clone https://github.com/guilhermetupi/teste-backend-wefit

# Acesse a pasta do projeto
$ cd teste-backend-wefit

# Instale as dependências
$ yarn

# Inicie o container do docker
$ docker compose up -d

# Copie o arquivo .env.example para .env
## Unix
$ cp .env.example .env
## Windows
$ copy .env.example .env

# Rode as migrations
$ yarn run migration:run

# Inicie a aplicação
$ yarn start
```

## Testando a aplicação ⚙

```bash
# Com as dependências instaladas basta rodar os testes
$ yarn test

# Ou para visualizar a cobertura dos testes
$ yarn test:coverage
```
