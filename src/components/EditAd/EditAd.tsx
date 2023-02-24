import React, { useState } from 'react';
import Select from 'react-select';

import styles from './EditAd.module.scss';
import image from '../../theme/image';
// import ProductModal from '../ProductModal/ProductModal';
import { Link } from 'react-router-dom';
const inputArr = [
  { key: 0, title: 'Adauga Titlu', input: 'Căști wireless' },
  { key: 1, title: 'Categoria', input: 'Căști ' },
];

const inputArrTwo = [
  {
    key: 0,
    title: 'Full Name',
    names: [
      { title: 'Nume si Prenume', input: 'Pop Mihai' },
      { title: 'Numar de telefon', input: '0751957498' },
    ],
  },

  {
    key: 1,
    title: 'Adresa de Email',
    input: 'trif.flaviu98@gmail.com',
  },
  { key: 2, title: 'Localizare', input: 'Baia Mare' },
];

const options = [
  { value: 'nou', label: 'Nou' },
  { value: 'folosit', label: 'Folosit' },
  { value: 'uzat', label: 'Uzat' },
];

const imageInp = [
  { key: 0, image: image.inputImage },
  { key: 1, image: image.inputImage },
  { key: 2, image: image.inputImage },
  { key: 3, image: image.inputImage },
];

const EditAd: React.FC<{}> = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  // const closeModalHangler = () => {
  //   setShowModal(false);
  // };

  const onChange = () => {
    setSelectedOption(null);
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,

      borderRadius: '15px',
      width: '95%%',
      display: 'flex',
      height: '60px',
      padding: '2px 2px 2px 2px',
      fontFamily: 'Monserat',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '25px',
      lineHeight: '24px',
      color: '#fff',
      border: '2px solid #bcbcbc',
    }),
    container: (styles: any) => ({
      ...styles,
      width: '50%',
      fontFamily: 'Monserat',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '25px',
      lineHeight: '24px',
    }),
    menu: (styles: any) => ({
      ...styles,

      borderRadius: '15px',
      width: '100%',
      margin: '10px 0 10px 0',
      fontFamily: 'Monserat',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '25px',
      lineHeight: '24px',
      color: '#595959',
      border: '2px solid #bcbcbc',
      overflow: 'hidden',
      padding: '0',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontFamily: 'Monserat',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '25px',
      lineHeight: '24px',
      color: '#595959',
    }),
    input: (styles: any) => ({
      ...styles,
      fontFamily: 'Monserat ',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '25px',
      lineHeight: '24px',
      color: '#595959',
    }),
  };

  return (
    <>
      <div className={styles.forwardTitle}>
        <Link to={'/home'}>
          <button>
            <img src={image.leftBlackArrow} alt="arrow-icon" />
          </button>
        </Link>
        <h1>EDITEAZA ANUNT</h1>
      </div>
      <div className={styles.registerBody}>
        <div>
          <h1>Nume Produs</h1>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.container}>
            {inputArr.map((item) => {
              return (
                <div className={styles.doubleInput}>
                  <label key={item.key}>
                    <span>{item.title}</span>
                    <input type="text" placeholder={item.input}></input>
                  </label>
                </div>
              );
            })}
          </div>
          <div className={styles.containerSelect}>
            <h3>Stare produs</h3>
            <Select
              defaultValue={selectedOption}
              onChange={onChange}
              options={options}
              styles={customStyles}
              placeholder={'Folosit'}
            />
          </div>

          <div className={styles.textContainer}>
            <h3>Descriere</h3>
            <textarea
              onChange={(e) => setCount(e.target.value.length)}
              maxLength={9000}
            >
              Nu a fost niciodata mai usor sa iei muzica preferata cu tine
              oriunde te-ai duce! Castile wireless GO4FIT GX08 iti ofera sunet
              de inalta calitate si confort intr-un design modern si portabil.
              Control prin atingere, inteligent si usor de folosit Indiferent ca
              esti in sala de fitness sau in fata laptopului, castile wireless
              GO4FIT sunt usor de folosit.
            </textarea>
            <span>{count}/9000</span>
          </div>
        </div>

        <div>
          <h1>Imagini</h1>
        </div>
        <div className={styles.imagesbox}>
          <div className={styles.imagesContainer}>
            <div className={styles.inputBody}>
              {imageInp.map((item) => {
                return (
                  <div>
                    <label htmlFor="file-input">
                      <img width="150px" src={item.image} alt="file" />
                    </label>
                    <input id="file-input" accept="image/*" type="file" />
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
                      <label>
                        <span>{item.title}</span>
                        <input type="text" placeholder={item.input}></input>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div key={input.key} className={styles.bottomContainer}>
                  <label key={input.title}>
                    <span>{input.title}</span>
                    <input type="text" placeholder={input.input} />
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
              <button className={styles.backButton}> Înapoi</button>
            </Link>
          </div>
          <div className={styles.changeButton}>
            <button>Modifica anunțul</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalBackground}>
          {/* <ProductModal prev={} onClose={closeModalHangler} /> */}
        </div>
      )}
    </>
  );
};

export default EditAd;
