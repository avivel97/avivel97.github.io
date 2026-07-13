const serviceType = document.querySelector("#service-type");
const scopeFactor = document.querySelector("#scope-factor");
const hoursRange = document.querySelector("#hours-range");
const hoursNumber = document.querySelector("#hours-number");
const estimateTotal = document.querySelector("#estimate-total");
const estimateRange = document.querySelector("#estimate-range");
const resultService = document.querySelector("#result-service");
const resultRate = document.querySelector("#result-rate");
const resultUrgency = document.querySelector("#result-urgency");
const resultScope = document.querySelector("#result-scope");
const estimateFormula = document.querySelector("#estimate-formula");
const year = document.querySelector("#year");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function checkedValue(name) {
  const selected = document.querySelector('input[name="' + name + '"]:checked');
  return selected ? Number(selected.value) : 1;
}

function normalizedHours(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 4;
  }

  return Math.min(240, Math.max(4, Math.round(parsed)));
}

function updateEstimate() {
  const hours = normalizedHours(hoursNumber.value);
  const rate = checkedValue("classification");
  const urgency = checkedValue("urgency");
  const scope = Number(scopeFactor.value);
  const estimate = hours * rate * urgency * scope;
  const low = estimate * 0.9;
  const high = estimate * 1.1;

  hoursNumber.value = hours;
  hoursRange.value = Math.min(Number(hoursRange.max), hours);

  estimateTotal.textContent = money.format(estimate);
  estimateRange.textContent = "Planning range: " + money.format(low) + "-" + money.format(high);
  resultService.textContent = serviceType.value;
  resultRate.textContent = money.format(rate) + "/hour";
  resultUrgency.textContent = urgency.toFixed(2) + "x";
  resultScope.textContent = scope.toFixed(2) + "x";
  estimateFormula.textContent =
    hours + " hours x " + money.format(rate) + " x " + urgency.toFixed(2) + " x " + scope.toFixed(2);
}

hoursRange.addEventListener("input", () => {
  hoursNumber.value = hoursRange.value;
  updateEstimate();
});

hoursNumber.addEventListener("input", updateEstimate);
hoursNumber.addEventListener("change", updateEstimate);
serviceType.addEventListener("change", updateEstimate);
scopeFactor.addEventListener("change", updateEstimate);

document.querySelectorAll('input[name="classification"], input[name="urgency"]').forEach((input) => {
  input.addEventListener("change", updateEstimate);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

updateEstimate();
