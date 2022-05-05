import "react-native-gesture-handler";
import { React } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./app/src/redux/reducers/reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./app/src/redux/sagas/rootSaga";
import Route from "./app/src/navigation/main";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native",
]);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

const store = (applyMiddleware(...middleware))(createStore)(reducers);
sagaMiddleware.run(rootSaga);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

export default function App() {
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
