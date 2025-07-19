import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, useColorScheme, Dimensions, I18nManager } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants';
import Slider from '@react-native-community/slider';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  bookId: string;
  bookKey: string;
  chapterNum: string;
}

const ChapterAudioPlayer: React.FC<Props> = ({ bookId, bookKey, chapterNum }) => {
  const isFocused = useIsFocused();
  const isRTL = I18nManager.isRTL;
  const source = `https://amen24.org/sound/chapters/${bookId.padStart(2, '0')}_${bookKey}__${chapterNum.padStart(3, '0')}.mp3`;
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);
  const screenWidth = Dimensions.get('window').width;
  const theme = Colors[useColorScheme() ?? 'light'];

  // ✅ Reset progress when audio finishes
  useEffect(() => {
    if (status.didJustFinish, status.currentTime > 0) {
      player.pause();
      player.seekTo(0);
    }
  }, [status.didJustFinish]);

  // ✅ Mount/unmount logic based on screen focus
  useEffect(() => {
    if (isFocused) {
      console.log('🔄 Audio player mounted:', source);
    } else {
      console.log('♻️ Cleaning up audio...');
      player.pause();
      player.seekTo(0);
      player.remove();
    }
  }, [isFocused]);

  const handlePlayPause = () => {
    if (status.playing) player.pause();
    else player.play();
  };

  if (!isFocused) return null;

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: screenWidth, position: 'absolute', bottom: -19 }}
        minimumValue={0}
        maximumValue={status.duration ?? 0}
        value={status.currentTime ?? 0}
        onSlidingComplete={val => player.seekTo(val)}
      />

      <View style={styles.controls}>
        <Pressable onPress={() => player.seekTo(Math.max(0, status.currentTime - 10))}>
          <FontAwesome name={isRTL ? "forward" : "backward"} size={16} color={theme.primary} />
          {/* // size -> 18 */}
        </Pressable>

        <View style={styles.playPauseStop}>
          <Pressable onPress={handlePlayPause}>
            <FontAwesome6
              name={status.playing ? 'circle-pause' : 'circle-play'}
              size={24} // size -> 24
              color={status.playing ? theme.accent : theme.gray}
            />
          </Pressable>
        </View>

        <Pressable onPress={() => player.seekTo(Math.min((status.currentTime || 0) + 10, status.duration || 0))}>
          <FontAwesome name={isRTL ? "backward" : "forward"} size={16} color={theme.primary} />
          {/* // size -> 18 */}
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
    width: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  playPauseStop: {
    flexDirection: "row",
    gap: 4
  }
});

export default ChapterAudioPlayer;
