import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import classes from './Card.module.scss';

interface Product {
  isYourProduct: boolean;
  image: string;
  title: string;
  pret: number;
  descriere: string;
  buttonAdd: string;
  buttonView: string;
  categorie: string;
  descriereTotala: string;
  stare: string;
  id: string;
}

const Card: React.FC<Product> = ({
  isYourProduct,
  image,
  title,
  pret,
  descriere,
  buttonAdd,
  buttonView,
  categorie,
  descriereTotala,
  stare,
  id,
}) => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate(isYourProduct ? '/editingP' : '/viewP', {
      state: {
        title: title,
        pret: pret,
        descriere: descriere,
        categorie: categorie,
        image: image,
        descriereTotala: descriereTotala,
        stare: stare,
        id: id,
      },
    });
  };
  return (
    <div>
      <div className={isYourProduct ? classes.containerTwo : classes.container}>
        <img src={image} alt="logo" />
        <label>{title}</label>
        <label>{pret} Lei</label>
        <p>{descriere}...</p>
        {isYourProduct ? (
          <motion.button whileTap={{ scale: 1.2 }} onClick={onHandleClick}>
            {buttonView}
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 1.2 }} onClick={onHandleClick}>
            {buttonAdd}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Card;
