import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./src/screens/Auth";
import TodoApp from "./src/screens/TodoApp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Todo" component={TodoApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
