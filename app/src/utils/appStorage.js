import AsyncStorage from "@react-native-async-storage/async-storage";

export const CURRENT_USER_KEY = "@currentUser";

export const getFromStorage = async (storageKey, defaultValueIfNull) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);

    // If the user passes a default value, save it to appStorage, and return the same value
    if (!jsonValue && defaultValueIfNull !== undefined) {
      setStorageItem(storageKey, defaultValueIfNull);
      return defaultValueIfNull;
    }

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    reportError("Error getting from app storage", err);
    return null;
  }
};

export const setStorageItem = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (err) {
    reportError("Error saving to app storage", err);
  }
};

export const deleteStorageItem = async (storageKey) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (err) {
    reportError("Error removing to app storage", err);
  }
};
