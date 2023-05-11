// SIMULA O CLIQUE DO MOUSE
function clickSimulator(setPressedKeyFn, key) {
  setPressedKeyFn(key);
  setTimeout(() => setPressedKeyFn(""), 150);
}

export default clickSimulator;
