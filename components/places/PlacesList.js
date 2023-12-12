import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const renderPlaceItem = (itemData) => {
    return <PlaceItem place={itemData.data} />;
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaceItem}
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});