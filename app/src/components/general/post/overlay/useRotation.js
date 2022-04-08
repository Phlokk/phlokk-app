import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function useRotation() {
    const animation = useRef(new Animated.Value(0)).current;

    function startAnimation() {
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.delay(0),
          ],
          { useNativeDriver: true })
          .start(() => {
            animation.setValue(0);
            startAnimation();
        });
    }

    useEffect(() => {
        startAnimation();
    }, []);

    //interpolate
    const rotateInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return rotateInterpolation;
}