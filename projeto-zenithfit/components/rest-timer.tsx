import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

interface RestTimerProps {
  className?: string;
}

export function RestTimer({ className }: RestTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState("60");

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Haptic feedback when timer ends
            if (prev === 1) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSetTime = () => {
    const newSeconds = Math.max(1, parseInt(inputValue) || 60);
    setTotalSeconds(newSeconds);
    setRemainingSeconds(newSeconds);
    setIsRunning(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePlayPause = () => {
    if (remainingSeconds > 0) {
      setIsRunning(!isRunning);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleReset = () => {
    setRemainingSeconds(totalSeconds);
    setIsRunning(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const progress = (totalSeconds - remainingSeconds) / totalSeconds;

  return (
    <View className={cn("items-center gap-6", className)}>
      {/* Timer Display */}
      <View className="items-center gap-4">
        <Text className="text-sm font-medium text-muted">Cronômetro de Descanso</Text>

        {/* Circular Progress Background */}
        <View className="relative w-48 h-48 items-center justify-center">
          {/* Background Circle */}
          <View className="absolute w-full h-full rounded-full bg-surface border-4 border-border" />

          {/* Progress Circle (simplified with opacity) */}
          <View
            className="absolute w-full h-full rounded-full border-4 border-primary opacity-30"
            style={{
              transform: [{ scaleY: progress }],
              transformOrigin: "center bottom",
            }}
          />

          {/* Time Display */}
          <View className="items-center gap-2">
            <Text className="text-6xl font-bold text-primary">
              {formatTime(remainingSeconds)}
            </Text>
            <Text className="text-xs text-muted uppercase tracking-widest">
              {isRunning ? "Em andamento..." : "Parado"}
            </Text>
          </View>
        </View>
      </View>

      {/* Input for Setting Time */}
      <View className="w-full max-w-xs gap-3">
        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-foreground font-medium"
            placeholder="Segundos"
            placeholderTextColor="#687076"
            keyboardType="number-pad"
            value={inputValue}
            onChangeText={setInputValue}
            editable={!isRunning}
          />
          <Pressable
            onPress={handleSetTime}
            disabled={isRunning}
            style={({ pressed }) => [
              {
                opacity: isRunning ? 0.5 : pressed ? 0.8 : 1,
              },
            ]}
            className="px-4 py-3 bg-primary rounded-lg items-center justify-center"
          >
            <Text className="text-background font-semibold text-sm">Definir</Text>
          </Pressable>
        </View>

        {/* Control Buttons */}
        <View className="flex-row gap-2">
          <Pressable
            onPress={handlePlayPause}
            disabled={remainingSeconds === 0}
            style={({ pressed }) => [
              {
                opacity: remainingSeconds === 0 ? 0.5 : pressed ? 0.8 : 1,
              },
            ]}
            className="flex-1 py-3 bg-success rounded-lg items-center justify-center"
          >
            <Text className="text-background font-semibold">
              {isRunning ? "Pausar" : "Iniciar"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleReset}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="flex-1 py-3 bg-border rounded-lg items-center justify-center"
          >
            <Text className="text-foreground font-semibold">Resetar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
