import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './LoginModal.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import { login } from '../../features/authentication/redux/actions/actions';
import { useAppDispatch } from '../../features/authentication/hooks/authHooks';
import LoadingSpinner from '../../features/authentication/screens/loadingSpinner/LoadingSpinner';
import useAuth from '../../features/authentication/hooks/useAuth';
import { motion } from 'framer-motion';

interface LoginModalProp {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProp> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    setIsLoading(true);
    try {
      const userLog = await signInWithEmailAndPassword(auth, email, password);
      const user = userLog.user;
      setIsLoading(false);
      toast.success(`${currentUser.displayName} te-ai logat cu sucess`);
      dispatch(login(user.uid));
      navigate('/profile');
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.container}>
      <ul>
        <div className={classes.top}>
          <button
            type="button"
            className={classes.closeButton}
            onClick={onClose}
          >
            +
          </button>
          <h4>Login</h4>
          <hr></hr>
        </div>
        <div className={classes.modalBody}>
          <label htmlFor="email" className={classes.textLabels}>
            Email
          </label>
          <div className={classes.searchbar}>
            <input
              id="email"
              ref={emailInputRef}
              type="email"
              className={classes.searchbarInput}
              required
            ></input>
          </div>
        </div>
        <div className={classes.modalBody}>
          <label htmlFor="password" className={classes.textLabels}>
            Parola
          </label>
          <div className={classes.searchbar}>
            <input
              id="password"
              ref={passwordInputRef}
              type="password"
              className={classes.searchbarInput}
              required
            ></input>
          </div>
          <div className={classes.elemnt}>
            <input type="checkbox" className={classes.checkbox}></input>
            <label className={classes.text}>Tine-ma minte</label>
            <label
              htmlFor="forgot"
              id="forgot"
              className={classes.forgotPassLink}
            >
              Ai uitat parola
            </label>
          </div>
        </div>
        {!isLoading && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className={classes.logginButton}
          >
            <label>Login</label>
          </motion.button>
        )}
        {isLoading && <LoadingSpinner />}
        <div className={classes.line}>
          <h3>sau</h3>
        </div>
        <Link to={'register'} onClick={onClose}>
          <div className={classes.newAccount}>
            <label>CREARE CONT NOU</label>
          </div>
        </Link>
      </ul>
    </form>
  );
};

export default LoginModal;
