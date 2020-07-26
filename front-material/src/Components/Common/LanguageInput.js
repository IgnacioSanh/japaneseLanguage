import jap from "../Library/japanese.json";

const transformWord = (language, word) => {
  switch (language) {
    case "japanese":
      let dictionary = jap;
      const keys = Object.keys(dictionary);
      const similar = keys.filter((key) => word.includes(key));
      if (similar.length >= 1) {
        similar.sort((a, b) => b.length - a.length);
        let key = similar[0];
        word = word.replace(key, jap[key]);
      }
      return word;

    default:
      return word;
  }
};

export default transformWord;
