import * as FileSystem from "expo-file-system";

const purgeAppCache = async () => {
  try {
    const cacheDirectory = FileSystem.cacheDirectory;

    await FileSystem.deleteAsync(cacheDirectory);

    console.log("app cache purged...");
  } catch (error) {
    console.log(error);
  }
};

export default purgeAppCache;