// Scientific calculator state
let sciState = {
  currentValue: "0",
  expression: "",
  lastResult: null,
  waitingForOperand: false,
};

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set random background image
  setRandomBackground();

  // Hide convert button and result section on page load
  const resultSection = document.querySelector(".result-section");
  const convertBtn = document.querySelector(".convert-btn");
  resultSection.style.display = "none";
  convertBtn.style.display = "none";

  // Calculator type selector
  const calcType = document.getElementById("calcType");
  const allCalcs = document.querySelectorAll(".calc-options");

  calcType.addEventListener("change", function () {
    allCalcs.forEach((calc) => calc.classList.remove("active"));

    const selectedCalc = document.getElementById(this.value + "-calc");
    if (selectedCalc) {
      selectedCalc.classList.add("active");
    }

    // Hide result section for scientific calculator
    if (this.value === "scientific") {
      resultSection.style.display = "none";
      convertBtn.style.display = "none";
      sciState = {
        currentValue: "0",
        expression: "",
        lastResult: null,
        waitingForOperand: false,
      };
      updateSciDisplay();
    } else if (this.value) {
      // Show button and result section for all other calculator types
      resultSection.style.display = "flex";
      convertBtn.style.display = "flex";
      document.getElementById("result").textContent = "Results appear here";
    }

    // Update description and suggestion boxes
    updateInfoBoxes(this.value);
  });
});

