<h1 id="top" align="center">JOGO-FORCA</h1>

<p align="center">Project created with Frevo Front-End static generator CLI :octocat:</p>

<div align="center">
    <img src="https://img.shields.io/static/v1?label=node&message=14.15.4&color=8bc790&style=for-the-badge&logo=node.js"/>
    <space></space>
    <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=8bc790&style=for-the-badge&logo=mit"/>
    <space></space>
</div>

<br>

## Tabela de conteúdos
<!--ts-->
   * [Overview](#overview)
   * [Tecnologias](#tecnologias)
   * [Arquitetura](#arquitetura)
   * [Features](#features)
   * [Obtendo o projeto](#obtendo-o-projeto)
   * [Instalando as dependências](#instalando-as-dependências)
   * [Scripts de execução](#scripts-de-execução)
   * [Caminho raíz](#caminho-raíz)
   * [Autor](#autor)

<!--te-->

## Overview

Este Boilerplate contém um style-guide próprio configurado através do ESLint, EditorConfig e Git Hooks (utilizando o Husky).

Todo o projeto foi construído e pensado em cima de uma arquitetura modular para que seja possível trabalhar facilmente com componentes, tanto no Sass como no Javascript.

Através de alguns recursos, conseguimos um ambiente de desenvolvimento e produção com uma grande compatibilidade entre navegadores (Cross-Browser), tanto no CSS (através do Autoprefixer e PostCSS) como no Javascript (através do Babel).

Ir para o [topo](#top).

## Tecnologias
As seguintes tecnologias foram usadas na construção do projeto:

- [Frevo](https://github.com/jmontejr/frevo.git)
- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)
- [Gulp File Include](https://www.npmjs.com/package/gulp-file-include)
- [Gulp Responsive](https://www.npmjs.com/package/gulp-responsive)
- [Bootstrap (Bootstrap-Grid)](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Husky](https://typicode.github.io/husky/)
- [ESLint](https://eslint.org/)
- [EditorConfig](https://editorconfig.org/)
- [BrowserSync](https://www.browsersync.io/)
- [Babel](https://babeljs.io/)

Ir para o [topo](#top).

## Arquitetura

```
|-- src/
    |-- app/
        |-- assets/
            |-- fonts/
                |-- fontDefault/
                |-- fontSecondary/
            |-- images/
                |-- misc/
                |-- icons/
            |-- js/
                |-- libs/
                    |-- libExample.js
                |-- plugins/
                    |-- pluginExample.js
            |-- scss/
                |-- config/
                    |-- _base.scss
                    |-- _functions.scss
                    |-- _mixins.scss
                    |-- _placeholders.scss
                    |-- _plugins.scss
                    |-- _typography.scss
                    |-- _variables.scss
                |-- style.scss
        |-- modules/
            |-- components/
                |-- component1/
                    !-- index.html
                    |-- index.js
                    |-- style.scss
            |-- layouts/
                |-- header/
                    !-- index.html
                    |-- index.js
                    |-- style.scss
                |-- footer/
                    !-- index.html
                    |-- index.js
                    |-- style.scss
            |-- pages/
                |-- pageExample1/
                    |-- index.html
                |-- pageExample2/
                    |-- index.html
                |-- index.html
            |-- services/
                |-- integration/
                    index.js
                |-- cookies/
                    index.js
                |-- lazy-loading/
                    index.js
                |-- localStorage/
                    index.js
```

Ir para o [topo](#top).

## Features

- [x] ESLint
- [] Responsive
- [] CSS Flexbox
- [] Lazy-Loading

Ir para o [topo](#top).

## Obtendo o projeto

Abra um terminal de comandos na pasta onde deseja salvar o projeto e digite o comando abaixo:

```git
$ git clone https://github.com/{ NOME_AUTOR }/{ NOME_PROJETO }.git
```

Ou baixe o arquivo comprimido diretamente do repositório do projeto no Github e descompacte onde desejar.


Ir para o [topo](#top).

## Instalando as dependências

Entre no diretório raíz do projeto e execute no terminal o comando abaixo:

```bash
$ npm install
```

**Obs. 1:** Você poderá utilizar a [NVM (Node Version Manager)](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt#op%C3%A7%C3%A3o-3-%E2%80%94-instalando-o-node-usando-o-gerenciador-de-vers%C3%B5es-do-node) para configurar diferentes versões do Node.JS e usá-las.

**Obs. 2:** Para que o arquivo `.editorconfig` funcione você deve consultar a documentação e verificar se o seu editor de texto ou IDE já possui suporte nativo, caso não será necessário baixar um plugin ou extensão para que a sua ferramenta dê suporte ao arquivo.

Ir para o [topo](#top).

## Scripts de execução

Os comandos abaixo podem ser encontrados no arquivo `package.json` localizado na raíz do projeto.

```bash
# Lint
# Para executar os testes do ESLint execute no terminal o comando:

$ npm run lint

# Lint fix
# Para corrigir os erros encontrados no teste do ESLint execute no terminal o comando:

$ npm run lint:fix

# Clean
# Para remover o diretório ./dist (onde estão os arquivos de saída do build do projeto) execute no terminal o comando:

$ npm run clean

# Clean cache
# Para remover o cache execute no terminal o comando:

$ npm run clean:cache

# Develop
# Para compilar os arquivos e ficar assistindo as alterações em um servidor local reativo emulado pelo **BrowserSync** execute no terminal o comando:

$ npm run start

# Build
# Para executar o build do projeto execute no terminal o comando

$ npm run build
```

Ir para o [topo](#top).

## Caminho raíz

Você pode usar `##` como um *alias* para `src/app/modules` nos arquivos `*.html`.
```html
<!-- A forma de importar arquivos usando o file-include a seguir -->
@@include('##/layouts/Footer/index.html')

<!-- é igual à forma abaixo-->
@@include('src/app/modules/layouts/Footer/index.html')
```

Você poderá usar qualquer uma das duas!


Ir para o [topo](#top).


## Autor

<h3>{ NOME_AUTOR }</h3>
<p>Desenvolvido com :heart:</p>

Ir para o [topo](#top).
