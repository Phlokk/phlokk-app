import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import SettingsAudioModalScreen from "../settingsAudioModalScreen";

const SettingsAudioModal = (props) => {
  const modalState = useSelector((state) => state.settingsAudioModal);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 4:
        return <SettingsAudioModalScreen 
        bottomSheetRef={bottomSheetRef} 
        />;
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
      snapPoints={["60%"]}
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

export default SettingsAudioModal;
