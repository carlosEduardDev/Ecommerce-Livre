import { createSlice } from "@reduxjs/toolkit";

const arr = [
  "Notebook",
  "Smart TV",
  "Geladeira",
  "Smartphone",
  "Bicicleta",
  "JBL",
  "Fone Bluetooth",
  "Chromecast",
  "Câmera",
  "Microondas",
  "Computador",
  "Tênis",
  "Óculos",
  "Fogão",
  "pilha alcalina",
  "projetor",
  "smartwatch",
  "home theater",
  "caixa de som",
  "impressora 3D",
  "SSD",
  "vaporizador",
  "adaptador de energia",
  "carregador",
  "tablet",
  "placa de vídeo",
  "memória RAM",
  "assistente virtual",
  "videogame",
  "monitor",
  "armário",
  "Sofá",
  "Estante",
  "Mesa",
  "Cadeira Gamer",
  "Cama",
];
const randomElement = arr[Math.floor(Math.random() * arr.length)];

const slice = createSlice({
  name: "search",
  initialState: { result: randomElement },
  reducers: {
    wordsearch(state, action) {
      state.result = action.payload;
    },
  },
});

export default slice.reducer;
export const { wordsearch } = slice.actions;
