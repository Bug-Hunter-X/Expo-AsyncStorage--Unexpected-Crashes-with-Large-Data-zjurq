// Instead of directly storing large data in AsyncStorage, consider breaking it down into smaller chunks or using alternative storage solutions like SQLite or MMKV.

// Example using smaller chunks:

async function storeLargeData(data) {
  const chunkSize = 1024; // Adjust as needed
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.substring(i, i + chunkSize);
    await AsyncStorage.setItem(`largeDataChunk_${i}`, chunk);
  }
}

async function retrieveLargeData() {
  let data = '';
  let i = 0;
  let chunk = await AsyncStorage.getItem(`largeDataChunk_${i}`);
  while (chunk !== null) {
    data += chunk;
    i += 1024;
    chunk = await AsyncStorage.getItem(`largeDataChunk_${i}`);
  }
  return data;
}

// Example using MMKV (requires installation):
// expo install mmkv-storage

import { MMKVStorage } from 'mmkv-storage';

const storage = new MMKVStorage.Loader().initialize();

await storage.setStringAsync('myKey', JSON.stringify(myData));
const retrievedData = JSON.parse(await storage.getStringAsync('myKey'));