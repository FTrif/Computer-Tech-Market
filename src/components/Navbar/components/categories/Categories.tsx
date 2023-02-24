import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import image from '../../../../theme/image';
import style from './Categories.module.scss';

const Categories: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [openCat, setOpenCat] = useState<boolean>(false);
  const [openSub, setOpenSub] = useState<boolean>(false);

  let ref = React.useRef<HTMLDivElement>(null);

  const clickHandler = (e: any) => {
    const value = e.target.value;
    navigate('/list', {
      state: {
        value: value,
      },
    });
  };

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        setOpenCat(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [ref]);

  const openCatHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenCat(true);
  };

  const openSubHandler: React.MouseEventHandler<HTMLImageElement> = () => {
    setOpenSub(!openSub);
  };

  return (
    <>
      <div className={style.menuContainer} ref={ref}>
        <div className={style.menu}>
          <button className={style.btnCategories} onClick={openCatHandler}>
            <img src={image.menuIcon} alt="menu-icon" />
          </button>
          <div>
            {openCat && (
              <div className={style.dropdownMenuCat}>
                <option onClick={clickHandler} value="Laptop">
                  Laptop
                </option>
                <option onClick={clickHandler} value="Desktop PC">
                  Desktop PC
                </option>
                <div>
                  <div className={style.menuItemCat} onClick={openSubHandler}>
                    <span>Componente</span>
                    <img src={image.arrowRight} alt="arrowRight" />
                  </div>
                </div>
                <option onClick={clickHandler} value="Căști">
                  Căști
                </option>
                <option onClick={clickHandler} value="Mouse-uri">
                  Mouse-uri
                </option>
                <option onClick={clickHandler} value="Monitoare">
                  Monitoare
                </option>
                <option onClick={clickHandler} value="Imprimante">
                  Imprimante
                </option>
                <option onClick={clickHandler} value="Sistem Audio">
                  Sistem Audio
                </option>
              </div>
            )}
            {openSub && openCat && (
              <div className={style.dropdownMenuSub}>
                <div>
                  <div className={style.menuItemSub} onClick={openSubHandler}>
                    <img src={image.arrowLeft} alt="arrowLeft" />
                    <span>Componente</span>
                  </div>
                </div>
                <div />
                <option onClick={clickHandler} value="Plăci video">
                  Plăci video
                </option>
                <option onClick={clickHandler} value="Procesoare">
                  Procesoare
                </option>
                <option onClick={clickHandler} value="Plăci de bază">
                  Plăci de bază
                </option>
                <option onClick={clickHandler} value="Memorii">
                  Memorii
                </option>
                <option onClick={clickHandler} value="SSD">
                  SSD
                </option>
                <option onClick={clickHandler} value="Hardk Disks">
                  Hardk Disks
                </option>
                <option onClick={clickHandler} value="Surse">
                  Surse
                </option>
                <option onClick={clickHandler} value="Carcase">
                  Carcase
                </option>
                <option onClick={clickHandler} value="Coolere">
                  Coolere
                </option>
              </div>
            )}
          </div>
        </div>
        <span>CATEGORII</span>
      </div>
    </>
  );
};

export default Categories;
