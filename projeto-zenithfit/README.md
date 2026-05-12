# ZenithFit: Live Coaching

> **Treinos personalizados remotos com instrutor ao vivo. Conecte-se, treine e alcance seus objetivos fitness em tempo real.**

---

## 🎯 Proposta de Valor

**ZenithFit** é a plataforma definitiva para coaching fitness remoto, revolucionando a forma como instrutores e alunos se conectam. Diferentemente de outras soluções genéricas de videoconferência, o ZenithFit foi projetado especificamente para sessões de treino ao vivo, oferecendo:

- **Videoconferência de Alta Qualidade**: Integração nativa com Jitsi Meet, sem intermediários ou contas necessárias
- **Interface Material 3 Moderna**: Design intuitivo seguindo padrões iOS/Android, otimizado para uma mão
- **Cronômetro de Descanso Integrado**: Gerencia intervalos entre séries sem sair da aplicação
- **Privacidade Garantida**: Sem coleta de dados pessoais ou rastreamento
- **Multiplataforma**: iOS, Android e Web com experiência consistente
- **Sem Configuração Complexa**: Basta um código de aula para começar

---

## 📱 Demonstração

Veja o ZenithFit em ação:

<img width="400" height="711" alt="0504 (1)" src="https://github.com/user-attachments/assets/15d956e8-fcda-49b2-83ca-56410f6c77a5" />


**Fluxo Principal**:
1. Insira o código da aula fornecido pelo instrutor
2. Toque em "Iniciar Treino"
3. Conecte-se ao vivo com seu instrutor
4. Use o cronômetro integrado para gerenciar intervalos
5. Encerre a sessão quando terminar

---

## 🚀 Como Usar

### Opção 1: Expo Go (Recomendado para Teste Rápido)

**Pré-requisitos**: Smartphone com iOS ou Android

**Passos**:

1. **Instale o Expo Go**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escaneie o QR Code** abaixo ou acesse o link de preview

3. **Insira o código da aula** fornecido pelo seu instrutor

4. **Toque em "Iniciar Treino"** para conectar à videoconferência

5. **Gerenciar intervalos**: Use o cronômetro de descanso entre as séries

### Opção 2: APK Nativo (Instalação Permanente no Android)

**Pré-requisitos**: Dispositivo Android 7.0 ou superior

**Passos**:

1. **Baixe o APK** usando o link fornecido abaixo

2. **Abra o arquivo** no seu dispositivo Android

3. **Autorize a instalação** (pode ser necessário ativar "Instalar de fontes desconhecidas" em Configurações > Segurança)

4. **Aguarde a conclusão** da instalação

5. **Abra o aplicativo** e insira o código da aula

### Opção 3: Desenvolvimento Local

Para desenvolvedores que desejam modificar ou estender o aplicativo:

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/zenithfit-live-coaching.git
cd zenithfit-live-coaching

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Testar em dispositivo específico
pnpm android   # Android
pnpm ios       # iOS
```

---

## 👁️ Preview

### Escaneie para Testar Agora

Abra o **Expo Go** no seu smartphone e escaneie o QR Code abaixo:

![QR Code ZenithFit](./assets/images/qrcode.png)

**Ou acesse o link de preview no navegador**:

🔗 [https://8081-iomi11zm1ougvqxc3wmbf-fab8edaa.us1.manus.computer](https://8081-iomi11zm1ougvqxc3wmbf-fab8edaa.us1.manus.computer)

### Download do APK Nativo

Para instalar diretamente no Android sem Expo Go:

📥 **[Download APK - ZenithFit v1.0.0](https://vida-prod-webdev-app.s3.us-east-1.amazonaws.com/android-builds/310519663425744487/0fd829ab-6add-4aeb-99ce-bfc8682a98a1/zenithfit-live-coaching-v1_0_0.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZV3A2ECZO4N7RSPW%2F20260505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260505T013539Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=d27eca8d4bc5b302f4f309f0cf6a4f02516547f4c0ec5d6d6bc0a59171e29c19)** (Válido por 7 dias)

---

## 🎮 Funcionalidades Principais

### Tela Inicial

| Elemento | Descrição |
|----------|-----------|
| **Campo de Código** | Insira o código da aula fornecido pelo instrutor (mínimo 3 caracteres) |
| **Botão Iniciar** | Conecta-se à videoconferência com feedback haptic |
| **Cronômetro** | Gerencia intervalos de descanso com Play/Pause/Reset |
| **Validação** | Impede conexão com códigos inválidos |

### Tela de Videoconferência

| Controle | Função |
|----------|--------|
| **🎤 Mute/Unmute** | Ativa/desativa o microfone durante a aula |
| **📷 Câmera** | Ativa/desativa a câmera (seu vídeo local) |
| **📞 End Call** | Encerra a sessão e retorna à tela inicial |
| **Status** | Indicador visual de conectividade |

### Cronômetro de Descanso

- **Entrada Personalizável**: Define tempo em segundos
- **Controles**: Play, Pause, Reset
- **Feedback Haptic**: Vibração ao terminar o intervalo
- **Notificação Visual**: Indicador de status (em andamento/parado)

---

## 🛠️ Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Frontend** | React Native + Expo | 0.81 / 54 |
| **Linguagem** | TypeScript | 5.9 |
| **Styling** | NativeWind (Tailwind) | 4.0 |
| **Videoconferência** | Jitsi Meet SDK | Latest |
| **Nativo Android** | Kotlin | 1.9.0 |
| **Build System** | Gradle | 8.1.0 |

---

## 📋 Telas & Fluxo

### Fluxo Principal do Usuário

```
┌─────────────────┐
│  Home Screen    │
│ (Código + Timer)│
└────────┬────────┘
         │ Insere código válido
         │ Toca "Iniciar"
         ▼
