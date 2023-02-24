import React, { useRef, useState } from 'react';
import classes from './Login.module.scss';
import { login } from '../../features/authentication/redux/actions/actions';
import { useAppDispatch } from '../../features/authentication/hooks/authHooks';
import LoadingSpinner from '../../features/authentication/screens/loadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import useAuth from '../../features/authentication/hooks/useAuth';
import { motion } from 'framer-motion';

const Login: React.FC<{}> = () => {
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
    <form className={classes.container} onSubmit={submitHandler}>
      <div>
        <h4>Login</h4>
      </div>
      <div className={classes.loginBody}>
        <div>
          <label htmlFor="email" className={classes.loginSpan}>
            Email
          </label>
          <div className={classes.inputBars}>
            <input
              className={classes.inputBarTwo}
              id="email"
              type="email"
              ref={emailInputRef}
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="password" className={classes.loginSpan}>
            Parola
          </label>
          <div className={classes.inputBars}>
            <input
              className={classes.inputBarTwo}
              id="password"
              type="password"
              ref={passwordInputRef}
            ></input>
          </div>
        </div>
        <div className={classes.loginBodyBottom}>
          <input className={classes.checkbox} type="checkbox"></input>
          <label>Tine-ma minte</label>
          <label
            className={classes.forgotPassword}
            htmlFor="forgot"
            id="forgot"
          >
            Ai uitat parola?
          </label>
        </div>
      </div>
      <div>
        {!isLoading && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            className={classes.loginButton}
            type="submit"
          >
            Login
          </motion.button>
        )}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
};

export default Login;
