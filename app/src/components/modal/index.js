import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Platform, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "../../redux/actions/modal";
import CommentModal from "./comment";

import colors from "../../../config/colors";

const Modal = () => {
  const modalState = useSelector((state) => state.modal);
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 0:
        return <CommentModal post={modalState.data} />;
      default:
        return <></>;
    }
  };

  const onClose = () => {
    dispatch(clearModal());
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["50%"]}
      index={-1}
      onClose={onClose}
      handleHeight={50}
      enablePanDownToClose
      keyboardBehavior={Platform.OS === "ios" ? "interactive" : "fullScreen"}
      backgroundStyle={{ backgroundColor: "#1C1C1C" }}
      backdropComponent={renderBackdrop}
      pressBehavior={"close"}
    >
      {renderContent()}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
  },
  iconX: {
    color: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Modal;
