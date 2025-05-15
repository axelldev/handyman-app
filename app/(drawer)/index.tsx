import LocationForm from "@/components/location-form";
import LocationItem from "@/components/location-item";
import useLocations from "@/hooks/useLocations";
import { Location } from "@/types/location";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ManageLocations() {
  const { getLocations, addLocation, deleteLocation } = useLocations();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    getLocations().then(setLocations);
  }, [getLocations]);

  const handleAddLocation = async (locationName: string) => {
    try {
      await addLocation(locationName);
      getLocations().then(setLocations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLocation = async (location: Location) => {
    try {
      await deleteLocation(location.id);
      getLocations().then(setLocations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <LocationForm onSubmit={handleAddLocation} />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No locations found</Text>
        }
        renderItem={({ item: location }) => (
          <LocationItem location={location} onDelete={handleDeleteLocation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    padding: 16,
    color: "#666",
  },
});
