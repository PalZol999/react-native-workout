import { FunctionComponent, useState } from "react";
import {
  View,
  Modal as DefaultModal,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};

export function ModalM({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);
  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        transparent={false}
        animationType="fade"
      >
        <View style={stlyes.centerView}>
          <View style={stlyes.contentView}>
            {children({ handleOpen, handleClose })}
          </View>
          <PressableText onPress={handleClose} text="Close" />
        </View>
      </DefaultModal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText onPress={handleOpen} text="Open" />
      )}
    </>
  );
}

const stlyes = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
