# 🏋️‍♂️ ZenithFit: Live Coaching

> **Treinos personalizados remotos com instrutor ao vivo. Conecte-se, treine e alcance seus objetivos fitness em tempo real.**

---

## 🎯 Proposta de Valor

O **ZenithFit** é a solução definitiva para o gap entre o treino solitário e a academia presencial. Projetado para oferecer uma experiência de estúdio em qualquer lugar, o app foca em baixa latência, privacidade e ferramentas utilitárias que realmente importam durante o exercício.

### Por que escolher o ZenithFit?
* **📡 Videoconferência de Alta Performance:** Integração robusta via Jitsi Meet SDK, garantindo fluidez sem quedas.
* **🎨 Design Material 3:** Interface limpa, moderna e com foco em acessibilidade (otimizada para uso com uma mão).
* **⏱️ Utilitários de Treino:** Cronômetro de descanso nativo e interativo para manter a intensidade.
* **🔒 Foco em Privacidade:** Sem rastreamento de dados, sem anúncios, sem complicações.
* **📱 Experiência Nativa:** Desenvolvido com React Native e Kotlin para performance superior em Android e iOS.

---

## 📱 Demonstração & Interface

Abaixo, a interface principal do aplicativo, focada na clareza visual e facilidade de entrada em sessões:

<div align="center">
  <img width="320" alt="ZenithFit Interface" src="https://github.com/user-attachments/assets/15d956e8-fcda-49b2-83ca-56410f6c77a5" />
</div>

### Fluxo de Experiência:
1.  **Acesso:** Digite o código da sala.
2.  **Conexão:** Clique em "Iniciar Treino".
3.  **Execução:** Treine com feedback em tempo real.
4.  **Recuperação:** Use o timer integrado nos intervalos.

---

## 🚀 Guia de Instalação Rápida

### ⚡ Opção A: Expo Go (Imediato)
Ideal para demonstrações rápidas sem instalação de arquivos.
1. Baixe o **Expo Go** na [App Store](https://apps.apple.com/app/expo-go/id982107779) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Escaneie o QR Code abaixo:
   ![QR Code ZenithFit](./assets/images/qrcode.png)
3. Ou acesse via [Preview Link](https://8081-iomi11zm1ougvqxc3wmbf-fab8edaa.us1.manus.computer).

### 🤖 Opção B: APK Nativo (Android)
Para performance máxima e uso contínuo.
1. [**Baixar APK v1.0.0**](https://vida-prod-webdev-app.s3.us-east-1.amazonaws.com/android-builds/310519663425744487/0fd829ab-6add-4aeb-99ce-bfc8682a98a1/zenithfit-live-coaching-v1_0_0.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZV3A2ECZO4N7RSPW%2F20260505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260505T013539Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=d27eca8d4bc5b302f4f309f0cf6a4f02516547f4c0ec5d6d6bc0a59171e29c19).
2. Habilite "Instalar de Fontes Desconhecidas".
3. Instale e comece seu treino.

---

## 🛠️ Stack Tecnológica & Arquitetura

O projeto utiliza o que há de mais moderno no ecossistema mobile para garantir manutenibilidade e escalabilidade.

| Camada | Tecnologia | Destaque |
| :--- | :--- | :--- |
| **Frontend** | React Native (Expo 54) | Agilidade no desenvolvimento multiplataforma. |
| **Linguagem** | TypeScript 5.9 | Tipagem estrita para evitar erros em tempo de execução. |
| **Estilização** | NativeWind (Tailwind CSS) | Design system responsivo e padronizado. |
| **Vídeo** | Jitsi Meet SDK | Criptografia ponta a ponta e alta escalabilidade. |
| **Nativo** | Kotlin (Android) | Módulos nativos para otimização de hardware. |

---

## 📁 Organização do Projeto

```text
app/                 # Rotas e navegação (Expo Router)
├── (tabs)/          # Telas principais (Home, Chamada de Vídeo)
components/          # Componentes reutilizáveis (Timer, Containers)
android/             # Customizações de nível nativo (Kotlin)
assets/              # Recursos visuais (Ícones, Imagens)
