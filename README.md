# Automação de Testes UI com Playwright

Automação de testes end-to-end utilizando **Playwright**, estruturada em **Page Object Model (POM)** com páginas e arquivos de seletores separados.  
O objetivo é garantir qualidade, estabilidade e facilidade de manutenção nos testes de interface da aplicação.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando os Testes](#executando-os-testes)
- [Estrutura POM (Page Object Model)](#estrutura-pom-page-object-model)
- [Criando Novos Testes](#criando-novos-testes)
- [Boas Práticas](#boas-práticas)
- [Relatórios](#relatórios)
- [GitHub Actions](#github-actions)

---

## Visão Geral

Este projeto contém uma suíte de testes automatizados utilizando **Playwright** para testar a aplicação **Sauce Demo** (https://www.saucedemo.com/).  
A estrutura segue o padrão **Page Object Model**, separando:

- **Seletores** (arquivos de elementos)
- **Ações e fluxos** (arquivos de páginas)
- **Testes** focados apenas em comportamento e validação

Essa abordagem garante testes organizados, escaláveis e de fácil manutenção.

---

## Arquitetura do Projeto

```
 auvo-testproject
 ┣ tests/                       # Arquivos de testes
 ┃  ┣ login.spec.js            # Testes de login
 ┃  ┗ products.spec.js         # Testes de produtos
 ┣ src/
 ┃  ┣ pages/                   # Page Objects (ações das páginas)
 ┃  ┃  ┣ BasePage.js          # Classe base com métodos comuns
 ┃  ┃  ┣ HomePage.js          # Página de login/home
 ┃  ┃  ┗ ProductPage.js       # Página de produtos
 ┃  ┣ selectors/               # Arquivos de seletores
 ┃  ┃  ┣ homeSelectors.js     # Seletores da página de login/home
 ┃  ┃  ┗ productSelectors.js  # Seletores da página de produtos
 ┃  ┣ config/                  # Configurações e dados de teste
 ┃  ┃  ┗ credentials.js       # Credenciais centralizadas
 ┣ playwright-report/          # Relatórios HTML gerados
 ┣ test-results/               # Resultados dos testes (screenshots, vídeos)
 ┣ playwright.config.js        # Configurações principais do Playwright
 ┣ package.json
 ┗ README.md
```

---

## Tecnologias

- **Playwright** - Framework de automação de testes
- **Node.js** - Runtime JavaScript
- **JavaScript (ES6+)** - Linguagem de programação
- **Page Object Model (POM)** - Padrão de arquitetura de testes

---

## Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com Node.js)

Para verificar se estão instalados:
```bash
node --version
npm --version
```

---

## Instalação e Configuração

1. **Clone o repositório** (se aplicável)

2. **Instale as dependências:**
```bash
npm install
```

3. **Instale os navegadores do Playwright:**
```bash
npx playwright install
```

---

## Executando os Testes

### Executar todos os testes
```bash
npm test
```
ou
```bash
npx playwright test
```

### Executar um arquivo de teste específico
```bash
npx playwright test tests/login.spec.js
```

### Executar testes em modo headed (com interface gráfica)
```bash
npx playwright test --headed
```

### Executar testes em um navegador específico
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Executar testes em modo debug
```bash
npx playwright test --debug
```

---

## Estrutura POM (Page Object Model)

### BasePage
Classe base que contém métodos comuns a todas as páginas:
- `goto(path)` - Navega para uma URL
- `waitForLoad()` - Aguarda o carregamento completo da página

### Pages (Page Objects)
Cada página da aplicação tem sua classe correspondente que herda de `BasePage`:

**HomePage.js**
- Métodos relacionados ao login e navegação inicial
- Exemplo: `doLogin(username, password)`, `validateUserIsLoggedIn()`

**ProductPage.js**
- Métodos relacionados a produtos
- Exemplo: `selectProduct()`, `validateProductTitleIsVisible()`, `getProductName()`

### Selectors
Arquivos que centralizam todos os seletores CSS/XPath:

**homeSelectors.js**
- Seletores da página de login/home
- Exemplo: `usernameInput`, `passwordInput`, `loginButton`

**productSelectors.js**
- Seletores da página de produtos
- Exemplo: `productName`, `productPrice`, `addToCartButton`

### Config
Arquivos de configuração e dados de teste:

**credentials.js**
- Credenciais centralizadas para evitar repetição
- Exemplo: `CREDENTIALS.USERS.STANDARD`, `CREDENTIALS.PASSWORD`

---

## Criando Novos Testes

### 1. Criar o arquivo de teste
Crie um novo arquivo em `tests/` com o padrão `*.spec.js`:

```javascript
import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage.js";
import { CREDENTIALS } from "../src/config/credentials.js";

test.describe("Nome da Suite de Testes", () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto("/");
  });

  test("Descrição do teste", async ({ page }) => {
    // Seu teste aqui
  });
});
```

### 2. Adicionar seletores (se necessário)
Adicione novos seletores no arquivo correspondente em `src/selectors/`:

```javascript
export const meuSelectors = {
  meuElemento: "#meu-id",
  outroElemento: ".minha-classe"
};
```

### 3. Adicionar métodos na Page Object (se necessário)
Adicione novos métodos na classe correspondente em `src/pages/`:

```javascript
async meuMetodo() {
  await this.page.locator(meuSelectors.meuElemento).click();
}
```

---

## Boas Práticas

### Faça
- Use `test.describe()` para agrupar testes relacionados
- Use `test.beforeEach()` para setup comum entre testes
- Centralize credenciais e dados de teste em arquivos de config
- Use seletores por `data-test` quando disponível
- Mantenha os testes independentes (cada teste deve poder rodar isoladamente)
- Use nomes descritivos para testes e métodos

### Evite
- Hardcode de valores (use constantes/config)
- Seletores frágeis (prefira `data-test` ou IDs estáveis)
- Repetição de código (extraia para métodos reutilizáveis)
- Testes dependentes uns dos outros
- Seletores muito específicos que quebram facilmente

### Exemplo de Teste Bem Estruturado

```javascript
test.describe("Login Tests", () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto("/");
  });

  test("Realiza login com usuário Standard", async ({ page }) => {
    await home.doLogin(CREDENTIALS.USERS.STANDARD, CREDENTIALS.PASSWORD);
    await home.validateUserIsLoggedIn();
  });
});
```

---

## Relatórios

### Relatório HTML
Após executar os testes, um relatório HTML é gerado automaticamente:

```bash
npx playwright show-report
```

O relatório contém:
- Status de cada teste (passou/falhou)
- Screenshots de falhas
- Vídeos de execução (quando configurado)
- Timeline de execução
- Logs detalhados

### Screenshots e Vídeos
- Screenshots são capturados automaticamente em caso de falha
- Vídeos são gravados apenas em caso de falha (configurado no `playwright.config.js`)
- Ambos são salvos em `test-results/`

---

## Configuração do Playwright

O arquivo `playwright.config.js` contém as configurações principais:

- **baseURL**: URL base da aplicação (https://www.saucedemo.com/)
- **headless**: Execução sem interface gráfica (padrão: true)
- **screenshot**: Captura de screenshots (only-on-failure)
- **video**: Gravação de vídeos (retain-on-failure)
- **reporter**: Formatos de relatório (HTML e lista)

## GitHub Actions

Cada execução do workflow `CI - Playwright Tests` publica o relatório HTML como artifact pelo step `Upload test results`. Para facilitar o acesso ao link de download do report após o Job finalizar, siga os passos abaixo:
1. Acesse o run do GitHub Actions.
2. Abra a aba **Summary** e clique no título “Playwright report” para ir direto ao artifact.
3. Em **Artifacts**, clique em `playwright-report` para baixar o HTML completo dos testes.
