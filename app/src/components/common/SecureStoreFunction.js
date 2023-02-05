
import * as SecureStore from 'expo-secure-store';

export const saveToSecureStore = async (data, key) => {
try {
await SecureStore.setItemAsync(key, JSON.stringify(data));
} catch (ex) {
console.log(ex.message);
}
};

export const getFromSecureStore = async (key) => {
try {
const data = await SecureStore.getItemAsync(key);
return JSON.parse(data );
} catch (ex) {
console.log(ex.message);
}
};

export const removeFromSecureStore = async (key) => {
try {
await SecureStore.deleteItemAsync(key);
} catch (ex) {
console.log(ex.message);
}
};