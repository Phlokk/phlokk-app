import React, { useRef, useState } from "react";
import { Animated, Easing } from "react-native";

import { useEffectNonInitial } from "../hooks/useEffectNonInitial";

function AnimatedVisibilityView({
  isVisible = true,
  fadeInDuration = 200,
  fadeOutDuration = 200,
  animationDelay = 0,
  children,
  style,
  maxOpacity = 1,
}) {
  const opacityAnim = useRef(
    new Animated.Value(isVisible ? maxOpacity : 0)
  ).current;
  const [pointerEvents, setPointerEvents] = useState(
    isVisible ? "auto" : "none"
  );

  useEffectNonInitial(() => {
    Animated.timing(opacityAnim, {
      toValue: isVisible ? maxOpacity : 0,
      duration: isVisible ? fadeInDuration : fadeOutDuration,
      useNativeDriver: true,
      delay: animationDelay,
      easing: Easing.out(Easing.quad),
    }).start();

    if (isVisible) {
      setPointerEvents("auto");
    } else {
      setPointerEvents("none");
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[{ opacity: opacityAnim }, style]}
      pointerEvents={pointerEvents}
    >
      {children}
    </Animated.View>
  );
}
export default AnimatedVisibilityView;
