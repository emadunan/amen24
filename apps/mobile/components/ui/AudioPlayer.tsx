import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, useColorScheme, Dimensions, I18nManager } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants';
import Slider from '@react-native-community/slider';

interface Props {
  bookId: string;
  bookKey: string;
  chapterNum: string;
}

const AudioPlayer: React.FC<Props> = ({ bookId, bookKey, chapterNum }) => {
  const isRTL = I18nManager.isRTL;
  const player = useAudioPlayer(`https://amen24.org/sound/chapters/${bookId.padStart(2, '0')}_${bookKey}__${chapterNum.padStart(3, '0')}.mp3`);
  const status = useAudioPlayerStatus(player);
  const screenWidth = Dimensions.get('window').width;

  const isPlaying = status.playing;
  const position = status.currentTime ?? 0;
  const duration = status.duration ?? 0;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (status.didJustFinish) {
      try {
        player.pause(); // In case it's still playing
        player.seekTo(0);
      } catch (err) {
        console.error("Reset after finish error:", err);
      }
    }
  }, [status.didJustFinish]);

  useEffect(() => {
    // When props (route params) change, stop and reset previous audio
    return () => {
      try {
        player.pause();
        player.seekTo(0);
      } catch (err) {
        console.error("Audio cleanup on param change:", err);
      }
    };
  }, [bookId, bookKey, chapterNum]);

  const handlePlayPause = () => {
    try {
      if (isPlaying) {
        player.pause();
      } else {
        const result = player.play();
      }
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  const handleStop = () => {
    try {
      player.pause();
      player.seekTo(0);
    } catch (err) {
      console.error("Audio stop error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: screenWidth, position: 'absolute', bottom: -19 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={val => player.seekTo(val)}
      />

      <View style={styles.controls}>
        <Pressable onPress={() => player.seekTo(Math.max(0, position - 10))}>
          <FontAwesome name={isRTL ? "forward" : "backward"} size={14} color={theme.primary} />
        </Pressable>

        <View style={styles.playPauseStop}>
          {/* <Pressable onPress={handleStop}>
            <FontAwesome6 name="circle-stop" size={20} color={theme.danger} />
          </Pressable> */}

          <Pressable onPress={handlePlayPause}>
            <FontAwesome6
              name={isPlaying ? 'circle-pause' : 'circle-play'}
              size={22}
              color={isPlaying ? theme.accent : theme.gray}
            />
          </Pressable>
        </View>

        <Pressable onPress={() => player.seekTo(Math.min(position + 10, duration))}>
          <FontAwesome name={isRTL ? "backward" : "forward"} size={14} color={theme.primary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  controls: {
    width: 78,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  playPauseStop: {
    flexDirection: "row",
    gap: 4
  }
});

export default AudioPlayer;
