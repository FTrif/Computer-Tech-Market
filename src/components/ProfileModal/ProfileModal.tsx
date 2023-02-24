import style from './ProfileModal.module.scss';
import image from '../../theme/image';
import { useAppDispatch } from '../../features/authentication/hooks/authHooks';
import { logout } from '../../features/authentication/redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileModal: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/home');
    toast.success('Te-ai delogat cu succes');
  };
  return (
    <div className={style.dropdownMenu}>
      <div>
        <img alt="icon" src={image.imgCont} />
        Contul meu
      </div>
      <div>
        <img alt="icon" src={image.imgCart} />
        Comenzile mele
      </div>
      <div>
        <img alt="icon" src={image.imgPlusAds} />
        Anunțurile mele
      </div>
      <div>
        <img alt="icon" src={image.imgSettings} />
        Setări
      </div>
      <div onClick={logoutHandler}>
        <img alt="icon" src={image.imgLogOut} />
        Log out
      </div>
    </div>
  );
};

export default ProfileModal;
