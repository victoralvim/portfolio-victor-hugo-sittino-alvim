# ZenithFit: Live Coaching - Guia de Desenvolvimento Android Nativo

## Proposta de Valor

**ZenithFit: Live Coaching** é um aplicativo Android de ponta para treinos personalizados remotos, conectando instrutores e alunos através de videoconferência em tempo real. A plataforma oferece uma experiência imersiva e profissional para sessões de coaching ao vivo, com interface Material 3 moderna e recursos práticos como cronômetro de descanso integrado.

### Diferenciais Principais

O aplicativo se destaca por sua abordagem centrada no usuário, oferecendo uma interface intuitiva que segue os padrões de design Material 3 do Android. O cronômetro de descanso integrado permite que alunos gerenciem seus intervalos entre séries de exercícios sem sair da aplicação. A integração com o Jitsi Meet fornece videoconferência de alta qualidade sem necessidade de servidores proprietários, garantindo privacidade e confiabilidade.

## Arquitetura Técnica

### Stack Tecnológico

| Componente | Tecnologia | Versão |
|-----------|-----------|--------|
| **Linguagem** | Kotlin | 1.9.0+ |
| **API Android** | Android SDK | 34 (compileSdk) |
| **Mínimo Suportado** | Android API | 24 (minSdk) |
| **Build System** | Gradle | 8.1.0 |
| **Videoconferência** | Jitsi Meet SDK | Latest |
| **UI Framework** | Material Design 3 | - |

### Estrutura de Diretórios

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/space/manus/zenithfit/live/coaching/
│   │       │   └── MainActivity.kt
│   │       ├── res/
│   │       │   ├── layout/
│   │       │   │   └── activity_main.xml
│   │       │   ├── values/
│   │       │   │   ├── colors.xml
│   │       │   │   └── strings.xml
│   │       │   └── drawable/
│   │       └── AndroidManifest.xml
│   ├── build.gradle.kts
│   └── proguard-rules.pro
├── build.gradle.kts
└── settings.gradle.kts
```

## Instalação e Configuração

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:

- **Android Studio** (versão 2023.1 ou superior)
- **Java Development Kit (JDK)** versão 11 ou superior
- **Android SDK** com API level 34 e ferramentas de build
- **Gradle** 8.1.0 ou superior

### Passos de Instalação

**1. Clonar o Repositório**

```bash
git clone https://github.com/seu-usuario/zenithfit-live-coaching.git
cd zenithfit-live-coaching/android
```

**2. Configurar Variáveis de Ambiente**

Configure as variáveis de ambiente do Android SDK:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**3. Instalar Dependências**

O Gradle baixará automaticamente todas as dependências ao compilar. As principais dependências incluem:

- **Jitsi Meet SDK**: Fornece a funcionalidade de videoconferência
- **AndroidX**: Bibliotecas de suporte modernas do Android
- **Material Design 3**: Componentes de UI seguindo Material Design

**4. Compilar o Projeto**

```bash
./gradlew clean build
```

**5. Executar em Emulador ou Dispositivo**

```bash
# Conectar dispositivo via USB ou iniciar emulador
./gradlew installDebug
```

## Configuração do Jitsi Meet

### Inicialização do SDK

O Jitsi Meet SDK é inicializado na classe `MainActivity` durante o `onCreate()`. A configuração padrão conecta ao servidor público `https://meet.jit.si`.

```kotlin
private fun initializeJitsiMeet() {
    val serverURL = URL(JITSI_SERVER_URL)
    val options = JitsiMeetConferenceOptions.Builder()
        .setServerURL(serverURL)
        .setFeatureFlag("chat.enabled", false)
        .setFeatureFlag("recording.enabled", false)
        .build()
    JitsiMeet.setDefaultConferenceOptions(options)
}
```

### Permissões Necessárias

O aplicativo requer as seguintes permissões, declaradas em `AndroidManifest.xml`:

| Permissão | Propósito |
|-----------|----------|
| `CAMERA` | Acesso à câmera para videoconferência |
| `RECORD_AUDIO` | Gravação de áudio do microfone |
| `INTERNET` | Conexão de rede para videoconferência |
| `ACCESS_NETWORK_STATE` | Verificação de conectividade |
| `MODIFY_AUDIO_SETTINGS` | Controle de áudio (mute/unmute) |
| `BLUETOOTH` | Suporte a dispositivos Bluetooth (fones) |

### Tratamento de Permissões

O aplicativo implementa verificação de permissões em tempo de execução:

```kotlin
private fun requestPermissionsIfNeeded() {
    val permissionsToRequest = requiredPermissions.filter {
        ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
    }.toTypedArray()

    if (permissionsToRequest.isNotEmpty()) {
        ActivityCompat.requestPermissions(this, permissionsToRequest, PERMISSION_REQUEST_CODE)
    }
}
```

