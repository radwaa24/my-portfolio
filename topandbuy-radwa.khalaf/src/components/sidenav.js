import styles from "./styles/sidenavstyles.module.css";
import appstyles from "./styles/appstyles.module.css";
import { User } from "./User";
import { shuffledInterestsArr } from "../assets";

function Sidenav() {
  return (
    <nav className={`${styles.nav} hidden lg:block mt-12  `}>
      <div
        className="hidden lg:grid items-center p-4 gap-y-7 mb-10 "
        id={styles.producttabs}
      >
        <h1 className="ml-1" id={styles.header}>
          TOP
        </h1>

        {shuffledInterestsArr.slice(0, 6).map((interest) => (
          <RenderRandomInterests interest={interest} />
        ))}
      </div>

      <div className="hidden lg:grid p-2 gap-y-4 " id={styles.peopletabs}>
        <h1 className="ml-2" id={styles.header}>
          Suggested people
        </h1>
        <a href="/">
          <Peopletab />
        </a>
        <a href="/">
          <Peopletab />
        </a>
      </div>
    </nav>
  );
}

export default Sidenav;

function RenderRandomInterests({ interest }) {
  return (
    <a href="/" key={interest.value}>
      <div class="flex items-center space-x-4 font-medium text-md">
        <div class="">{interest.image}</div>
        <p class="productname">{interest.label}</p>
      </div>
    </a>
  );
}

function Peopletab() {
  return (
    <div className={styles.peoplecontainer}>
      <User />
      <p className=" font-medium my-auto w-20">Lorem</p>
      <button className={appstyles.button} href="#">
        Follow
      </button>
    </div>
  );
}

/* const sideProducts =(
    <div className={styles.productcontainer}>
        <img className={styles.productimg} src={require('./images/ellipse_product.png')} alt="product"></img>
        <p className={styles.productname}> Lorem ipsum dolor</p>
    </div>
);  */

{
  /*      <a className="nav-link" href="#">{sideProducts}</a>
        <a className="nav-link" href="#">{sideProducts}</a>
        <a className="nav-link" href="#">{sideProducts}</a>
        <a className="nav-link" href="#">{sideProducts}</a>
        <a className="nav-link" href="#">{sideProducts}</a>    */
}

/* 
       Rendering the interests array from the database
       const [interestsArr, setInterestsArr] = useState(interestArray);
/*     const endpoint = '/interests.php';
    const API = `${baseUrl}${endpoint}`;

    useEffect(() => {
        fetchData(API, setInterestsArr, onError);
      }, []);
      
    
    const onError = (error) => {   
        console.log('Error: ', error);
    };

    console.log(interestsArr); */
