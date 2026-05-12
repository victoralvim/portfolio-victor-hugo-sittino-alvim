import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { RestTimer } from "@/components/rest-timer";

export default function HomeScreen() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidCode = roomCode.trim().length >= 3;

  const handleStartTraining = async () => {
    if (!isValidCode) {
      Alert.alert("Código Inválido", "O código da aula deve ter pelo menos 3 caracteres.");
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Navigate to video call screen with room code
      router.push({
        pathname: "./video-call",
        params: { roomCode: roomCode.trim() },
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar à aula. Tente novamente.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 gap-8 justify-between py-4">
          {/* Header Section */}
          <View className="gap-4">
            {/* Logo & Title */}
            <View className="gap-2 items-center">
              <Text className="text-5xl font-bold text-primary">⚡</Text>
              <Text className="text-3xl font-bold text-foreground">ZenithFit</Text>
              <Text className="text-lg font-semibold text-primary">Live Coaching</Text>
              <Text className="text-sm text-muted text-center mt-2">
                Treinos personalizados remotos com instrutor ao vivo
              </Text>
            </View>

            {/* Room Code Input Section */}
            <View className="gap-3 mt-6">
              <Text className="text-sm font-semibold text-foreground">Código da Aula</Text>
              <View className="flex-row items-center gap-2 px-4 py-3 bg-surface border-2 border-border rounded-xl">
                <Text className="text-xl text-primary">🔐</Text>
                <TextInput
                  className="flex-1 text-foreground font-medium text-base"
                  placeholder="Digite o código da aula"
                  placeholderTextColor="#687076"
                  value={roomCode}
                  onChangeText={setRoomCode}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  editable={!isLoading}
                  returnKeyType="done"
                  onSubmitEditing={handleStartTraining}
                />
                {isValidCode && (
                  <Text className="text-lg text-success">✓</Text>
                )}
              </View>
              <Text className="text-xs text-muted">
                Mínimo 3 caracteres. Solicite ao seu instrutor.
              </Text>
            </View>

            {/* Start Training Button */}
            <Pressable
              onPress={handleStartTraining}
              disabled={!isValidCode || isLoading}
              style={({ pressed }) => [
                {
                  opacity: !isValidCode || isLoading ? 0.5 : pressed ? 0.9 : 1,
                  transform: [{ scale: pressed && isValidCode && !isLoading ? 0.97 : 1 }],
                },
              ]}
              className="py-4 px-6 bg-primary rounded-xl items-center justify-center gap-2"
            >
              <Text className="text-lg font-bold text-background">
                {isLoading ? "Conectando..." : "Iniciar Treino"}
              </Text>
              {!isLoading && <Text className="text-base">▶️</Text>}
            </Pressable>

            {/* Info Card */}
            <View className="p-4 bg-surface border border-border rounded-xl gap-2">
              <Text className="text-sm font-semibold text-foreground">💡 Dica</Text>
              <Text className="text-xs text-muted leading-relaxed">
                Use o cronômetro de descanso abaixo para controlar seus intervalos entre as séries durante o treino.
              </Text>
            </View>
          </View>

          {/* Rest Timer Section */}
          <View className="gap-4">
            <RestTimer />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
