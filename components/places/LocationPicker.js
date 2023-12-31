import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "../../utils/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("route params are: ", route, route.params);
    const mapPickedLocation = route.params && {
      lat: route.params.pickedLat,
      long: route.params.pickedLong,
    };
    if (mapPickedLocation) {
      console.log("Inside if - map picked location: ", mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        // since google apis are not working because of billing account, we are using a pre-defined address.
        // const address = await getAddress(
        //   pickedLocation.lat,
        //   pickedLocation.long
        // );
        const address = "277 Bedford Avenue, Brooklyn, NY 11211, USA";
        onPickLocation({ ...pickedLocation, address: address });
      }
    };

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = verifyPermissions();

    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    console.log("user current location:", location);
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet!</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          // uri: getMapPreview(pickedLocation.lat, pickedLocation.long),
          uri: "https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/google-maps-street-view-california-man-strange-hiker-squatting-photo-glitch-2810969.jpg?r=1608160176541",
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
