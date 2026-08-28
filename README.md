# TIER Nexo IA

Plataforma demonstrativa de inteligência pedagógica para professores, coordenadores e gestores escolares. O produto organiza planejamento, banco de questões, avaliações, adaptações, acompanhamento de estudantes, reuniões, biblioteca e relatórios em um único ambiente navegável.

## Executar localmente

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal. Para validar a versão de produção:

```bash
npm run build
npm test
```

## Perfis de demonstração

- **Professor:** Mariana Costa — Matemática, turmas 5101, 6101 e 6201.
- **Coordenador:** Rafael Almeida — Ensino Fundamental.
- **Gestor:** Carla Menezes — Colégio Demonstração TIER.

Não há autenticação real. A tela de entrada aceita qualquer e-mail válido e senha com quatro ou mais caracteres.

## Arquitetura

- `app/components`: aplicação e componentes reutilizáveis.
- `app/data`: dados brasileiros fictícios centralizados.
- `app/services`: repositório local e simulações assíncronas.
- `app/types`: tipos de domínio.
- `app/globals.css`, `app/product.css` e `app/modules.css`: sistema visual responsivo e impressão.

As telas consomem a interface de repositório em `app/services/repository.ts`, e não os mocks diretamente para operações de escrita. Os dados alterados durante a demonstração são persistidos em `localStorage`.

## Funcionalidades simuladas

- Login, onboarding e troca de perfil com menus e painéis adaptados.
- Copiloto com contexto selecionável, etapas de processamento e respostas estruturadas.
- CRUD local de questões, geração de variações, importação assistida e análise de qualidade.
- Wizard de avaliação em sete etapas, versões A–D, adaptações, prova, gabarito e resolução.
- Passaporte de Aprendizagem, observações separadas por fato/interpretação/ação/resultado e planos de acompanhamento.
- Planos de aula, atividades, reuniões, conselho de classe, mensagens em rascunho, biblioteca, relatórios e configurações.
- Busca global, filtros combináveis, ordenação visual, paginação, modais, toasts, estados vazios, carregamento e impressão.

## Próxima etapa

Autenticação, autorização no servidor, banco relacional, arquivos, IA real, auditoria, criptografia, consentimentos, integrações escolares e exportações reais serão conectados sem reconstruir a interface. Veja [BACKEND_ROADMAP.md](./BACKEND_ROADMAP.md).

Todos os nomes e registros são fictícios. Sugestões geradas sempre exigem revisão do profissional.
