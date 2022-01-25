import styles from "./styles";
import { View, Text, TouchableOpacity, Switch } from "react-native";

export default function SwitchScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [text, setText] = useState("Click");

  const toggleSwitch = () => {
    if (isEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <Switch
      style={styles.switch}
      trackColor={{ false: "grey", true: "green" }}
      thumbColor={isEnabled ? "f4f3f4" : "f4f3f4"}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}
