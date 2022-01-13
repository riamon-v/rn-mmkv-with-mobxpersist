import { makeAutoObservable, observable } from "mobx";
import { create, persist } from "mobx-persist";

class SomeStore {
  @persist count: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  set incrementFrom(n: number) {
    this.count += n;
  }
}

export default SomeStore;
