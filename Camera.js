import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

const Camera = ({ initialProps, getBeneficiaryData }) => {
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      setIsRecording,
    },
  ] = useCamera(initialProps);

  const readBarcode = (barcodes) => {
    // console.log(barcodes);
    barcodes.barcodes.forEach(barcode => {
      // console.warn(`${barcode.data} ${Math.random()}`)
      getBeneficiaryData(barcode.data);
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{ height: 200, width: 200, overflow: "hidden" }}
        autoFocus={autoFocus}
        onTextRecognized={textRecognized}
        onFacesDetected={facesDetected}
        onGoogleVisionBarcodesDetected={(e) => readBarcode(e)}
        type={RNCamera.Constants.Type.back}
      />
      <TouchableWithoutFeedback onPress={touchToFocus}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

    </View>
  );
};

export default Camera