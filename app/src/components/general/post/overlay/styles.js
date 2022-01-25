import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  description: {
    marginTop: 10,
    color: "white",
    marginBottom: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
  },
  leftContainer: {
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  actionButton: {
    paddingBottom: 16,
  },
  actionButtonText: {
    color: "white",
    textAlign: "center",
    marginTop: 4,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    top: 1,
    marginHorizontal: 3,
  },
  likesBox: {
    paddingBottom: 20,
  },
  commentBox: {
    paddingBottom: 20,
  },
  shareBox: {
    paddingBottom: 20,
  },
  musicBox: {
    paddingTop: 10,
    top: 40,
  },
  wrapText: {
    width: "90%",
  },
});

export default styles;
