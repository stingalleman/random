import prompts from "prompts";

(async (): Promise<void> => {
  // stel de vragen
  const response = await prompts([
    {
      type: "number",
      name: "plofgetal",
      message: "Wat is het plofgetal?",
      validate: (value): string | boolean => {
        // als getal niet tussen 2 en 9 is, faal de validation
        return value > 9 || value < 2 || value === undefined ? "Getal moet tussen de 2 en de 9 liggen!" : true;
      },
    },
    {
      type: "number",
      name: "count",
      message: "Tot en met welk getal moet ik tellen?",
      validate: (value): string | boolean => {
        // als input undefined is, faal de validation
        return value === undefined ? "Je moet iets invullen..!" : true;
      },
    },
  ]);
  // define de array
  const array = [];

  // push de plofgetallen en de niet-plofgetallen in een array
  for (let i = 1; i <= response.count; i++) {
    // als getal deelbaar is door het plofgetal en geen decimalen heeft, voeg plof aan de array
    if ((i / response.plofgetal) % 1 === 0) {
      array.push("plof");
    }
    // anders, voeg het getal toe aan de array
    else {
      array.push(i);
    }
  }
  // log alles op dezelfde line
  let string = "";

  array.forEach((element) => {
    string += element += " ";
  });
  console.log(string);
})();
