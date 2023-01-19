import { saveMediaToStorage } from "../../services/saveMedia";

export const createPost =
  (description, source, thumb) => () =>
    new Promise((resolve, reject) => {
      
      let allSavePromises = Promise.all([
        saveMediaToStorage(description, source, thumb),
      ]);

      allSavePromises
        .then((media) => {
            resolve(media);
        })
        .catch((err) => {
          reject(err);
        });
    });


