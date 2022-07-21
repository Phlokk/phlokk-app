import "react-native-gesture-handler";
import React, {useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider } from "react-redux";
import Route from "./app/src/navigation/main";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { atom, useAtom } from "jotai";
import { fetchGetUsers } from "./app/src/redux/sagas/requests/fetchUsers";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  "Warning: Encountered two children with the same key, `::`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version."
]);
LogBox.ignoreLogs([
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle."
]);
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."
]);


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
