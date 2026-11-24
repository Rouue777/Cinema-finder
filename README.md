# Cinema Finder

Aplicação web para exploração e localização de cinemas na Austrália e Nova Zelândia, com visualização geográfica interativa, filtragem por país e franquia e exibição de informações detalhadas dos estabelecimentos.

O projeto foi desenvolvido originalmente a partir da simulação **Software Engineering Job Simulation**, da Forage (Datacom), e posteriormente evoluído com correções de bugs, melhorias de arquitetura, testes automatizados e containerização para produção.

## Visão geral

O Cinema Finder permite explorar cinemas por meio de uma interface integrada a mapas interativos. A aplicação oferece navegação entre países, seleção de estabelecimentos e visualização de informações detalhadas.

Além da implementação original, o projeto passou por uma etapa de engenharia e evolução técnica, com foco em confiabilidade, organização, testabilidade e preparação para execução em produção.

## Funcionalidades

- **Visualização geográfica:** exibição de cinemas em um mapa interativo.
- **Navegação por país:** exploração de cinemas da Austrália e Nova Zelândia.
- **Filtragem por franquia:** visualização de estabelecimentos de diferentes redes.
- **Seleção de cinemas:** interação com marcadores no mapa.
- **Detalhes do estabelecimento:** exibição de nome, endereço e telefone.
- **Navegação sincronizada:** seleção de um cinema na listagem centraliza o mapa na localização correspondente.
- **Restrição geográfica:** limitação da navegação do mapa à região de interesse.
- **Alternância de implementação de mapas:** suporte às implementações com Leaflet e MapLibre.

## Tecnologias utilizadas

| Categoria | Tecnologias |
|---|---|
| Linguagem | JavaScript |
| Frontend | React 18 |
| Interface | Material UI 5 |
| Estilização | Emotion |
| Roteamento | React Router DOM 5 |
| Mapas | MapLibre GL, React Map GL, Leaflet |
| Dados geográficos | Turf.js |
| Testes | Jest, React Testing Library |
| Containerização | Docker |
| Servidor web | Nginx |
| CI | GitHub Actions |

## Arquitetura

A aplicação utiliza uma arquitetura baseada em componentes React, com Context API para compartilhamento de estado entre componentes que precisam acessar informações comuns.

### Organização dos componentes

- `Map/`: abstração das implementações de mapas.
- `CinemaSelection/`: gerenciamento do estado do cinema selecionado.
- `CinemaMarkers`: renderização e interação com os marcadores.
- `CinemaDetails`: apresentação dos detalhes do cinema selecionado.
- `CinemaListItem`: interação entre a listagem e a localização no mapa.
- `Provider`: composição dos provedores globais da aplicação.

### Compartilhamento de estado

O contexto `CinemaSelection` centraliza o estado do cinema selecionado, permitindo que diferentes componentes reajam à mesma seleção.

Isso possibilita, por exemplo:

1. O usuário seleciona um marcador.
2. O componente atualiza o contexto.
3. A aplicação identifica o cinema selecionado.
4. O painel de detalhes apresenta as informações correspondentes.
5. O usuário pode retornar à listagem, limpando a seleção.

### Abstração dos mapas

O projeto utiliza um contexto para desacoplar os componentes que renderizam marcadores das bibliotecas responsáveis pela implementação do mapa.

Dessa forma, componentes como `CinemaMarkers` podem consumir uma implementação de marcador sem precisar conhecer os detalhes internos de Leaflet ou MapLibre.

Essa abordagem reduz o acoplamento entre a lógica de negócio e a biblioteca de visualização geográfica.

## Melhorias e correções implementadas

Durante a evolução do projeto, foram identificados e corrigidos problemas que afetavam o comportamento da aplicação.

### Bug A — Seleção de marcadores e exibição de detalhes

**Problema:** a interação com os marcadores não atualizava corretamente o estado necessário para apresentar os detalhes do cinema.

**Solução:**
- Implementação do contexto `CinemaSelection`.
- Compartilhamento do estado do cinema selecionado.
- Integração da seleção com as implementações de Leaflet e MapLibre.
- Criação do painel de detalhes.
- Limpeza da seleção ao retornar à listagem e ao mudar de rota.

### Bug B — Navegação do mapa a partir da listagem

**Problema:** a navegação para a localização de um cinema apresentava inconsistência na ordem das coordenadas.

**Solução:**

Correção da ordem das coordenadas utilizadas pelo MapLibre:

- Longitude (`lng`): eixo X.
- Latitude (`lat`): eixo Y.

O mapa passou a receber as coordenadas no formato esperado pela biblioteca.

### Bug C — Restrição geográfica do mapa

**Problema:** era possível navegar para regiões fora da área de interesse, mesmo com a aplicação voltada exclusivamente à Austrália e Nova Zelândia.

**Solução:**
- Utilização dos limites geográficos definidos em `bounds.js`.
- Conversão dos limites para o formato esperado pelo MapLibre.
- Configuração de `maxBounds` para restringir a navegação.
- Definição dos limites iniciais da visualização.

## Testes automatizados

A aplicação possui testes automatizados utilizando Jest e React Testing Library.

A estratégia de testes contempla diferentes níveis:

| Nível | Objetivo |
|---|---|
| Testes de dados | Validar a integridade dos dados utilizados pela aplicação |
| Testes de contexto | Validar o estado e as operações de seleção |
| Testes de componentes | Verificar renderização e interações dos componentes |
| Testes de integração | Validar o comportamento conjunto entre seleção, contexto e interface |

