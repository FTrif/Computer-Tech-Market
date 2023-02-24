import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.scss';
import LoadingSpinner from '../../features/authentication/screens/loadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const RegisterPage: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);
  const lastNameInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const phone = phoneInputRef.current!.value;
    const firstName = firstNameInputRef.current!.value;
    const lastName = lastNameInputRef.current!.value;
    setIsLoading(true);
    try {
      const userCreate = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCreate.user;
      await updateProfile(user, {
        displayName: firstName,
      });

      const formDataCopy = { email, phone, firstName, lastName };

      await setDoc(doc(db, 'users', user.uid), {
        ...formDataCopy,
        user: user.uid,
      });

      setIsLoading(false);
      toast.success('Cont Creat');
      navigate('/login');
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const inputArr = [
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
      // pattern: '.+@globex.com',
      id: 'email',
      ref: emailInputRef,
    },
    {
      key: 2,
      title: 'Numar de telefon',
      type: 'tel',
      // pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
      name: 'phone',
      htmlFor: 'phone',
      id: 'phone',
      ref: phoneInputRef,
    },
    {
      key: 3,
      title: 'Parola',
      type: 'password',
      htmlFor: 'pass',
      id: 'pass',
      name: 'password',
      ref: passwordInputRef,
    },
  ];

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <div className={classes.titleText}>
        <h4>CREARE CONT NOU</h4>
      </div>
      <div className={classes.registerBody}>
        <div className={classes.rows}>
          {inputArr.map((input) =>
            input.title === 'Full Name' ? (
              <div key={input.key} className={classes.registerTop}>
                {input?.names?.map((item) => (
                  <div className={classes.registerTopInputs}>
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
              <div key={input.key} className={classes.row}>
                <label key={input.title} htmlFor={input.htmlFor}>
                  <span>{input.title}</span>
                  <input
                    type={input.type}
                    // pattern={input.pattern}
                    name={input.name}
                    id={input.id}
                    ref={input.ref}
                    required
                  />
                </label>
              </div>
            )
          )}
          <div className={classes.registerBodyText}>
            <input
              className={classes.checkbox}
              type="checkbox"
              required
            ></input>
            <label className={classes.termsText}>
              Am citit si sunt de acord cu <u>termenii si conditiile</u>
            </label>
          </div>
        </div>
      </div>
      <div className={classes.registerBody}>
        {!isLoading && (
          <motion.button whileHover={{ scale: 1.2 }} type="submit">
            Creare cont
          </motion.button>
        )}
        {isLoading && <LoadingSpinner />}
        <div className={classes.line}>
          <h3>sau</h3>
        </div>
        <div>
          <Link to={'/login'}>
            <motion.button whileHover={{ scale: 1.2 }}>Login</motion.button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
