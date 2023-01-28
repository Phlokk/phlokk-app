import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import colors from "../../../config/colors";
import LinearGradient from "react-native-linear-gradient";

const images = [
  {
    url: "https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
    link: "user profile",
  },
  {
    url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
  },

  {
    url: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2889&q=80",
  },
];

const ImageCarousel = ({ containerStyle, autoScrollInterval = 5000 }) => {
  const [imageWidth, setImageWidth] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isFocused = useIsFocused();
  const autoScrollTimerRef = useRef();
  const flatListRef = useRef();
  const userScrollRef = useRef(false);

  const scrollToNextImage = () => {
    setSelectedIndex((previous) => {
      const nextIndex = previous + 1;
      if (nextIndex > images.length - 1) {
        return 0;
      }
      return previous + 1;
    });
  };

  useEffect(() => {
    if (userScrollRef.current === true) {
      return;
    }
    flatListRef.current.scrollToOffset({ offset: selectedIndex * imageWidth });
  }, [selectedIndex]);

  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        if (userScrollRef.current === true) {
          return;
        }
        scrollToNextImage();
      }, autoScrollInterval);
      autoScrollTimerRef.current = interval;
    } else {
      clearInterval(autoScrollTimerRef.current);
    }

    return () => {
      clearInterval(autoScrollTimerRef.current);
    };
  }, [isFocused]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable onPress={() => console.log("pressed", item.link)}>
        <Image
          style={[styles.images, { width: imageWidth }]}
          source={{ uri: item.url }}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  const renderDot = ({ index }) => {
    return (
      <Entypo
        style={{ opacity: selectedIndex === index ? 1 : 0.3 }}
        name="dot-single"
        size={24}
        color={colors.white}
      />
    );
  };

  return (
    <View
      onLayout={({ nativeEvent }) => setImageWidth(nativeEvent.layout.width)}
      style={[styles.container, containerStyle]}
    >
      <FlatList
        data={images}
        ref={flatListRef}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const newIndex = Math.round(nativeEvent.contentOffset.x / imageWidth);
          setSelectedIndex(newIndex);
          userScrollRef.current = false;
        }}
        onScrollBeginDrag={() => {
          userScrollRef.current = true;
        }}
        style={styles.carousel}
      />
      <View style={styles.bottomGradientWrapper}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View style={styles.dotsWrapper}>
        <FlatList
          data={images}
          renderItem={renderDot}
          keyExtractor={(item, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
  },
  dotsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  carousel: {
    flex: 1,
    width: "100%",
  },
  images: {
    flex: 1,
    borderRadius: 15, 
  },
  bottomGradientWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
});

export default ImageCarousel;
