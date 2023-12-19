import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

const PlacesList = ({ places }) => {
  const renderPlaceItem = (itemData) => {
    return <PlaceItem place={itemData.item} />;
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
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderPlaceItem}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
