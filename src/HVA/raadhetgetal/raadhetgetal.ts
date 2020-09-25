import _ from "underscore";
import prompts from "prompts";

(async (): Promise<void> => {
  // geneer de random getallen
  let getallenArray = [];
  const getallenArray2 = [];
  while (getallenArray.length < 3) {
    const r = Math.floor(Math.random() * 10) + 1;
    if (getallenArray.indexOf(r) === -1) getallenArray.push(r);
    if (getallenArray2.indexOf(r) === -1) getallenArray2.push(r);
  }

  // status dingen
  let done = false;
  let guesses = 0;
  let correct = 0;

  // stel de vragen
  while (!done) {
    guesses++;

    const response = await prompts(
      {
        type: "text",
        name: "nummer",
        message: "Geef 3 verschillende getallen tussen 1 en 10, gescheiden door spaties",
        validate: (value): string | boolean => {
          return value.match(/^(([1-9]|10)([ \t])([1-9]|10)([ \t])([1-9]|10))$/gm) ? true : "Input is niet valid!";
        },
      });

    // parse de user input
    const responseArray = [parseFloat(/^(([1-9]|10)([ \t])([1-9]|10)([ \t])([1-9]|10))$/gm.exec(response.nummer)[2]), parseFloat(/^(([1-9]|10)([ \t])([1-9]|10)([ \t])([1-9]|10))$/gm.exec(response.nummer)[4]), parseFloat(/^(([1-9]|10)([ \t])([1-9]|10)([ \t])([1-9]|10))$/gm.exec(response.nummer)[6])];

    // kijk of user input gelijk is aan de random getallen
    if (_.intersection(getallenArray, responseArray).length > 0) {
      getallenArray = getallenArray.filter(item => !_.intersection(getallenArray, responseArray).includes(item));
      correct++;
    }

    if (getallenArray.length === 0) { // als alle getallen zijn geraden
      console.log(`\nU heeft ${guesses} keer geraden.\nCorrecte getallen: ${getallenArray2}`);
      done = true;
    } else { // anders dit
      console.log(`Aantal correcte getallen: ${correct}`);
    }
  }
})();
