import React from "react";
import { StoreProvider, createStore } from 'easy-peasy';
import "./app.css";

import StoreModel from './StoreModel';
import DCSC from "./dcsc";
const store = createStore(StoreModel);

export default function App() {
  return (
    <StoreProvider store={store}>
      <DCSC />
    </StoreProvider>
  );
}
