import classes from "./FootBar.module.scss";
import image from "../../theme/image";

const FootBar: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div className={classes.logo}>
          <img src={image.logo} alt="logo" />
        </div>
        <div className={classes.items}>
          <ul className={classes.elements}>
            <h2>Servicii</h2>
            <li>Contacteaza-ne</li>
            <li>Despre transport</li>
          </ul>
        </div>
        <div className={classes.items}>
          <ul className={classes.elements}>
            <li>Support</li>
            <li>Termeni si Conditii</li>
            <li>Politica de confidentialitate</li>
          </ul>
        </div>
        <div className={classes.downloadFrom}>
          <span>Descarca aplicatia pentru telefon din</span>
          <div className={classes.footerButtons}>
            <button>
              <img src={image.googleplay} alt="logo" />
            </button>

            <button>
              <img src={image.appstore} alt="logo" />
            </button>
          </div>
          <div className={classes.logoElement}>
            <span className={classes.logoText}>Powerd by</span>
            <button className={classes.footerLogo}>
              <img src={image.nmpclogo} alt="logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootBar;
