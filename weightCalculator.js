// add event listener to the calculateButton
document
  .getElementById("calculateButton")
  .addEventListener("click", calculateWeight);

// Array of plate weights (in pounds and kilos)
const plateWeightsPounds = [45, 35, 25, 10, 5, 2.5];
const plateWeightsKilos = [20, 15, 10, 5, 2.5, 1.25];

function calculateWeight() {
  const toPoundsChecked = document.getElementById("toPounds").checked; // retrieves toPounds
  const barSelectValue = document.getElementById("barSelect").value; //gets bar value
  const weightToAdd = parseFloat(document.getElementById("textBox").value); // converts input value from textBox to floating point number.

  // Function to convert pounds to kilograms
function poundsToKilos(pounds) {
  return pounds * 0.453592;
}

// Function to convert kilograms to pounds
function kilosToPounds(kilos) {
  return kilos / 0.453592;
}


  
  // Determine bar weight based on selection
  let barWeight =
    barSelectValue === "barWeightOne"
      ? toPoundsChecked
        ? 45
        : 20
      : toPoundsChecked
      ? 35
      : 16;

  //checks if input weight is a number and greater than the weight of the bar, otherwise displays an error.
  if (isNaN(weightToAdd) || weightToAdd < barWeight) {
    document.getElementById("result").textContent =
      "Please enter a valid total weight greater than the bar weight.";
    return;
  }

  // Calculate weight needed on each side of the bar by subtracting bar weight from desired weight and dividing by 2
  let weightPerSide = (weightToAdd - barWeight) / 2;
  //call method calculatePlatesNeeded w/ the weight to add per side and which unit to use
  let platesNeeded = calculatePlatesNeeded(
    weightPerSide,
    toPoundsChecked ? plateWeightsPounds : plateWeightsKilos
  );

  // Display the result
  let resultText = `Plates per side: `;
  //convert platesNeeded into an array of key-value pairs, which weight and how many of each
  for (const [weight, count] of Object.entries(platesNeeded)) {
    if (count > 0) {
      // checks to see if any plates are needed
      resultText += `${count}x${weight} `;
    }
  }

    // Conversion logic for displaying both pounds and kilos
    let totalWeightInPounds, totalWeightInKilos;

    if (toPoundsChecked) {
      totalWeightInPounds = weightToAdd;
      totalWeightInKilos = poundsToKilos(weightToAdd).toFixed(2);
    } else {
      totalWeightInKilos = weightToAdd;
      totalWeightInPounds = kilosToPounds(weightToAdd).toFixed(2);
    }

  resultText += `<br>Total weight: ${totalWeightInPounds} lbs, \n ${totalWeightInKilos} kg \n`
  document.getElementById("result").innerHTML = resultText; //displays plates needed
}

function calculatePlatesNeeded(weightPerSide, plateWeights) {
  let weightRemaining = weightPerSide; //keeps track of the remaining weight needed per side
  let plates = {}; // empty obj to store the count of each plate needed

  //iterate over each plate weight in the array
  for (let weight of plateWeights) {
    let count = Math.floor(weightRemaining / weight); //how many more of those plates can fit into remaining weight
    weightRemaining -= count * weight; //updates remaining weight
    plates[weight] = count; //stores the count of plates needed in plate obj
  }

  return plates; //returns the array
}
