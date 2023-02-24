import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './Anunt.module.scss';

const Anunt: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textAd}>
        <div>
          <h1>COMPONENTE PC</h1>
          <h2>SECOND HAND</h2>
        </div>
        <div>
          <h3>Publică anunțul tău gratuit!</h3>
        </div>
        <Link to={'/anunt'}>
          <motion.button whileTap={{ scale: 1.2 }}>Adaugă anunț</motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Anunt;
