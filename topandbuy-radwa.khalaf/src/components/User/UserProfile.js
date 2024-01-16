
import styles from "../styles/sidenavstyles.module.css";



const otherusers ={
    name: "Lorem"
};


export default function User() {


    return (
    <img className={styles.peopleimg} src={require('../images/icon_profile.png')} alt={'Photo of '+ otherusers.name} />
    )
};
