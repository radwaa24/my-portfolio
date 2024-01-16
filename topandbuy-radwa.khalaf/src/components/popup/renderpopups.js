import {LoginRegister} from "../loginsignup"
import LoginSuccessPopup from "./loginsuccesspopup";
import Modal from "./modal";



const RenderPopup = ({ component, handleClose }) => {

  switch (component) {
    case "login":
      return (
        <Modal isOpen={true} onClose={handleClose}>
          <LoginRegister onClose={handleClose}/>
        </Modal>
      );
    case "loginSuccess":
      return (
        <Modal isOpen={true} onClose={handleClose}>
          <LoginSuccessPopup onClose={handleClose}/>
        </Modal>
      );
        
    default:
      return null;
  }
}

export default RenderPopup
