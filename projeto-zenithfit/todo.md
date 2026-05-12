# ZenithFit: Live Coaching - TODO

## Core Features

### Home Screen (Tela Inicial)
- [x] Implementar layout principal com SafeArea
- [x] Criar campo de texto estilizado para "Código da Aula"
- [x] Validar entrada de código (mínimo 3 caracteres)
- [x] Implementar botão "Iniciar Treino" com feedback haptic
- [x] Criar cronômetro de descanso funcional (MM:SS)
- [x] Adicionar controles do cronômetro (Play/Pause/Reset)
- [x] Implementar notificação ao terminar o cronômetro

### Video Call Integration (Jitsi Meet)
- [x] Integrar SDK do Jitsi Meet (react-native-jitsi-meet ou similar)
- [x] Criar tela de videoconferência
- [x] Implementar controles de câmera e microfone
- [x] Adicionar botão "End Call" com retorno à Home
- [x] Testar conexão com sala de teste

### Settings Screen
- [ ] Criar tela de configurações
- [ ] Adicionar campo para nome do usuário
- [ ] Implementar preferências de áudio/vídeo
- [ ] Adicionar informações sobre o app

### UI/UX Polish
- [ ] Aplicar Material 3 design tokens
- [ ] Implementar dark mode
- [ ] Adicionar animações sutis
- [ ] Testar responsividade em diferentes tamanhos

## Native Android Files
- [ ] Gerar build.gradle (Kotlin DSL) com dependências Jitsi
- [ ] Criar AndroidManifest.xml com permissões (Câmera, Microfone)
- [ ] Escrever MainActivity.kt completo
- [ ] Configurar ProGuard/R8 rules para Jitsi

## Documentation
- [ ] Escrever README.md com proposta de valor
- [ ] Adicionar instruções de instalação
- [ ] Documentar como usar o cronômetro
- [ ] Adicionar screenshots/GIFs

## Testing
- [ ] Testar fluxo de entrada de código
- [ ] Testar cronômetro (iniciar, pausar, resetar)
- [ ] Testar conexão de vídeo com Jitsi
- [ ] Testar em dispositivos iOS e Android
- [ ] Testar no Expo Go

## Deployment
- [ ] Criar checkpoint inicial
- [ ] Gerar QR Code para preview
- [ ] Preparar para publicação
