import { useColorScheme } from "react-native";

const isDarkMode = () => {
return useColorScheme() === 'dark'
}

export default isDarkMode