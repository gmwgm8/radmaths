document.addEventListener("DOMContentLoaded", function () {
  // Calculator type selector
  const calcType = document.getElementById("calcType");
  const allCalcs = document.querySelectorAll(".calc-options");

  calcType.addEventListener("change", function () {
    allCalcs.forEach((calc) => calc.classList.remove("active"));

    const selectedCalc = document.getElementById(this.value + "-calc");
    if (selectedCalc) {
      selectedCalc.classList.add("active");
    }

    document.getElementById("result").textContent =
      "Enter values and click calculate";
  });
});
// Main calculation function
function calculate() {
  const type = calcType.value;
  let result = "";

  try {
    switch (type) {
      case "decay":
        result = calculateDecay();
        break;
      case "activity":
        result = convertActivity();
        break;
      case "dose":
        result = convertDose();
        break;
      case "gamma":
        result = calculateGammaDose();
        break;
      case "shielding":
        result = calculateShielding();
        break;
      default:
        result = "Please select a calculation type";
    }
  } catch (e) {
    result = "Please fill in all required fields";
  }

  document.getElementById("result").textContent = result;
}

// Radioactive Decay Calculator
function calculateDecay() {
  const isotopeData = document.getElementById("isotope").value.split(",");
  const halfLife = parseFloat(isotopeData[0]);
  const hlUnit = isotopeData[1];
  const initialActivity = parseFloat(
    document.getElementById("initialActivity").value
  );
  const timeElapsed = parseFloat(document.getElementById("timeElapsed").value);
  const timeUnit = document.getElementById("timeUnit").value;
  const activityUnit = document.getElementById("activityUnit").value;

  if (!halfLife || !initialActivity || !timeElapsed) {
    throw new Error("Missing values");
  }

  const hlSeconds = convertToSeconds(halfLife, hlUnit);
  const timeSeconds = convertToSeconds(timeElapsed, timeUnit);

  const decayConstant = Math.LN2 / hlSeconds;
  const remainingActivity =
    initialActivity * Math.exp(-decayConstant * timeSeconds);
  const percentRemaining = (
    (remainingActivity / initialActivity) *
    100
  ).toFixed(2);

  return `${remainingActivity.toExponential(
    3
  )} ${activityUnit} (${percentRemaining}% remaining)`;
}

// Convert time to seconds
function convertToSeconds(value, unit) {
  const conversions = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    years: 31536000,
  };
  return value * conversions[unit];
}

// Activity Conversion Calculator
function convertActivity() {
  const value = parseFloat(document.getElementById("activityFrom").value);
  const fromUnit = document.getElementById("activityFromUnit").value;
  const toUnit = document.getElementById("activityToUnit").value;

  if (!value) {
    throw new Error("Missing values");
  }

  const toBq = {
    Bq: 1,
    kBq: 1e3,
    MBq: 1e6,
    GBq: 1e9,
    Ci: 3.7e10,
    mCi: 3.7e7,
    μCi: 3.7e4,
    nCi: 37,
  };

  const valueInBq = value * toBq[fromUnit];
  const result = valueInBq / toBq[toUnit];

  return `${result.toExponential(4)} ${toUnit}`;
}

// Dose Conversion Calculator
function convertDose() {
  const value = parseFloat(document.getElementById("doseFrom").value);
  const fromUnit = document.getElementById("doseFromUnit").value;
  const toUnit = document.getElementById("doseToUnit").value;

  if (!value) {
    throw new Error("Missing values");
  }

  const toSv = {
    Sv: 1,
    mSv: 1e-3,
    μSv: 1e-6,
    rem: 0.01,
    mrem: 1e-5,
    Gy: 1,
    mGy: 1e-3,
    rad: 0.01,
  };

  const valueInSv = value * toSv[fromUnit];
  const result = valueInSv / toSv[toUnit];

  return `${result.toExponential(4)} ${toUnit}`;
}

// Gamma Dose Rate Calculator
function calculateGammaDose() {
  const gammaConstant = parseFloat(
    document.getElementById("gammaIsotope").value
  );
  let activity = parseFloat(document.getElementById("gammaActivity").value);
  const activityUnit = document.getElementById("gammaActivityUnit").value;
  let distance = parseFloat(document.getElementById("gammaDistance").value);
  const distanceUnit = document.getElementById("gammaDistanceUnit").value;

  if (!gammaConstant || !activity || !distance) {
    throw new Error("Missing values");
  }

  // Convert activity to Curies
  if (activityUnit === "mCi") activity = activity / 1000;
  if (activityUnit === "GBq") activity = activity / 37;

  // Convert distance to meters
  if (distanceUnit === "cm") distance = distance / 100;
  if (distanceUnit === "ft") distance = distance * 0.3048;

  // Calculate dose rate using inverse square law
  const doseRate = (gammaConstant * activity) / (distance * distance);

  return `${doseRate.toFixed(3)} R/hr at ${distance.toFixed(2)}m (${(
    doseRate * 10
  ).toFixed(2)} mSv/hr)`;
}

// Shielding Calculator
function calculateShielding() {
  const initialDose = parseFloat(document.getElementById("initialDose").value);
  const density = parseFloat(document.getElementById("shieldMaterial").value);
  const thickness = parseFloat(
    document.getElementById("shieldThickness").value
  );
  const energy = parseFloat(document.getElementById("gammaEnergy").value);

  if (!initialDose || !density || !thickness || !energy) {
    throw new Error("Missing values");
  }

  // Simplified attenuation calculation (linear attenuation coefficient approximation)
  const mu = 0.08 / energy;
  const attenuation = Math.exp(-mu * density * thickness);
  const finalDose = initialDose * attenuation;
  const reduction = ((1 - attenuation) * 100).toFixed(1);

  return `${finalDose.toFixed(4)} mR/hr (${reduction}% reduction)`;
}
