import styles from "../../components/styles/settingsstyles.module.css";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  return (
    <>
      <div className="p-4">
        <div className={styles.bottomheaderaccount}>Edit Profile</div>
        <div className="flex items-center w-full">
          <div className={styles.bottomlabelaccount}>Photo</div>
          <div className="flex justify-between items-center space-x-5 ">
            <div className=" ">
              <Link to="/" className=" text-cyan-500 font-medium">
                Change profile photo
              </Link>
            </div>
            <div>
              <div
                className={`${styles.profilePhoto} rounded-full w-70 h-70 bg-gray-500`}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full ">
          <div className={styles.bottomlabelaccount}>Display name</div>
          <input
            type="text"
            className="lg:flex-grow lg:mr-32 border border-zinc-400 rounded-lg px-2 placeholder:text-black placeholder:font-medium"
            placeholder="Lorem ipsum dolor sit amet, consectetur"
          />
        </div>

        <div className="flex items-center w-full mt-5">
          <div className={styles.bottomlabelaccount}>Bio</div>
          <textarea
            rows="3"
            placeholder="Lorem ipsum dolor sit amet, consectetur tristique. Lorem ipsum dolor
            sit amet, consectetur tristique."
            className="lg:flex-grow lg:mr-32 border border-zinc-400 rounded-lg px-2 placeholder:text-black placeholder:font-medium"
          ></textarea>
        </div>

        <div className="flex items-center w-full mt-5">
          <div className={styles.bottomlabelaccount}>Gender</div>
          <textarea
            rows="2"
            placeholder="Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet,"
            className="lg:flex-grow lg:mr-32 border border-zinc-400 rounded-lg px-2 placeholder:text-black placeholder:font-medium"
          ></textarea>
        </div>
      </div>
    </>
  );
}
