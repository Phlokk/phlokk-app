import "react-native-gesture-handler";
import { React, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider, useSelector } from "react-redux";
import Route from "./app/src/navigation/main";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  CURRENT_USER_KEY,
  getFromStorage,
  setStorageItem,
} from "./app/src/utils/appStorage";
import { atom, useAtom } from "jotai";
import { fetchGetUsers } from "./app/src/redux/sagas/requests/fetchUsers";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
// LogBox.ignoreLogs([
//   "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
// ]);
// LogBox.ignoreLogs([
//   "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native",
// ]);

export const userAtom = atom({});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

export default function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetchGetUsers();
      setUser(response.user);
    };

    loadUser();
  }, []);

  // const users = useSelector((state) => state.userReducer.user);

  // useEffect(() => {
  //   const loadUserFromStorage = async () => {
  //     const user = getFromStorage(CURRENT_USER_KEY, undefined);

  //     // if no user, you'll need to load it from the api

  //     //once you load it, save it to app storage like...
  //     const profileFromApi = {}; // load profile from api
  //     setStorageItem(CURRENT_USER_KEY, profileFromApi);
  //   };

  //   loadUserFromStorage();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
