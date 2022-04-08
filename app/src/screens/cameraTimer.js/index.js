import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import colors from "../../../config/colors";

const screen = Dimensions.get("window");

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins, secs };
};

function CountdownTimerScreen() {
  const [remainingSecs, setRemainingSecs] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };


  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={toggle} style={styles.button}>
      <Text style={styles.timerText}>{`${secs}`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: colors.white,
    fontSize: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default CountdownTimerScreen;