┌─────────────────┐
│  Video Call     │
│  (Jitsi Meet)   │
└────────┬────────┘
         │ Treina com instrutor
         │ Usa cronômetro
         │ Toca "End Call"
         ▼
┌─────────────────┐
│  Home Screen    │
│  (Retorna)      │
└─────────────────┘
```

---

## 🎨 Design System

### Paleta de Cores (Material 3)

A interface segue o Material Design 3 com cores otimizadas para fitness:

- **Primary** (#0A7EA4): Botões e destaques principais
- **Success** (#22C55E): Ações bem-sucedidas (cronômetro iniciado)
- **Error** (#EF4444): Estados de erro ou desconexão
- **Accent** (#FF6B35): Ênfase em elementos de fitness

### Tipografia

- **Headlines**: Bold (700) - Títulos e destaques
- **Body**: Regular (400) - Conteúdo principal
- **Inputs**: Medium (500) - Campos de entrada

---

## 📁 Estrutura do Projeto

```
zenithfit-live-coaching/
├── app/                          # Código React Native
│   ├── (tabs)/
│   │   ├── index.tsx             # Home Screen
│   │   └── video-call.tsx        # Video Call Screen
│   └── _layout.tsx
├── components/
│   ├── rest-timer.tsx            # Cronômetro de Descanso
│   └── screen-container.tsx      # Container com SafeArea
├── android/                      # Código Nativo Android
│   ├── app/src/main/
│   │   ├── java/.../MainActivity.kt
│   │   ├── res/layout/activity_main.xml
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
├── assets/images/                # Imagens e ícones
│   ├── icon.png
│   ├── qrcode.png
│   └── demo.gif
├── README.md                     # Este arquivo
├── NATIVE_ANDROID_README.md      # Guia Android detalhado
├── design.md                     # Plano de design
└── app.config.ts                 # Configuração Expo
```

---

## 🔐 Permissões Necessárias

O aplicativo solicita as seguintes permissões:

| Permissão | Motivo |
|-----------|--------|
| **Câmera** | Transmitir vídeo ao vivo para o instrutor |
| **Microfone** | Comunicação de áudio durante a aula |
| **Internet** | Conexão com servidor de videoconferência |
| **Bluetooth** | Suporte a fones e microfones sem fio |

---

## 📚 Documentação Adicional

Para informações mais detalhadas, consulte:

- **[NATIVE_ANDROID_README.md](./NATIVE_ANDROID_README.md)** - Guia completo para desenvolvimento Android nativo com Kotlin
- **[design.md](./design.md)** - Plano de design, arquitetura de interface e fluxos de usuário
- **[todo.md](./todo.md)** - Rastreamento de features implementadas e planejadas

---

## 🚀 Roadmap Futuro

- [ ] Autenticação de usuários com OAuth
- [ ] Histórico de aulas e estatísticas
- [ ] Gerenciamento de salas pelo instrutor
- [ ] Notificações push para lembretes
- [ ] Análise de desempenho e progresso
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com calendário
- [ ] Gravação de sessões (opcional)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte & Contato

- **Issues**: Abra uma issue no GitHub para bugs ou sugestões
- **Documentação**: Consulte [Jitsi Meet Docs](https://jitsi.github.io/handbook/) e [Expo Docs](https://docs.expo.dev/)
- **Email**: [victro.sittino@gmail.com]

---

## 📄 Licença

Este projeto é fornecido como exemplo educacional. O Jitsi Meet é licenciado sob Apache 2.0.

---

## 🙏 Agradecimentos

- **Jitsi Meet**: Plataforma de videoconferência de código aberto
- **Expo**: Framework para desenvolvimento mobile multiplataforma
- **React Native**: Framework para desenvolvimento mobile nativo
- **Material Design**: Sistema de design do Google

---

<div align="center">

[⬆ Voltar ao Topo](#zenithfit-live-coaching)

</div>