### Cobertura funcional implementada

- Estado inicial do contexto.
- Seleção e limpeza de cinemas.
- Proteção contra uso do contexto fora do Provider.
- Renderização dos detalhes.
- Exibição de telefone e endereço.
- Interação com os marcadores.
- Filtragem por país e franquia.
- Sincronização entre seleção e painel de detalhes.
- Limpeza da seleção durante a navegação.

### Executar os testes

```bash
npm test -- --watchAll=false
```

**Resultado registrado durante o desenvolvimento:**

- 6 suítes de testes aprovadas.
- 20 testes aprovados.

## Executando localmente

### Pré-requisitos

- Node.js 20.
- npm.
- Git.

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

### 2. Entrar no diretório

```bash
cd cinema-finder
```

### 3. Instalar dependências

```bash
npm ci --legacy-peer-deps
```

A opção `--legacy-peer-deps` é utilizada devido a uma incompatibilidade declarada na faixa de peer dependencies do pacote `use-persisted-state@0.3.3` em relação ao React 18.

### 4. Iniciar a aplicação

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Executando com Docker

O projeto utiliza Docker Multi-Stage Build para separar o processo de compilação da aplicação do ambiente responsável por servi-la em produção.

### Arquitetura do Docker

**Stage 1 — Build**

- Utiliza Node.js 20 Alpine.
- Instala as dependências.
- Executa o processo de compilação do React.
- Gera os arquivos estáticos de produção.

**Stage 2 — Production**

- Utiliza Nginx Alpine.
- Recebe somente os arquivos compilados do primeiro estágio.
- Disponibiliza a aplicação pela porta 80.

Essa abordagem reduz o conteúdo desnecessário na imagem final e separa as responsabilidades de build e execução.

### Construir a imagem

```bash
docker build -t cinema-finder .
```

### Executar o container

```bash
docker run -d -p 8080:80 --name cinema-finder-app cinema-finder
```

### Acessar a aplicação

```text
http://localhost:8080
```

### Verificar os containers

```bash
docker ps
```

### Consultar os logs

```bash
docker logs cinema-finder-app
```

### Parar o container

```bash
docker stop cinema-finder-app
```

### Remover o container

```bash
docker rm cinema-finder-app
```

## Integração contínua (CI)

O projeto está sendo preparado para utilizar GitHub Actions como ferramenta de integração contínua.

O workflow de CI tem como objetivo automatizar as seguintes verificações:

1. Checkout do código-fonte.
2. Configuração do Node.js.
3. Instalação das dependências.
4. Execução dos testes automatizados.
5. Build de produção do React.
6. Construção da imagem Docker.

O pipeline será acionado em eventos de `push` e `pull_request`, permitindo identificar falhas antes da integração das alterações à branch principal.

> A implementação da CI deve ser considerada concluída somente após a configuração do workflow e a validação de sua execução no GitHub Actions.

## Estrutura do projeto

```text
cinema-finder/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Map/
│   │   ├── CinemaSelection/
│   │   ├── CinemaDetails.jsx
│   │   ├── CinemaMarkers.jsx
│   │   └── CinemaListItem.jsx
│   │
│   ├── data/
│   │
│   ├── App.js
│   └── setupTests.js
│
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

*Estrutura resumida dos diretórios e arquivos relevantes.*

## Decisões técnicas e aprendizados

A evolução do Cinema Finder foi conduzida com foco em compreender não apenas o funcionamento dos componentes, mas também as responsabilidades de cada camada da aplicação.

Entre os principais conceitos trabalhados:

- Gerenciamento de estado compartilhado com React Context API.
- Separação de responsabilidades e redução de acoplamento.
- Abstração de bibliotecas externas.
- Manipulação de coordenadas geográficas.
- Testes de componentes e integração.
- Identificação e correção de bugs.
- Containerização com Docker Multi-Stage Build.
- Utilização do Nginx para servir aplicações React em produção.
- Automação de validações com GitHub Actions.

## Roadmap

- [x] Análise da estrutura e arquitetura existente.
- [x] Correção do fluxo de seleção de cinemas.
- [x] Correção da navegação por coordenadas.
- [x] Restrição geográfica do mapa.
- [x] Testes automatizados de dados, contexto, componentes e integração.
- [x] Docker Multi-Stage Build.
- [x] Configuração do Nginx para servir o frontend.
- [x] Execução e validação local do container.
- [x] Configuração do `.dockerignore`.
- [ ] Conclusão e validação da CI com GitHub Actions.
- [ ] Deploy da aplicação em ambiente de produção.
- [ ] Documentação do processo de deploy.

## Origem do projeto

Este projeto teve como ponto de partida a simulação **Software Engineering Job Simulation**, disponibilizada pela [Forage](https://www.theforage.com/), em parceria com a Datacom.

A implementação original foi utilizada como base para uma evolução independente, com correções adicionais, testes, containerização e melhorias de engenharia de software.

## Autor

**Jeferson Paixão**

Software Engineer | Backend Development | Software Engineering

- [LinkedIn](https://www.linkedin.com/in/jefersonsantos36/)
- [GitHub](https://github.com/Rouue777)
- [Portfólio](https://portfolio-jeferson.vercel.app/)

---

Desenvolvido como projeto de estudo e evolução prática em engenharia de software.