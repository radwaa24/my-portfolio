import topcontainerstyle from "../styles/popuptopcontainerstyles.module.css";
import { logo } from "../../assets/constants";
export default function PopupTopcontainer ({handleClose}){

  return(
  <div className={topcontainerstyle.topContainer}>
      <div className={topcontainerstyle.topnbuyLogo}>
          {logo}
      </div> 
      <img className={topcontainerstyle.closeBtn} src={require('../images/closeicon.png')} onClick={handleClose} />
  </div>
  )
};
