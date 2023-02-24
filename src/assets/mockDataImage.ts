import image from '../theme/image';

//be changed with proper data from firebase
const imagesObj = {
  original: image.original,
  thumbnail: image.thumbnail,
};

export const images = Array(10)
  .fill(null)
  .map(() => imagesObj);

export const imageInp = [
  { key: 0, image: image.inputImage },
  { key: 1, image: image.inputImage },
  { key: 2, image: image.inputImage },
  { key: 3, image: image.inputImage },
];
