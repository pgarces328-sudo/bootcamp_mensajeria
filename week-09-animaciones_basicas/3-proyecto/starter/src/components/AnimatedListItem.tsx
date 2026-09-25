import React, {
  useEffect,
  useRef,
} from 'react';
import { Animated } from 'react-native';

export function AnimatedListItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}): React.JSX.Element {
  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const translateY = useRef(
    new Animated.Value(24)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: Math.min(index, 8) * 60,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: Math.min(index, 8) * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}