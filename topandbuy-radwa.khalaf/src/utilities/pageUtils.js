import React from "react";

export const reloadPage = () => {
  window.location.reload();
};

export function displayError(error) {
  return (
    <div className="bg-red-500 text-white p-4 mb-4 flex items-center justify-center">
      {error}
    </div>
  );
}

export function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
