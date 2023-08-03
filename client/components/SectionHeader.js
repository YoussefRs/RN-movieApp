import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import AppText from "./AppText";



const SectionHeader = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Spacing.margin.lg,
      }}
    >
      <AppText>{title}</AppText>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({});
