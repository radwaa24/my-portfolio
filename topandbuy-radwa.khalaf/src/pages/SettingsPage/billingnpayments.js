import styles from "../../components/styles/settingsstyles.module.css";
import { Link } from "react-router-dom";

export default function BillingNPayments() {
  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M6.80317 19.81C6.38612 19.81 6.0212 19.671 5.70841 19.393C5.39562 19.1149 5.23923 18.7906 5.23923 18.4198V5.21319H4.9525C4.73095 5.21319 4.54523 5.14619 4.39535 5.01219C4.24547 4.87818 4.17053 4.71213 4.17053 4.51405C4.17053 4.31595 4.24547 4.15125 4.39535 4.01996C4.54523 3.88866 4.73095 3.82302 4.9525 3.82302H9.07089C9.07089 3.62221 9.14583 3.45617 9.29571 3.32487C9.44559 3.19358 9.63131 3.12793 9.85287 3.12793H15.1703C15.3918 3.12793 15.5776 3.19454 15.7274 3.32777C15.8773 3.46099 15.9523 3.62608 15.9523 3.82302H20.0706C20.2922 3.82302 20.4779 3.89001 20.6278 4.02401C20.7777 4.15802 20.8526 4.32407 20.8526 4.52216C20.8526 4.72026 20.7777 4.88495 20.6278 5.01625C20.4779 5.14754 20.2922 5.21319 20.0706 5.21319H19.7839V18.4198C19.7839 18.7906 19.6275 19.1149 19.3147 19.393C19.0019 19.671 18.637 19.81 18.22 19.81H6.80317ZM6.80317 5.21319V18.4198H18.22V5.21319H6.80317ZM9.56614 15.7322C9.56614 15.9291 9.64152 16.0942 9.79226 16.2274C9.94303 16.3606 10.1298 16.4273 10.3527 16.4273C10.5755 16.4273 10.7608 16.3606 10.9085 16.2274C11.0562 16.0942 11.1301 15.9291 11.1301 15.7322V7.87769C11.1301 7.68075 11.0547 7.51566 10.904 7.38244C10.7532 7.24921 10.5664 7.1826 10.3436 7.1826C10.1207 7.1826 9.93541 7.24921 9.7877 7.38244C9.64 7.51566 9.56614 7.68075 9.56614 7.87769V15.7322ZM13.8931 15.7322C13.8931 15.9291 13.9684 16.0942 14.1192 16.2274C14.2699 16.3606 14.4567 16.4273 14.6796 16.4273C14.9025 16.4273 15.0877 16.3606 15.2354 16.2274C15.3832 16.0942 15.457 15.9291 15.457 15.7322V7.87769C15.457 7.68075 15.3816 7.51566 15.2309 7.38244C15.0801 7.24921 14.8933 7.1826 14.6705 7.1826C14.4476 7.1826 14.2623 7.24921 14.1146 7.38244C13.9669 7.51566 13.8931 7.68075 13.8931 7.87769V15.7322Z"
        fill="#CD0000"
      />
    </svg>
  );
  return (
    <>
      <div className="lg:px-6 px-3 pt-4">
        <div className={styles.bottomheaderaccount}>Card info</div>

        <div className="flex items-center  lg:mx-8 lg:space-x-4">
          <div className={`${styles.bottomlabelbilling} space-y-2`}>
            <div>bank account</div>
            <div>owner name</div>
          </div>
          <div component="form" className="flex-grow">
            <input
              type="text"
              className={`${styles.paper} p-2 lg:w-2/3`}
              placeholder="Lorem ipsum dolor sit amet, consectetur"
            />
          </div>
        </div>

        <div className="flex items-center lg:mx-8 lg:space-x-4">
          <h1 className={`${styles.bottomlabelbilling}`}>IBAN number</h1>
          <div component="form" className="lg:flex  flex-grow pt-8 lg:pt-0">
            <input
              type="text"
              className={`${styles.paper} p-2 lg:w-2/3 mr-5 mb-2 lg:mb-0`}
              placeholder="24536576545345676543"
            />
            <Link to={"/"} className="text-decoration-none">
              <div className="flex items-center ">
                <div className="flex items-center mt-1">{trashIcon}</div>
                <div className={`${styles.deletebtn}`}>Delete IBAN</div>
              </div>
            </Link>
          </div>
        </div>

        <div className={`${styles.bottomheaderbilling} mt-4`}>Paypal</div>
        <div className="flex items-center lg:mx-8 lg:space-x-4">
          <h1 className={`${styles.bottomlabelbilling}`}>Email address</h1>
          <div component="form" className="lg:flex flex-grow pt-8 lg:pt-0">
            <input
              type="text"
              className={`${styles.paper} p-2 lg:w-2/3 mr-5 mb-2 lg:mb-0"`}
              placeholder="username@Example.com"
            />
            <Link to={"/"} className="text-decoration-none ">
              <div className="flex items-center ">
                <div className="flex items-center mt-1">{trashIcon}</div>
                <div className={`${styles.deletebtn}`}>Delete Email</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