## Fluxo de Uso

### 1. Tela Inicial

O usuário abre o aplicativo e vê a tela inicial com os seguintes elementos:

- **Logo e Título**: Branding do ZenithFit com ícone visual
- **Campo de Código da Aula**: Input validado para inserir o código de acesso
- **Botão Iniciar Treino**: Inicia a videoconferência após validação
- **Cronômetro de Descanso**: Ferramenta para gerenciar intervalos

### 2. Validação de Código

O código deve ter no mínimo 3 caracteres. O aplicativo valida a entrada antes de permitir a conexão:

```kotlin
if (roomCode.length < 3) {
    Toast.makeText(this, "O código deve ter pelo menos 3 caracteres", Toast.LENGTH_SHORT).show()
    return
}
```

### 3. Iniciar Videoconferência

Ao tocar em "Iniciar Treino", o aplicativo:

1. Valida o código da aula
2. Verifica permissões de câmera e microfone
3. Cria opções de conferência com o código fornecido
4. Inicia a atividade `JitsiMeetActivity`

```kotlin
private fun startVideoCall(roomCode: String) {
    val options = JitsiMeetConferenceOptions.Builder()
        .setRoom(roomCode)
        .setAudioMuted(false)
        .setVideoMuted(false)
        .build()
    JitsiMeetActivity.launch(this, options)
}
```

### 4. Gerenciar Chamada

Durante a videoconferência, o usuário pode:

- **Mutar/Desmutar Áudio**: Controle de microfone
- **Ativar/Desativar Câmera**: Controle de vídeo
- **Encerrar Chamada**: Retorna à tela inicial

## Cronômetro de Descanso

O cronômetro integrado oferece funcionalidades para gerenciar intervalos de descanso:

### Características

- **Entrada Personalizável**: Define tempo em segundos
- **Controles Simples**: Play, Pause e Reset
- **Feedback Haptic**: Vibração ao terminar
- **Notificação Visual**: Indicador de status

### Implementação React Native

O componente `RestTimer` está implementado em `components/rest-timer.tsx` com:

- Estado gerenciado com `useState`
- Efeito de intervalo com `useEffect`
- Feedback haptic com `expo-haptics`
- Interface responsiva com Tailwind CSS

## Build e Otimização

### Configuração de Release

O arquivo `build.gradle.kts` configura otimizações para build de release:

```kotlin
release {
    isMinifyEnabled = true
    isShrinkResources = true
    proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
    )
}
```

### ProGuard Rules

O arquivo `proguard-rules.pro` protege classes críticas:

- Jitsi Meet SDK
- React Native
- WebRTC
- Classes nativas do aplicativo

### Gerar APK

```bash
# Debug APK
./gradlew assembleDebug

# Release APK (assinado)
./gradlew assembleRelease
```

## Testes

### Testes Unitários

Execute testes com:

```bash
./gradlew test
```

### Testes de Instrumentação

Execute testes em dispositivo/emulador:

```bash
./gradlew connectedAndroidTest
```

### Verificação de Qualidade

```bash
# Lint
./gradlew lint

# Análise estática
./gradlew check
```

## Troubleshooting

### Problema: Jitsi Meet não inicia

**Solução**: Verifique se o servidor `https://meet.jit.si` está acessível. Teste a conectividade de rede.

### Problema: Permissões não concedidas

**Solução**: Certifique-se de que as permissões estão declaradas em `AndroidManifest.xml` e que o usuário as concede quando solicitado.

### Problema: Câmera/Microfone não funcionam

**Solução**: Verifique as permissões do dispositivo em Configurações > Apps > ZenithFit > Permissões.

### Problema: Build falha

**Solução**: Execute `./gradlew clean` e tente novamente. Verifique se o JDK 11+ está instalado.

## Próximos Passos

Para expandir o aplicativo, considere:

- Implementar autenticação de usuários
- Adicionar histórico de aulas
- Integrar com backend para gerenciar salas
- Implementar notificações push
- Adicionar análise de desempenho
- Suporte a múltiplas idiomas

## Referências

- [Documentação Jitsi Meet SDK](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-android-sdk/)
- [Android Developers - Material Design 3](https://developer.android.com/develop/ui/compose/designsystems/material3)
- [Kotlin Documentation](https://kotlinlang.org/docs/)
- [Android Studio Guide](https://developer.android.com/studio/intro)

## Licença

Este projeto é fornecido como exemplo educacional. Consulte a licença do Jitsi Meet para detalhes sobre uso comercial.

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ usando Kotlin e Android SDK**
