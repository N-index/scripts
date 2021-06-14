function rot13(str) {
  const startCode = 'A'.charCodeAt(0);
  const endCode = 'Z'.charCodeAt(0);
  const charCodes = [...str].map(e => {
    const currentCode = e.charCodeAt(0);
    if (currentCode >= startCode && currentCode <= endCode) {
      return startCode + (currentCode + 13 - startCode) % 26;
    } else {
      return currentCode;
    }
  });
  return String.fromCharCode(...charCodes);
}

console.log( rot13('SERR PBQR PNZC'))
