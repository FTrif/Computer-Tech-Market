import React, { useRef, useState } from 'react';
import { Select } from '../Select/Select';
import { Option } from '../../interface';
import { motion } from 'framer-motion';
import styles from './AddAnnouncement.module.scss';
import image from '../../theme/image';
import ProductModal from '../ProductModal/ProductModal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { arrayUnion, doc, updateDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../../features/authentication/screens/loadingSpinner/LoadingSpinner';
import { options, optionsCategorie } from '../Select/options';
import { imageInp } from '../../assets/mockDataImage';
import {
  LoggedIn,
  useAppSelector,
} from '../../features/authentication/hooks/authHooks';
import useAuth from '../../features/authentication/hooks/useAuth';

const AddAnnouncement: React.FC<{}> = () => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [count, setCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productTitle, setProductTitle] = useState<string>('');
  const [productCategorie, setProductCategorie] = useState<Option | null>(null);
  const [productDescriere, setProductDescriere] = useState<string>('');
  const [productPret, setProductPret] = useState<number | string>(0);
  const [fileSelected, setFileSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);
  const lastNameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const adressInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const loggedIn = useAppSelector(LoggedIn);
  const { currentUser } = useAuth();

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHangler = () => {
    setShowModal(false);
  };
  let valueStare = selectedItem?.value;
  let valueCategorie = productCategorie?.value;
  const inputArrTwo = [
    {
      key: 0,
      title: 'Full Name',
      names: [
        {
          title: 'Nume',
          type: 'text',
          htmlFor: 'lname',
          id: 'lname',
          name: 'lname',
          ref: lastNameInputRef,
        },
        {
          title: 'Prenume',
          type: 'text',
          htmlFor: 'fname',
          id: 'fname',
          name: 'fname',
          ref: firstNameInputRef,
        },
      ],
    },

    {
      key: 1,
      title: 'Adresa de Email',
      type: 'email',
      htmlFor: 'email',
      id: 'email',
      name: 'email',
      ref: emailInputRef,
    },
    {
      key: 2,
      title: 'Localizare',
      type: 'adress',
      htmlFor: 'adress',
      name: 'adress',
      id: 'adress',
      ref: adressInputRef,
    },
  ];
  const prev = {
    title: productTitle,
    pret: productPret,
    descriere: productDescriere,
    categorie: valueCategorie,
    stare: valueStare,
  };
  const handleImageChange = function (e: { target: { files: any } }) {
    const fileList = e.target.files;
    const selectedFilesArray = Array.from(fileList);
    if (selectedImages.length === 4) {
      return;
    }
    const imagesArray = selectedFilesArray.map((file: any) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    if (!fileList) return;
    for (let i = 0; i < e.target.files!.length; i++) {
      const newImage = e.target.files![i];
      setFileSelected((prevState) => [...prevState, newImage]);
    }
  };
  console.log(selectedImages);
  const addProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    // Add to firebase
    const firstName = firstNameInputRef.current?.value;
    const lastName = lastNameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const adress = adressInputRef.current?.value;
    if (fileSelected.length === 0) {
      toast.error('Nici o imagine adaugata');
      setLoading(false);
      return;
    }
    try {
      const docRef = doc(db, 'products', Date.now() + productTitle);
      await setDoc(docRef, {
        title: productTitle,
        pret: productPret,
        descriere: productDescriere.slice(0, 70),
        descriereTotala: productDescriere,
        categorie: valueCategorie,
        stare: valueStare,
        firstName: firstName,
        lastName: lastName,
        email: email,
        adress: adress,
        yourProduct: loggedIn ? currentUser.email : '',
      });
      fileSelected.map(async (image: any) => {
        const storageRef = ref(
          storage,
          `${productTitle + Date.now()}/${image.name + Date.now()}`
        );
        await uploadBytesResumable(storageRef, image);
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(docRef, {
            image: arrayUnion(downloadURL),
          });
        });
      });

      toast.success('Anuntul a fost publicat cu succes!');
      setLoading(false);
    } catch (error) {
      toast.error('Produsul nu a fost adaugat!');
      setLoading(false);
    }
    setProductDescriere('');
    setProductTitle('');
    emailInputRef.current!.value = '';
    firstNameInputRef.current!.value = '';
    lastNameInputRef.current!.value = '';
    adressInputRef.current!.value = '';
    setFileSelected([]);
    setProductPret(0);
    setSelectedImages([]);
  };

  return (
    <>
      <div className={styles.forwardTitle}>
        <Link to={'/home'}>
          <button>
            <img src={image.leftBlackArrow} alt="arrow-icon" />
          </button>
        </Link>
        <h1>PUBLICĂ UN ANUNȚ</h1>
      </div>
      <form onSubmit={addProduct} className={styles.registerBody}>
        <div>
          <h1>Nume Produs</h1>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.container}>
            <div className={styles.doubleInput}>
              <label htmlFor="text">
                <span>Adauga Titlu</span>
                <input
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  type="text"
                  required
                ></input>
              </label>
              <label htmlFor="text">
                <span>Categoria</span>
                <div>
                  <Select
                    selected={productCategorie}
                    options={optionsCategorie}
                    onChange={(selection: Option) =>
                      setProductCategorie(selection)
                    }
                    marginArrow={'-230px'}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className={styles.containerSelect}>
            <h3>Stare produs</h3>
            <Select
              selected={selectedItem}
              options={options}
              onChange={(selection: Option) => setSelectedItem(selection)}
              marginArrow={'20px'}
            />
            <label htmlFor="number">
              <span>Preț in lei</span>
              <input
                value={productPret}
                onChange={(e) => setProductPret(e.target.value)}
                type="number"
              ></input>
            </label>
          </div>

          <div className={styles.textContainer}>
            <h3>Descriere</h3>
            <textarea
              value={productDescriere}
              onChange={(e) => {
                setProductDescriere(e.target.value);
                setCount(e.target.value.length);
              }}
              maxLength={9000}
              required
            ></textarea>
            <span>{count}/9000</span>
          </div>
        </div>

        <div>
          <h1>Imagini</h1>
        </div>

        <div className={styles.imagesbox}>
          <div className={styles.imagesContainer}>
            <div className={styles.inputBody}>
              {selectedImages.length !== 0
                ? selectedImages.map((item) => {
                    return (
                      <div>
                        <label htmlFor="photo">
                          <img width="150px" alt="productImage" src={item} />
                          <input
                            id="photo"
                            name="photo"
                            accept="image/*"
                            type="file"
                            multiple={false}
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    );
                  })
                : imageInp.map((item) => {
                    return (
                      <div>
                        <label htmlFor="photo">
                          <img
                            width="150px"
                            alt="productImage"
                            src={item.image}
                          />
                          <input
                            id="photo"
                            name="photo"
                            accept="image/*"
                            type="file"
                            multiple={true}
                            onChange={handleImageChange}
                            max={4}
                          />
                        </label>
                      </div>
                    );
                  })}
            </div>
          </div>

          <p>
            Se recomandă încărcarea imaginilor cu o orientare orizontală
            (landskape)
          </p>
        </div>

        <div>
          <h1>Informatii de contact</h1>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.containerTwo}>
            {inputArrTwo.map((input) =>
              input.title === 'Full Name' ? (
                <div key={input.key} className={styles.doubleInputTwo}>
                  {input?.names?.map((item) => (
                    <div className={styles.doubleInput}>
                      <label htmlFor={item.htmlFor}>
                        <span>{item.title}</span>
                        <input
                          type={item.type}
                          name={item.name}
                          id={item.id}
                          ref={item.ref}
                          required
                        ></input>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div key={input.key} className={styles.bottomContainer}>
                  <label key={input.title}>
                    <span>{input.title}</span>
                    <input
                      type={input.type}
                      name={input.name}
                      ref={input.ref}
                      id={input.id}
                      required
                    />
                  </label>
                </div>
              )
            )}
          </div>

          <div className={styles.bottomContainer}>
            <u onClick={showModalHandler}>Previzualizeaza anuntul</u>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.backButton}>
            <img src={image.leftOrangeArrow} alt="arrow-icon" />
            <Link to={'/home'}>
              <motion.button
                whileTap={{ scale: 1.2 }}
                className={styles.backButton}
              >
                Înapoi
              </motion.button>
            </Link>
          </div>

          <div className={styles.changeButton}>
            {!loading && (
              <motion.button type="submit" whileHover={{ scale: 1.2 }}>
                Publică anunțul
              </motion.button>
            )}
          </div>
        </div>
        {loading && <LoadingSpinner />}
      </form>

      {showModal && (
        <div className={styles.modalBackground}>
          <ProductModal prev={prev} onClose={closeModalHangler} />
        </div>
      )}
    </>
  );
};

export default AddAnnouncement;
