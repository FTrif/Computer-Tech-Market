import React, { useState } from 'react';
import OrderPay from '../orderPay/OrderPay';
import StepProgressBar from '../stepBar/ReactStepProgressBar';
import styles from './OrderDetails.module.scss';
import { motion } from 'framer-motion';

const inputArrTwo = [
  {
    key: 0,
    title: 'Full Name',
    names: [{ title: 'Nume si Prenume' }, { title: 'Numar de telefon' }],
  },

  {
    key: 1,
    title: 'Adresa de Email',
  },
  {
    key: 3,
    title: 'Full Name',
    names: [{ title: 'Județ' }, { title: 'Localitate' }],
  },
  {
    key: 4,
    title: 'Adresă',
  },
];
const OrderDetails: React.FC<{}> = () => {
  const [detail, showDetail] = useState(true);
  return (
    <>
      {detail === true ? (
        <>
          <StepProgressBar steper={50} />
          <div className={styles.orderBody}>
            <div>
              <h1>Detalii comandă</h1>
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
                            <input type="text"></input>
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div key={input.key} className={styles.bottomContainer}>
                      <label key={input.title}>
                        <span>{input.title}</span>
                        <input type="text" />
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={styles.continueButton}>
              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={() => showDetail(false)}
              >
                Continuă
              </motion.button>
            </div>
          </div>
        </>
      ) : (
        <OrderPay />
      )}
    </>
  );
};

export default OrderDetails;
