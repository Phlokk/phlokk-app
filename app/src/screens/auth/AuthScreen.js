import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AuthDetails from "../../components/auth/details/AuthDetails";
import AuthMenu from "../../components/auth/menu/AuthMenu";

import colors from "../../../config/colors";

export default function AuthScreen() {
  const [authPage, setAuthPage] = useState(0);
  const [detailsPage, setDetailsPage] = useState(false);
  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthDetails authPage={authPage} setDetailsPage={setDetailsPage} />
      ) : (
        <AuthMenu
          authPage={authPage}
          setAuthPage={setAuthPage}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
