# 🛩️ Batalha de Modelos & Engenharia de Prompt (XML)

> Projeto desenvolvido para a disciplina de **Engenharia de Prompt e Aplicações em IA**, com o objetivo de comparar o desempenho de diferentes modelos de linguagem a partir de um mesmo prompt estruturado em XML.

---

## 👥 Equipe

- Victor Hugo Sittino Alvim  
- Larissa Ferreira da Silva  
- Leticia Gabrielly Pozzi Egea Campos  

---

## 🎯 Objetivo

Construir um **prompt estruturado em XML** capaz de gerar uma página HTML Single Page com CSS integrado, e então testá-lo em múltiplos modelos de IA para avaliar e comparar os resultados produzidos.

---

## 📋 O Prompt

O prompt foi escrito em XML com as seguintes especificações:

```xml
<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo>
  <tema>[FORÇA AÉREA BRASILEIRA]</tema>
  <diretrizes_design>
    <layout>Responsivo e minimalista.</layout>
    <paleta_cores>[AZUL]</paleta_cores>
    <tipografia>Sans-serif para títulos, Serif para corpo.</tipografia>
  </diretrizes_design>
  <obrigatoriedades_tecnicas>
    <item>Menu de navegação funcional (âncoras).</item>
    <item>Seção de portfólio ou galeria.</item>
    <item>Rodapé com informações de contato simuladas.</item>
    <item>Ferramenta de alistamento para facilitar a inscrição de conscritos,
    baseada em formulário padrão com medidas corporais, saúde física e psicológica.</item>
  </obrigatoriedades_tecnicas>
  <metrica_obrigatoria>
    Ao final da resposta, informe uma estimativa de quantos tokens foram gerados para este código.
  </metrica_obrigatoria>
</tarefa>
```

---

## 🤖 Modelos Avaliados

ChatGPT, Gemini, DeepSeek, Qwen, Grok, Maritaca e Claude.

---

## 📊 Quadro Comparativo

| Critério | GPT | Gemini | DeepSeek | Qwen | Grok | Maritaca | Claude |
|---|---|---|---|---|---|---|---|
| **Precisão do Prompt** | 6 | 7,5 | 6 | 8 | 9 | 9 | 8 |
| **Precisão do HTML** | 9 | 8 | 6,5 | 8,5 | 6 | 6 | 8 |
| **Criatividade Visual** | 3 | 6 | 6 | 6 | 7 | 4 | 9 |
| **Erros de Sintaxe** | 7 | 7 | 7 | 7 | 6 | 5 | 7 |
| **Tokens Gastos** | 1.100 | 1.950 | 4.200 | 1.420 | 4.850 | 1.250 | 4.800 |

### Observações por modelo

**GPT:** Fiel ao prompt, mas a página não ficou responsiva. Poucos elementos visuais prejudicaram o design. Imagens não anexadas.

**Gemini:** Não implementou a galeria. Design muito básico. Imagens não anexadas.

**DeepSeek:** Executou além do solicitado e apresentou alucinações em algumas partes. Usou apenas emojis como elementos visuais. Imagens não anexadas.

**Qwen:** Implementou a galeria de forma incompleta. Design básico. Não usou o atributo `required` no formulário. Imagens não anexadas.

**Grok:** Fiel ao prompt, mas com erros na distribuição dos elementos e no tamanho de alguns componentes. Usou emojis como elementos visuais.

**Maritaca:** Colocou todos os elementos solicitados, exceto a galeria. Erros nos campos de preenchimento do formulário. Apenas adicionou CSS ao HTML, sem criatividade visual.

**Claude:** Gerou coisas além do solicitado. Site visualmente agradável (nota 9 em criatividade). Faltaram campos obrigatórios no formulário e imagens não foram anexadas.

---

## 💡 Reflexão Crítica

**1. Qual modelo demonstrou maior compreensão da estrutura do prompt em XML?**  
Claude foi o modelo que melhor interpretou e respondeu à estrutura do prompt XML.

**2. Houve diferença significativa na verbosidade (tokens) entre os modelos?**  
Sim. O Grok consumiu quase a mesma quantidade de tokens que o Claude (4.850 vs 4.800) e entregou um resultado inferior, o que indica que quantidade de tokens não é indicativo direto de qualidade.

**3. Qual ferramenta escolheria para prototipagem rápida e qual para códigos mais complexos?**  
Para ambos os casos, a escolha da equipe foi **Claude**, pela combinação de fidelidade ao prompt, qualidade visual e capacidade de lidar com estruturas mais elaboradas.

---

## 🧠 Aprendizados

- Prompts estruturados em XML ajudam a organizar requisitos complexos, mas a interpretação varia entre modelos.
- A quantidade de tokens gerados não se correlaciona diretamente com a qualidade do output.
- Nenhum modelo conseguiu anexar imagens reais; todos usaram placeholders, o que é uma limitação inerente à geração de HTML estático por LLMs.
- A criatividade visual foi o critério com maior variação entre os modelos: Claude se destacou, enquanto GPT e Maritaca ficaram atrás.

---

## 🗂️ Estrutura do Repositório

```
📁 batalha-de-modelos-prompt-xml/
├── README.md
├── prompts/
│   └── prompt_fab.xml          # Prompt original utilizado no teste
├── outputs/
│   ├── output_chatgpt.html
│   ├── output_gemini.html
│   ├── output_deepseek.html
│   ├── output_qwen.html
│   ├── output_grok.html
│   ├── output_maritaca.html
│   └── output_claude.html
└── docs/
    └── analise_comparativa.pdf # Relatório original da experiência
```

---

## 🛠️ Tecnologias Envolvidas

- HTML5 e CSS3 (outputs gerados)
- XML (estrutura do prompt)
- Modelos de linguagem: GPT, Gemini, DeepSeek, Qwen, Grok, Maritaca, Claude

---

## 📄 Licença

Projeto acadêmico. Livre para uso educacional com atribuição aos autores.
