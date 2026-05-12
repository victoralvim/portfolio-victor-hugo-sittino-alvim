# ZenithFit: Live Coaching - Design System

## Screen List

1. **Home Screen (Tela Inicial)** - Entrada principal do app
2. **Video Call Screen (Tela de Chamada)** - Videoconferência com Jitsi Meet
3. **Settings Screen (Tela de Configurações)** - Preferências do usuário

## Primary Content and Functionality

### Home Screen
- **Header**: Logo do ZenithFit + título "Live Coaching"
- **Room Code Input**: Campo de texto estilizado para inserir "Código da Aula"
  - Placeholder: "Digite o código da aula"
  - Validação: Mínimo 3 caracteres
  - Ícone: Cadeado (segurança)
- **Start Training Button**: Botão principal "Iniciar Treino"
  - Estado: Habilitado quando código é válido
  - Feedback: Haptic + animação de escala
- **Rest Timer**: Cronômetro de descanso funcional
  - Exibição: MM:SS
  - Controles: Play/Pause, Reset
  - Uso: Entre séries de exercícios
- **Quick Stats**: Cards com informações rápidas (opcional)

### Video Call Screen
- **Remote Video**: Vídeo do instrutor (Jitsi Meet)
- **Local Video**: Câmera do aluno (pequeno, canto inferior)
- **Controls**: Mute, Camera Toggle, End Call
- **Back Button**: Retornar à tela inicial

### Settings Screen
- **Display Name**: Nome do usuário
- **Preferences**: Áudio/Vídeo padrão
- **About**: Versão do app

## Key User Flows

### Flow 1: Iniciar Treino
1. Usuário abre o app → Home Screen
2. Insere código da aula no campo de texto
3. Toca "Iniciar Treino"
4. Validação do código
5. Abre Video Call Screen com Jitsi Meet
6. Conexão estabelecida com instrutor

### Flow 2: Usar Cronômetro de Descanso
1. Na Home Screen, usuário toca no cronômetro
2. Define tempo (ex: 60 segundos)
3. Toca Play para iniciar
4. Cronômetro conta regressivamente
5. Notificação/Haptic ao terminar

### Flow 3: Encerrar Chamada
1. Durante chamada de vídeo, toca "End Call"
2. Retorna à Home Screen
3. Cronômetro reseta automaticamente

## Color Choices

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primary** | #0A7EA4 (Azul Profissional) | Botões, destaques |
| **Background** | #FFFFFF (Light) / #151718 (Dark) | Fundo geral |
| **Surface** | #F5F5F5 (Light) / #1E2022 (Dark) | Cards, inputs |
| **Foreground** | #11181C (Light) / #ECEDEE (Dark) | Texto principal |
| **Muted** | #687076 (Light) / #9BA1A6 (Dark) | Texto secundário |
| **Success** | #22C55E | Conexão estabelecida |
| **Error** | #EF4444 | Erros, desconexão |
| **Accent (Fitness)** | #FF6B35 | Cronômetro, ênfase |

## Typography

- **Headlines**: Font Weight 700 (Bold)
- **Body**: Font Weight 400 (Regular)
- **Inputs**: Font Weight 500 (Medium)

## Interaction Patterns

- **Button Press**: Scale 0.97 + Haptic Light
- **Input Focus**: Border color → Primary, Shadow
- **Timer Running**: Pulsing animation (subtle)
- **Connection Status**: Indicator dot (verde = conectado, vermelho = desconectado)
