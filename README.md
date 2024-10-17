<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A NestJS(Fastify) template out of the box📃</p>
<p align="center">
  <img src="https://img.shields.io/github/v/release/FantasyMiku/nest-ts-template" alt="Template Version" />
  <img src="https://img.shields.io/github/license/FantasyMiku/nest-ts-template" alt="Package License" />
  <img src="https://img.shields.io/github/forks/FantasyMiku/nest-ts-template" alt="Repo Forks" />
</p>

## Description

A [Nest](https://github.com/nestjs/nest)+[Fastify](https://github.com/fastify/fastify)+[Typescript](https://github.com/microsoft/TypeScript) template out of the box.

This template contains common combinations as follows:

- [Nest](https://github.com/nestjs/nest) - Core framework
  - [Config](https://github.com/nestjs/config) - Configuration
  - [Winston](https://github.com/gremo/nest-winston) - Logger
- [Fastify](https://github.com/fastify/fastify) - HTTP provider
  - [Cookie](https://github.com/fastify/fastify-cookie) - Cookie parser
  - [Helmet](https://github.com/fastify/fastify-helmet) - Security headers
- [Typescript](https://github.com/microsoft/TypeScript) - Language
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - Code linter

## Quick Start

There's nothing here :D

## Environment Variables

| Name         | Description                                              | Default |
|--------------|----------------------------------------------------------|---------|
| PORT         | Server listen port                                       | 3000    |
| DEBUG_MODE   | Debug mode, some features only work if this is turned on | True    |
| CONSOLE_LOG  | Enable console log output(Not recommended)               | False   |
| COOKIE_TOKEN | Cookie Encryption and decryption keys                    | APP     |


## License

This project is [MIT licensed](LICENSE).
