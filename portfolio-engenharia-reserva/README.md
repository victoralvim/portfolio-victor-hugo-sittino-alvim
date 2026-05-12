<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

![AI Tool](https://img.shields.io/badge/AI_TOOL-GEMINI_AI_STUDIO-blue?style=for-the-badge&logo=google-gemini)
![Role](https://img.shields.io/badge/ROLE-AI_ASSISTED_DEVELOPER-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge)

</div>

# 📸 Pixen - Analisador de Metadados de Imagens

Este repositório contém a reconstrução funcional do aplicativo **Pixen**, desenvolvida através de uma abordagem de engenharia reversa visual assistida por Inteligência Artificial.

## 🚀 O Desafio

O objetivo desta atividade foi assumir o papel de um **Desenvolvedor de Software assistido por IA** para reconstruir um aplicativo completo a partir da observação de sua interface externa, sem acesso ao código-fonte original.

### Funcionalidades Implementadas:

- **Análise de Metadados:** Extração precisa de informações técnicas de imagens.
- **Upload de Arquivos:** Suporte para formatos `.jpg`, `.png`, `.gif`, `.tiff` e `.raw`.
- **Análise por URL:** Campo funcional para processar imagens via link externo.
- **FAQ Interativo:** Seção de perguntas frequentes com sistema de expansão (accordion).
- **Ecossistema de Ferramentas:** Atalhos para Gerador de QR Code, Leitor de QR Code e Conversor de Imagens para PDF.

---

## 🤖 Metodologia de Desenvolvimento

A reconstrução foi dividida em três etapas fundamentais, utilizando o **Google AI Studio** como motor de desenvolvimento:

### 1. Análise (Black-Box)

Exploração do webapp de referência para mapear todos os componentes visuais, estados de interação e regras de lógica de negócio presentes na interface.

### 2. Configuração (System Instructions)

Definição das diretrizes no Google AI Studio, onde o modelo **Gemini** foi instruído a atuar como um desenvolvedor Full-Stack, especificando a estrutura de arquivos (HTML, CSS e JS) e o comportamento esperado.

### 3. Construção e Validação

Geração iterativa do código e execução em ambiente de teste para garantir que a estética e a funcionalidade final fossem idênticas à referência original.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3 e JavaScript (ES6+).
- **IA Engine:** Google AI Studio (Gemini).
- **Ambiente:** Node.js.

## 💻 Como Executar Localmente

**Pré-requisitos:** Node.js instalado.

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Configure a API:**
    Defina sua `GEMINI_API_KEY` no arquivo `.env.local`.
3.  **Inicie o app:**
    ```bash
    npm run dev
    ```

---

<div align="center">
  <sub>Projeto desenvolvido por <b>Victor Hugo Sittino Alvim</b>.</sub>
</div>
