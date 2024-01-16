import { useEffect, useState } from "react";
import intereststyles from "../styles/intereststyles.module.css";
import { baseUrl } from "../constants/consts";
import { fetchData } from "../../utilities";
import PopupTopcontainer from "./popuptopcontainer";

//TODO:
/* 
  Use interestArray.js to render the interests in a grid covering the whole width of the screen.
  0. Add the selected interests to the state.
  1. The selected categories are not being stored in the state.
  2. The continue button is not being disabled when less than 3 categories are selected.
  3. The continue button is not being disabled when the user clicks on a category that is already selected.
  4. The item is not being removed from the selectedInterests array when the user clicks on a category that is already selected.
  5. The items are not rendering in a grid covering the whole width of the screen.  
  6. Clean the code 
  7. Add error messages
*/

export default function InterestsPopup({ onClose }) {
  const [interests, setInterests] = useState([]);
  const selectedInterestId = useState("null");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleChange = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
    console.log("Selected Interests: ", ...selectedInterests, interestId);
  };

  const submitUsersInterests = () => {
    if (selectedInterests.length >= 3) {
      console.log(
        "Continue clicked with at least 3 categories selected:",
        selectedInterests
      );

      onClose();
      setSelectedInterests([]);
    } else {
      console.log("Select at least 3 categories before proceeding.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    fetchData(API, setInterests, onError);
  }, []);

  const onError = (error) => {
    console.log("Error: ", error);
  };

  /*   console.log(interests); */

  return (
    <div className="flex-grow" id={intereststyles.interests__container}>
      <PopupTopcontainer handleClose={handleClose} />
      <h1>Interests</h1>
      <p>
        Pick 3 or more things you'd like to see in your <br />
        home feed
      </p>

      <div
        className="flex flex-row flex-wrap"
        id={intereststyles.interest_wrapper}
      >
        {interests.map((interest) => {
          const emoji = String.fromCodePoint(parseInt(interest.img, 16));
          const isSelected = selectedInterestId === interest.id;

          return (
            <div
              key={interest.id}
              className={`${intereststyles.product__frame} ${
                isSelected ? intereststyles.selected : ""
              }`}
              onClick={() => handleChange(interest.id)}
            >
              <p className={intereststyles.interest__name}>
                <span>{emoji}</span>
                {interest.name}
              </p>
            </div>
          );
        })}
      </div>

      <button
        className={`${intereststyles.continueButton} ${
          selectedInterests.length < 3 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        name="continueBtn"
        onClick={submitUsersInterests}
        disabled={selectedInterests.length < 3}
      >
        Continue
      </button>
    </div>
  );
}

const endpoint = "/interests.php?action=getInterests";
const API = `${baseUrl}${endpoint}`; /* 'http://localhost/interests.php?action=getInterests'; */