// Set random background image
function setRandomBackground() {
  const backgroundImages = [
    "https://scx2.b-cdn.net/gfx/news/hires/2022/nuclear-reactor.jpg",
    "https://imgix.bustle.com/inverse/1e/bf/42/7e/d2af/4bbb/9553/91fa350281aa.jpeg?w=825&h=550&fit=crop&crop=faces",
    "https://imgix.bustle.com/inverse/0b/b5/23/53/480d/4b3e/b41c/fb68ca6d52b9/the-remnants-of-an-abandoned-classroom-in-a-pre-school-in-pripyat.jpeg?w=825&h=551&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1772376920750-dac1470b1bad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/tdih-a-bomb-testing-gettyimages-3091730?_a=BAVAZGB00",
    "https://nsarchive.gwu.edu/sites/default/files/thumbnails/image/16.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedImage = backgroundImages[randomIndex];

  document.querySelector(
    ".background-image"
  ).style.backgroundImage = `url('${selectedImage}')`;
}

// Scientific Calculator Functions
function sciCalc(input) {
  switch (input) {
    case "clear":
      sciState.currentValue = "0";
      sciState.expression = "";
      sciState.lastResult = null;
      sciState.waitingForOperand = false;
      break;

    case "backspace":
      if (sciState.currentValue.length > 1) {
        sciState.currentValue = sciState.currentValue.slice(0, -1);
      } else {
        sciState.currentValue = "0";
      }
      break;

    case "=":
      try {
        const result = evaluateExpression(
          sciState.expression + sciState.currentValue
        );
        sciState.lastResult = result;
        sciState.currentValue = result.toString();
        sciState.expression = "";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      if (sciState.expression && !sciState.waitingForOperand) {
        const result = evaluateExpression(
          sciState.expression + sciState.currentValue
        );
        sciState.currentValue = result.toString();
      }
      sciState.expression = sciState.currentValue + " " + input + " ";
      sciState.waitingForOperand = true;
      break;

    case "sin":
    case "cos":
    case "tan":
      try {
        const value = parseFloat(sciState.currentValue);
        const radians = (value * Math.PI) / 180;
        let result;
        if (input === "sin") result = Math.sin(radians);
        else if (input === "cos") result = Math.cos(radians);
        else result = Math.tan(radians);
        sciState.currentValue = result.toString();
        sciState.expression = input + "(" + value + ")";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "sqrt":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = Math.sqrt(value).toString();
        sciState.expression = "√(" + value + ")";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "power":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = Math.pow(value, 2).toString();
        sciState.expression = value + "²";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "log":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = Math.log10(value).toString();
        sciState.expression = "log(" + value + ")";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "ln":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = Math.log(value).toString();
        sciState.expression = "ln(" + value + ")";
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "exp":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = Math.exp(value).toString();
        sciState.expression = "e^" + value;
        sciState.waitingForOperand = true;
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case "pi":
      sciState.currentValue = Math.PI.toString();
      sciState.waitingForOperand = true;
      break;

    case "percent":
      try {
        const value = parseFloat(sciState.currentValue);
        sciState.currentValue = (value / 100).toString();
      } catch (e) {
        sciState.currentValue = "Error";
      }
      break;

    case ".":
      if (!sciState.currentValue.includes(".")) {
        sciState.currentValue += ".";
      }
      sciState.waitingForOperand = false;
      break;

    default:
      // Number input
      if (sciState.waitingForOperand || sciState.currentValue === "0") {
        sciState.currentValue = input;
        sciState.waitingForOperand = false;
      } else {
        sciState.currentValue += input;
      }
  }

  updateSciDisplay();
}

function evaluateExpression(expr) {
  // Simple expression evaluator
  expr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
  return eval(expr);
}

function updateSciDisplay() {
  document.getElementById("sci-expression").textContent = sciState.expression;
  document.getElementById("sci-result").textContent = sciState.currentValue;
}

// Update description and suggestion boxes based on calculator type
function updateInfoBoxes(calcType) {
  const infoContent = {
    scientific: `<strong>Scientific Calculator</strong><br><br>
          A full-featured scientific calculator with basic arithmetic operations, trigonometric functions (sin, cos, tan), logarithmic functions (log, ln), exponential functions, square root, and power operations. Also includes mathematical constants like π.<br><br>
          <em>💡 Tip: Trigonometric functions work in degrees. For radians, convert your angle first by multiplying by 180/π.</em>`,

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

  const defaultContent = `RadMaths provides professional-grade calculators for health physics and radiation safety, generated according to NIST and ICRP standards:
      <br><br>
      <strong>Scientific Calculator:</strong> Full-featured calculator with trigonometric, logarithmic, and exponential functions.
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
  const activityUnit = document.getElementById("activityUnit").value;

  // Get time values
  const time1 = document.getElementById("time1").value.trim();
  const time2 = document.getElementById("time2").value.trim();

  if (!halfLife || !initialActivity || !time1 || !time2) {
    throw new Error("Missing values");
  }

  // Parse datetime in MM/DD/YYYY HH:MM format
  const parseDateTime = (dateTimeStr) => {
    // Expected format: MM/DD/YYYY HH:MM
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,3}):(\d{2})$/;
    const match = dateTimeStr.match(regex);
    
    if (!match) {
      throw new Error("Invalid format. Use MM/DD/YYYY HH:MM");
    }
    
    const month = parseInt(match[1]);
    const day = parseInt(match[2]);
    const year = parseInt(match[3]);
    const hours = parseInt(match[4]);
    const minutes = parseInt(match[5]);
    
    // Validate ranges
    if (month < 1 || month > 12 || day < 1 || day > 31 || 
        hours < 0 || minutes < 0 || minutes > 59) {
      throw new Error("Invalid date/time values");
    }
    
    // Create Date object (month is 0-indexed in JavaScript Date)
    const date = new Date(year, month - 1, day, hours, minutes, 0);
    
    // Return timestamp in milliseconds, then convert to seconds
    return date.getTime() / 1000;
  };

  const t1Seconds = parseDateTime(time1);
  const t2Seconds = parseDateTime(time2);
  const timeSeconds = Math.abs(t2Seconds - t1Seconds);

  const hlSeconds = convertToSeconds(halfLife, hlUnit);
  const decayConstant = Math.LN2 / hlSeconds;

  // Using the formula: A(t) = A₀ × e^(-λ × (t2 - t1))
  const remainingActivity =
    initialActivity * Math.exp(-decayConstant * timeSeconds);

  return `${remainingActivity.toFixed(3)} ${activityUnit}`;
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

  return `${result.toFixed(3)} ${toUnit}`;
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

  return `${result.toFixed(3)} ${toUnit}`;
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

  return `${doseRate.toFixed(3)} R/hr at ${distance.toFixed(3)}m (${(
    doseRate * 10
  ).toFixed(3)} mSv/hr)`;
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
  const reduction = ((1 - attenuation) * 100).toFixed(3);

  return `${finalDose.toFixed(3)} mR/hr (${reduction}% reduction)`;
}
