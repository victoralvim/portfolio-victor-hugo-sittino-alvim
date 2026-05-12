import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

export default function VideoCallScreen() {
  const router = useRouter();
  const { roomCode } = useLocalSearchParams<{ roomCode: string }>();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    // Simulate Jitsi connection
    const timer = setTimeout(() => {
      setIsConnecting(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    Alert.alert("Encerrar Chamada", "Deseja encerrar a chamada de vídeo?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Encerrar",
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (isConnecting) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-4 items-center">
          <ActivityIndicator size="large" color="#0A7EA4" />
          <Text className="text-lg font-semibold text-foreground">
            Conectando à aula...
          </Text>
          <Text className="text-sm text-muted">Código: {roomCode}</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4 gap-4">
      {/* Video Area */}
      <View className="flex-1 bg-surface rounded-2xl border border-border overflow-hidden items-center justify-center">
        <View className="gap-2 items-center">
          <Text className="text-6xl">📹</Text>
          <Text className="text-lg font-semibold text-foreground">
            Vídeo do Instrutor
          </Text>
          <Text className="text-sm text-muted">Aula: {roomCode}</Text>
        </View>
      </View>

      {/* Local Video Preview (Small) */}
      <View className="absolute bottom-32 right-4 w-24 h-32 bg-surface rounded-lg border border-border overflow-hidden items-center justify-center">
        <Text className="text-3xl">🎥</Text>
      </View>

      {/* Control Bar */}
      <View className="flex-row gap-3 justify-center pb-4">
        {/* Microphone Toggle */}
        <Pressable
          onPress={toggleMic}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className={`w-14 h-14 rounded-full items-center justify-center ${
            isMicOn ? "bg-primary" : "bg-error"
          }`}
        >
          <Text className="text-2xl">{isMicOn ? "🎤" : "🔇"}</Text>
        </Pressable>

        {/* Camera Toggle */}
        <Pressable
          onPress={toggleCamera}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className={`w-14 h-14 rounded-full items-center justify-center ${
            isCameraOn ? "bg-primary" : "bg-error"
          }`}
        >
          <Text className="text-2xl">{isCameraOn ? "📷" : "🚫"}</Text>
        </Pressable>

        {/* End Call */}
        <Pressable
          onPress={handleEndCall}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="w-14 h-14 rounded-full items-center justify-center bg-error"
        >
          <Text className="text-2xl">📞</Text>
        </Pressable>
      </View>

      {/* Status Indicator */}
      <View className="flex-row items-center justify-center gap-2 py-2">
        <View className="w-2 h-2 rounded-full bg-success" />
        <Text className="text-xs text-muted font-medium">Conectado ao vivo</Text>
      </View>
    </ScreenContainer>
  );
}
