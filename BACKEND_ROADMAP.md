# Roadmap de backend — TIER Nexo IA

Esta primeira versão usa dados simulados e persistência local. A interface já depende de um contrato de repositório, permitindo substituir a implementação local por APIs mantendo os fluxos e componentes.

## 1. Identidade e controle de acesso

- Implementar autenticação institucional com recuperação de acesso e sessões seguras.
- Aplicar autorização no servidor por instituição, unidade, perfil, turma e tipo de dado.
- Isolar dados entre escolas e unidades; a matriz visual atual não representa segurança real.

## 2. Dados e arquivos

- Criar banco relacional com migrações, IDs estáveis, integridade referencial e exclusão lógica.
- Mapear escolas, usuários, turmas, matrículas, responsáveis, habilidades, questões, famílias, avaliações, versões, adaptações, observações, planos, reuniões, documentos e notificações.
- Adicionar armazenamento de arquivos com antivírus, limites, metadados, direitos de uso e URLs temporárias.
- Implementar importação real de PDF, Word, planilhas e imagens com fila de processamento.

## 3. Inteligência artificial

- Criar gateway de IA no servidor, sem expor chaves no navegador.
- Implementar versionamento de prompts, contexto autorizado, referências, moderação, limites e telemetria.
- Exigir revisão humana em conteúdo crítico e impedir envio, nota, diagnóstico ou decisão automática.
- Registrar entradas relevantes, modelo utilizado, resultado, edição humana e aprovação.

## 4. Privacidade, consentimento e auditoria

- Definir bases legais, consentimentos aplicáveis, retenção, anonimização e fluxos de atendimento ao titular.
- Criptografar dados em trânsito e em repouso e gerenciar segredos fora do código.
- Auditar criação, leitura sensível, alteração, arquivamento, aprovação e exportação.
- Aplicar políticas específicas a registros pedagógicos e contatos de responsáveis.

## 5. Integrações e documentos

- Integrar sistemas escolares por contratos versionados e sincronização idempotente.
- Gerar PDF e Word reais para provas, gabaritos, relatórios, pautas e atas.
- Adicionar impressão controlada, marca d'água, modelos institucionais e histórico de versões.
- Planejar leitura de cartão-resposta e revisão manual de inconsistências.

## 6. Operação

- Adicionar filas, retentativas, observabilidade, alertas e métricas de qualidade.
- Criar testes de contrato, integração, autorização, acessibilidade e recuperação de desastre.
- Migrar `tierRepository` para clientes HTTP por domínio, mantendo o contrato atual durante a transição.

Nada desta lista está implementado nesta demonstração.
