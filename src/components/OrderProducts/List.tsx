import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { cartActions } from '../../features/Announcement/Redux/reducers/cartSlice';
import { product } from '../../features/Announcement/Redux/reduxTypes/typesReduxCart';
import { motion } from 'framer-motion';

const List: React.FC<{ item: product }> = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(
      cartActions.deleteProduct({
        id: item.id,
      })
    );
    toast.success('Produsul a fost sters din cos!');
  };
  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.li
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        onClick={deleteProduct}
      >
        X
      </motion.li>
      <li>
        <img src={item.image} alt="card-img" />
      </li>
      <li>{item.title}</li>
      <li>{item.quantity}</li>
      <li>{item.pret * item.quantity}</li>
    </motion.ul>
  );
};

export default List;
