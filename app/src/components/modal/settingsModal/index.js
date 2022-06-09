import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import SettingsModalScreen from "../settingsModalScreen";

const SettingsModal = (props) => {
  const modalState = useSelector((state) => state.settingsModal);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 1:
        return <SettingsModalScreen bottomSheetRef={bottomSheetRef} />;
      default:
        return <></>;
    }
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
      snapPoints={["30%"]}
      index={-1}
      handleHeight={15}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: "#131313" }}
      handleIndicatorStyle={{ color: "#fff" }}
      backdropComponent={renderBackdrop}
      pressBehavior={"close"}
      
    >
      {renderContent()}
    </BottomSheet>
  );
};

export default SettingsModal;
