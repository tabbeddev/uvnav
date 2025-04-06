export function booleansToNumber(booleans: boolean[]): number {
  let number = 0;
  for (let i = 0; i < booleans.length; i++) {
    if (booleans[i]) {
      number |= 1 << i;
    }
  }
  return number;
}

export function numberToBooleans(number: number, length: number): boolean[] {
  const booleans = [];
  for (let i = 0; i < length; i++) {
    booleans[i] = (number & (1 << i)) !== 0;
  }
  return booleans;
}
