import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import SettingsSheetModalScreen from "../settingsSheetModalScreen";

const SettingsSheetModal = (props, post) => {

  console.log('POST SHOULD BE HERE -------> ')
  console.log('settings Sheet Modal')


  const modalState = useSelector((state) => state.settingsSheetModal);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 3:
        return <SettingsSheetModalScreen 
        bottomSheetRef={bottomSheetRef} 
        post={post}
        
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

export default SettingsSheetModal;
