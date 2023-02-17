export function getFutureValue(value, foreCastLength, rate) {
  var amortizedRate;
  if (!rate) {
    amortizedRate = 7 / 12 / 100;
  } else {
    amortizedRate = rate / 12 / 100;
  }

  return value * (1 + amortizedRate) ** foreCastLength;
}
