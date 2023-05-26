import { View, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import colors from "../../../config/colors";
import LinearGradient from "react-native-linear-gradient";

const ImageCarousel = ({
  carouselList,
  onCarouselItemPress,
  containerStyle,
  autoScrollInterval = 5000,
}) => {
  const [imageWidth, setImageWidth] = useState(1);
  const [imageHeight, setImageHeight] = useState(150);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const isFocused = useIsFocused();
  const autoScrollTimerRef = useRef();
  const flatListRef = useRef();
  const userScrollRef = useRef(false);

  const scrollToNextImage = () => {
    setSelectedIndex((previous) => {
      const nextIndex = previous + 1;

      if (nextIndex > carouselList.length - 1) {
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
    
    if(!carouselList){
      return;
    }
    if(carouselList.length === 0){
      return;
    }
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
  }, [isFocused, carouselList]);

  useEffect(() => {
    if (!carouselList) {
      return;
    }
    if (carouselList.length === 0) {
      return;
    }
    if (imageWidth === 1) {
      return;
    }
    try {
      const firstItem = carouselList[0];
      const originalHeight = firstItem.height;
      const originalWidth = firstItem.width;
      const ratio = originalHeight / originalWidth;
      const newHeight = imageWidth * ratio;
      setImageHeight(newHeight);
    } catch {
      setImageHeight(150);
    }
  }, [carouselList, imageWidth]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        disabled={!onCarouselItemPress}
        onPress={() => onCarouselItemPress(item)}
      >
        <Image
          style={[styles.images, { width: imageWidth }]}
          source={{ uri: item.carousel_url }}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  const renderDot = ({ index }) => {
    return (
      <Entypo
        style={{ opacity: selectedIndex === index ? 1 : 0.3, margin: -3 }}
        name="dot-single"
        size={24}
        color={colors.white}
      />
    );
  };

  return (
    <View
      onLayout={({ nativeEvent }) => setImageWidth(nativeEvent.layout.width)}
      style={[styles.container, containerStyle, { height: imageHeight }]}
    >
      <FlatList
        data={carouselList}
        ref={flatListRef}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
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
          data={carouselList}
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
