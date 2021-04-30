import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

const NewsCarousel = ({ data, navigation, width, height, styles }) => {
  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          height: height * 0.3,
          marginBottom: 5,
        }}
        onPress={() =>
          navigation.navigate("NewsScreen", {
            id: parseInt(item.id),
          })
        }
      >
        <ParallaxImage
          source={{ uri: item.descriptionImage }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          {...parallaxProps}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            marginRight: 5,
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Carousel
      data={data}
      layout={"default"}
      renderItem={_renderItem}
      sliderWidth={width * 0.9}
      sliderHeight={width * 0.9}
      hasParallaxImages={true}
      itemWidth={width * 0.8}
    />
  );
};
export default NewsCarousel;
