// matheFunc.js - Math utility functions

export const generateID = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateFloatID = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const abbrNum = (number, decPlaces = 2) => {
  // Convert number to abbreviated format (e.g., 1000 -> 1K)
  decPlaces = Math.pow(10, decPlaces);
  
  const abbrev = ["K", "M", "B", "T"];
  
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    
    if (size <= number) {
      number = Math.round(number * decPlaces / size) / decPlaces;
      
      if ((number === 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }
      
      number += abbrev[i];
      break;
    }
  }
  
  return number;
};