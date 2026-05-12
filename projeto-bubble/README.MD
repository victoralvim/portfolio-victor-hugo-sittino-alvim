# 🏗️ Gestão de Orçamentos: Bubble.io + Boas Práticas de Engenharia de Software

## 🎯 Objetivo
Desenvolver uma aplicação web de gestão utilizando a Inteligência Artificial do Bubble como acelerador, aplicando rigorosamente os fundamentos de engenharia de software para garantir segurança, escalabilidade e governança.

## 🔗 Link da Aplicação
[Acessar Versão de Teste](https://victrosittino-35167.bubbleapps.io/version-test?debug_mode=true)

---

## 📚 Metodologia e Boas Práticas Aplicadas

### 1. Análise Crítica e Atuação Humana
- **IA como Rascunho:** A inteligência artificial foi utilizada apenas para gerar o *Blueprint* inicial. A engenharia de software real ocorreu na refatoração.
- **Auditoria de Código:** Lógicas confusas de permissão e "visões de colaborador" geradas pela IA foram descartadas e reescritas manualmente para evitar falhas estruturais.

### 2. Arquitetura e Modelagem de Dados
- **Planejamento Prévio (Out-of-Bubble):** Estrutura de banco de dados documentada antes do desenvolvimento visual.
- **Otimização de Relações:** Referenciamento direto entre tabelas (ex: campo no `Orçamento` apontando para o `Cliente`). A regra estrita de evitar listas de dados em entidades pai (que possam ultrapassar 100 itens) foi aplicada.
- **Prevenção de Hardcode (Option Sets):** Criação de conjuntos de opções para *Status* (ex: Pendente, Aprovado, Rejeitado), eliminando strings soltas nas condições do sistema. Nenhum dado sensível foi exposto nesses conjuntos.

### 3. Refatoração Front-end e Lógica
- **Layout Responsivo:** Correção da interface gerada pela IA utilizando conceitos fundamentais de Flexbox (Row, Column, Alignments).
- **Workflows:** Substituição de dados estáticos nas lógicas de salvamento por variáveis dinâmicas padronizadas (Option Sets).

### 4. Segurança e Privacidade (Privacy by Design)
- **Mitigação OWASP Top 10:** Remoção imediata da regra padrão `Publicly visible` de todas as tabelas sensíveis geradas pela IA.
- **Isolamento de Dados:** Implementação da regra estrita `This Orçamento's Creator is Current User` na aba *Data > Privacy*. Isso impede o vazamento de dados no lado do cliente e garante que um usuário só encontre e visualize seus próprios registros.

### 5. Desempenho e Otimização de Custos
- **Eficiência de Buscas (WUs):** Consultas ao banco de dados (`Do a search for`) foram restritas aos elementos de lista (*Repeating Groups*). Consultas em células individuais foram eliminadas para evitar o crescimento exponencial no consumo de Workload Units da plataforma.
- **Controle de APIs:** Configuração de limites técnicos (`max_tokens`) em integrações externas para proteger o sistema contra custos abusivos derivados de requisições excessivas ou maliciosas.

### 6. Governança e Controle (Anti-Shadow IT)
- **Organização Visual:** Ações na aba de Workflows foram categorizadas por cores (ex: Verde para Sucesso/Navegação, Vermelho para Exclusão de Dados).
- **Documentação In-Platform:** Utilização rigorosa do recurso *Notes* para documentar o objetivo de cada fluxo de trabalho complexo, eliminando o efeito "caixa preta" e facilitando a transição do projeto para outros engenheiros.

### 7. Gestão de Limitações e Estratégia de Saída (Vendor Lock-in)
Devido à natureza *lock-in* do Bubble (retenção do código-fonte), a seguinte estratégia de saída foi definida:
> Em caso de necessidade de migração para um ecossistema tradicional (como React e Node.js/Python), a extração dos dados será feita através da habilitação da **Data API nativa do Bubble**. Os dados de usuários e tabelas relacionais (como Orçamentos e Clientes) serão exportados via requisições REST/JSON, garantindo a integridade e portabilidade das informações da base de dados para o novo banco (SQL ou NoSQL).

---

## ✅ Checklist de Entrega

- [x] **Link da Aplicação:** Versão de teste disponível e com isolamento de usuários operante.
- [ ] **Rascunho do Banco de Dados:** Mapeamento visual das tabelas, relações e Option Sets. *(Adicionar print/link aqui)*
- [ ] **Comprovação de Segurança:** Print da aba *Data > Privacy* comprovando as regras de isolamento. *(Inserir imagem na pasta do repositório)*
- [ ] **Governança de Workflows:** Print mostrando a organização por cores e anotações explicativas. *(Inserir imagem na pasta do repositório)*
- [x] **Estratégia de Saída:** Documentada na seção 7.
