// Fetch Function
export function fetchSampleHistory() {
  // Imitate api call
  const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });

  return myPromise;
}
