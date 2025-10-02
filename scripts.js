// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set random background image
  setRandomBackground();

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

    // Update description and suggestion boxes
    updateInfoBoxes(this.value);
  });
});

// Set random background image
function setRandomBackground() {
  const backgroundImages = [
    "https://scx2.b-cdn.net/gfx/news/hires/2022/nuclear-reactor.jpg",
    // Add 4 more image URLs here when you have them
    // 'https://example.com/image2.jpg',
    // 'https://example.com/image3.jpg',
    // 'https://example.com/image4.jpg',
    // 'https://example.com/image5.jpg'
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedImage = backgroundImages[randomIndex];

  document.querySelector(
    ".background-image"
  ).style.backgroundImage = `url('${selectedImage}')`;
}

// Update description and suggestion boxes based on calculator type
function updateInfoBoxes(calcType) {
  const infoContent = {
    decay: `<strong>Radioactive Decay Calculator</strong><br><br>
          This calculator uses the exponential decay formula A(t) = A₀ × e^(-λt) to determine how much radioactive material remains after a given time period. The decay constant λ is calculated from the half-life using λ = ln(2)/t½.<br><br>
          <em>💡 Tip: For quick estimates, remember that activity decreases by half every half-life period. After 10 half-lives, less than 0.1% of the original activity remains.</em>`,

    activity: `<strong>Activity Conversions</strong><br><br>
          Convert between different units of radioactivity. The Becquerel (Bq) is the SI unit representing one decay per second, while the Curie (Ci) is the traditional unit equal to 3.7×10¹⁰ decays per second. Understanding these conversions is crucial for regulatory compliance and international collaboration.<br><br>
          <em>💡 Tip: 1 mCi = 37 MBq is commonly used in nuclear medicine. Many diagnostic procedures use activities in the range of 10-30 mCi (370-1110 MBq).</em>`,

    dose: `<strong>Dose Conversions</strong><br><br>
          Convert between different radiation dose units. Absorbed dose (Gray, rad) measures energy deposited per unit mass, while equivalent dose (Sievert, rem) accounts for biological effectiveness. The conversion factor between Gy and Sv depends on the radiation type and tissue being irradiated.<br><br>
          <em>💡 Tip: The annual natural background radiation dose is approximately 3 mSv (300 mrem). A chest X-ray typically delivers about 0.1 mSv.</em>`,

    gamma: `<strong>Gamma Dose Rate Calculator</strong><br><br>
          Calculate exposure rates from point sources using the inverse square law and gamma ray constants. The formula D = (Γ × A)/d² shows that dose rate decreases with the square of distance. This is vital for radiation shielding design and safety zone determination.<br><br>
          <em>💡 Tip: Doubling your distance from a point source reduces the dose rate by a factor of 4 (inverse square law). This is often the simplest and most cost-effective shielding method.</em>`,

    shielding: `<strong>Shielding Calculator</strong><br><br>
          Estimate dose reduction through various materials using the exponential attenuation formula I = I₀ × e^(-μρx). Different materials have different attenuation properties - lead is highly effective but heavy, while concrete is less effective but more practical for large structures.<br><br>
          <em>💡 Tip: Lead is about 11 times denser than water. Just 1 cm of lead can reduce 662 keV gamma rays (Cs-137) by approximately 50%.</em>`,
  };

  const defaultContent = `RadMaths provides five professional-grade calculators for health physics and radiation safety, generated according to NIST and ICRP standards:
      <br><br>
      <strong>Radioactive Decay:</strong> Calculate how much activity remains after a given time using exponential decay formulas based on half-life.
      <br><br>
      <strong>Activity Conversions:</strong> Convert between Becquerels (Bq) and Curies (Ci) and their multiples for regulatory compliance.
      <br><br>
      <strong>Dose Conversions:</strong> Convert between absorbed dose (Gray, rad) and equivalent dose (Sievert, rem) units.
      <br><br>
      <strong>Gamma Dose Rate:</strong> Calculate exposure rates from point sources using inverse square law and gamma constants.
      <br><br>
      <strong>Shielding Calculator:</strong> Estimate dose reduction through lead, steel, concrete, tungsten, or aluminum shielding.
      <br><br>
      <em>Select a calculator above for detailed information and helpful tips.</em>`;

  const infoText = document.getElementById("info-text");

  if (calcType && infoContent[calcType]) {
    infoText.innerHTML = infoContent[calcType];
  } else {
    infoText.innerHTML = defaultContent;
  }
}

// Main calculation function
function calculate() {
  const type = document.getElementById("calcType").value;
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
        result = "Select a calculation type";
    }
  } catch (e) {
    result = "Fill in all req'd fields";
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
