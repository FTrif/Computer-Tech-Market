import React from 'react';
import { useAppSelector } from '../../../features/authentication/hooks/authHooks';
import StepProgressBar from '../stepBar/ReactStepProgressBar';
import styles from './OrderPay.module.scss';
import { motion } from 'framer-motion';

let transportPay = 15;
const OrderPay: React.FC<{}> = () => {
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  return (
    <>
      <StepProgressBar steper={100} />
      <div className={styles.orderBodyPay}>
        <div>
          <h1>Modalitate de plată</h1>
        </div>
        <label className={styles.payMethods}>
          <input name="radio" type="radio"></input>
          <span>Card online</span>
        </label>
        <label className={styles.payMethods}>
          <input name="radio" type="radio"></input>
          <span>Plată la livrare</span>
        </label>
      </div>
      <div className={styles.orderBody}>
        <section className={styles.orderSummary}>
          <div className={styles.orderTotalPay}>
            <div>
              <h1>Sumar comandă</h1>
            </div>
            <div className={styles.cost}>
              Cost produse <span>{totalAmount} Lei</span>
            </div>
            <div className={styles.cost}>
              Cost livrare <span>{transportPay} Lei</span>
            </div>
          </div>
          <div className={styles.orderFinish}>
            <h3>TOTAL:</h3>
            <h3>{totalAmount + transportPay} Lei</h3>
            <div className={styles.finishButton}>
              <motion.button whileTap={{ scale: 1.2 }}>
                Finalizare comandă
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default OrderPay;
