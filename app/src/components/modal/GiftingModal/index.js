import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import GiftingModalScreen from "../giftingModalScreen";



const GiftingModal = (props) => {
  const modalState = useSelector((state) => state.giftingModal);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 2:
        return <GiftingModalScreen bottomSheetRef={bottomSheetRef} />;
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
        // backdropOpacity={0.1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["70%"]}
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

export default GiftingModal;
