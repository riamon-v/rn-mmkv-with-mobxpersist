import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import { Button, StyleSheet, Text, View } from "react-native";
import SomeStore from "./Store.store";
import { create } from "mobx-persist";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const mmkvStorage = {
  clear: () => {
    storage.clearAll();
    return Promise.resolve();
  },
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const hydrate = create({
  storage: mmkvStorage,
  jsonify: true,
});

const someStore = new SomeStore();
hydrate("some", someStore);

const App: React.FC = observer(() => {
  return (
    <View style={styles.container}>
      <Text>MMKV Count: {someStore.count}</Text>
      <Button title="Increment" onPress={() => (someStore.incrementFrom = 1)} />
      <StatusBar style="auto" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
