import React from 'react';
import styles from './ProductModal.module.scss';
import ImageGalleryCarousel from '../Products/ImageGallery/ImageGalleryCarousel';

interface IProducModalProp {
  onClose: () => void;
  prev: {
    title: string;
    pret: number | string;
    categorie: string | number | undefined;
    descriere: string;
    stare: string | number | undefined;
  };
}

const ProductModal: React.FC<IProducModalProp> = ({ prev, onClose }) => {
  const productArr = [
    {
      key: 0,
      categories: prev.categorie,
      condition: prev.stare,
      title: prev.title,
      pret: `${prev.pret} Lei`,
      descriere: prev.descriere,
    },
  ];
  return (
    <div className={styles.containterBody}>
      {prev.descriere.length === 0 || prev.title.length === 0 ? (
        <>
          <h1>Trebuie completate toate campurile inainte de previzualizare</h1>
          <div className={styles.descriptionBody}>
            <button className={styles.closeButton} onClick={onClose}>
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.modalContainer}>
            <ImageGalleryCarousel position={'bottom'} />
          </div>
          <div className={styles.descriptionBody}>
            <button className={styles.closeButton} onClick={onClose}>
              +
            </button>
            {productArr.map((item) => (
              <div className={styles.description}>
                <div className={styles.container}>
                  <label>{item.title}</label>
                  <div>
                    <span>Descriere:</span>
                    <p>
                      {item.descriere.length > 73
                        ? `${item.descriere
                            .split('')
                            .splice(0, 73)
                            .join('')}...`
                        : item.descriere}
                    </p>
                  </div>
                  <div>
                    <span>{item.categories}</span>
                    <span>Stare:{item.condition}</span>
                  </div>
                  <div>
                    <span>Pret:</span>
                    <span>{item.pret}</span>
                  </div>

                  <button></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductModal;
