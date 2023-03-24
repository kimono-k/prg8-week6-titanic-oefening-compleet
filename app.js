import { DecisionTree } from "./libraries/decisiontree.js";
import { VegaTree } from "./libraries/vegatree.js";

const csvFile = "./data/titanic.csv"; // dataset
const trainingLabel = "Survived"; // x.csv kolomnaam = gender
const ignoredColumns = ["SibSp"]; // genegeerde kolom

let survivorHeading = document.getElementById("survivor");

// Gebruik Papi Parse om 1 van de datasets te laden
function loadData() {
  Papa.parse(csvFile, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => trainModel(results.data), // train het model met deze data
  });
}

//
// MACHINE LEARNING - Bouw de Decision Tree
//
function trainModel(data) {
  let decisionTree = new DecisionTree({
    ignoredAttributes: ignoredColumns,
    trainingSet: data,
    categoryAttr: trainingLabel,
  });
  classifier(decisionTree);
}

function classifier(decisionTree) {
  // Classificeren van de data
  let person = {
    Name: "Cumings, Mrs. John Bradley",
    Sex: "female",
  };
  predictor(decisionTree, person);
}

function predictor(decisionTree, person) {
  let prediction = decisionTree.predict(person);
  console.log(
    `${person.Name} is gonna ${prediction === "1" ? "survive" : "die"}`
  );
  survivorHeading.innerText = `${person.Name} is gonna ${
    prediction === "1" ? "survive" : "die"
  }`;
  visualizer(decisionTree);
}

function visualizer(decisionTree) {
  let json = decisionTree.toJSON();
  new VegaTree("#view", 2300, 1000, json);
}

loadData();
