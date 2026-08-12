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
const costForm = document.querySelector("#cost-form");
const customerName = document.querySelector("#customer-name");
const companyName = document.querySelector("#company-name");
const customerEmail = document.querySelector("#customer-email");
const problemDescription = document.querySelector("#problem-description");
const websiteField = document.querySelector("#website-field");
const formRequestButton = document.querySelector("#form-request");
const submitRequestButton = document.querySelector("#submit-request");
const requestStatus = document.querySelector("#request-status");
const requestDocument = document.querySelector("#request-document");
const requestPreview = document.querySelector("#request-preview");
const requestDownload = document.querySelector("#request-download");
const year = document.querySelector("#year");
let requestUrl = "";
let fontAssetsPromise;

const feedbackEndpoint = "https://d5dv69havegcc43mif1c.avjje9e3.apigw.yandexcloud.net/feedback";

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

function translated(value) {
  return window.siteI18n && typeof window.siteI18n.t === "function"
    ? window.siteI18n.t(value)
    : value;
}

function initializeMobileAccordions() {
  const breakpoint = window.matchMedia("(max-width: 640px)");
  const toggles = Array.from(document.querySelectorAll("[data-mobile-accordion]"));

  function syncPanels() {
    toggles.forEach((toggle) => {
      const panel = document.getElementById(toggle.getAttribute("data-mobile-accordion"));
      if (!panel) return;

      if (breakpoint.matches) {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        panel.classList.toggle("is-mobile-collapsed", !expanded);
      } else {
        toggle.setAttribute("aria-expanded", "true");
        panel.classList.remove("is-mobile-collapsed");
      }
    });
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (!breakpoint.matches) return;
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      syncPanels();
    });
  });

  breakpoint.addEventListener("change", syncPanels);
  syncPanels();
}

function getEstimate() {
  const hours = normalizedHours(hoursNumber.value);
  const rate = checkedValue("classification");
  const urgency = checkedValue("urgency");
  const scope = Number(scopeFactor.value);
  const estimate = hours * rate * urgency * scope;
  const low = estimate * 0.9;
  const high = estimate * 1.1;

  return {
    hours,
    rate,
    urgency,
    scope,
    estimate,
    low,
    high,
    service: serviceType.value,
    classification: rate === 100 ? "Outstanding" : "Regular",
    urgencyLabel: urgency === 1.5 ? "Rush" : urgency === 1.25 ? "Priority" : "Standard",
    scopeLabel: scopeFactor.selectedOptions[0].textContent.split("|")[0].trim(),
  };
}

function updateEstimate() {
  const state = getEstimate();

  hoursNumber.value = state.hours;
  hoursRange.value = Math.min(Number(hoursRange.max), state.hours);

  estimateTotal.textContent = money.format(state.estimate);
  estimateRange.textContent = "Planning range: " + money.format(state.low) + "-" + money.format(state.high);
  resultService.textContent = state.service;
  resultRate.textContent = money.format(state.rate) + "/hour";
  resultUrgency.textContent = state.urgency.toFixed(2) + "x";
  resultScope.textContent = state.scope.toFixed(2) + "x";
  estimateFormula.textContent =
    state.hours + " hours x " + money.format(state.rate) + " x " + state.urgency.toFixed(2) + " x " + state.scope.toFixed(2);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

function loadPdfFonts() {
  if (!fontAssetsPromise) {
    fontAssetsPromise = Promise.all([
      fetch("NotoSans-Regular.ttf").then((response) => {
        if (!response.ok) throw new Error("Unable to load the regular PDF font.");
        return response.arrayBuffer();
      }),
      fetch("NotoSans-Bold.ttf").then((response) => {
        if (!response.ok) throw new Error("Unable to load the bold PDF font.");
        return response.arrayBuffer();
      }),
    ])
      .then(([regular, bold]) => ({
        regular: arrayBufferToBase64(regular),
        bold: arrayBufferToBase64(bold),
      }))
      .catch((error) => {
        fontAssetsPromise = null;
        throw error;
      });
  }

  return fontAssetsPromise;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function safeFilename(value) {
  const slug = value
    .trim()
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return slug || "customer";
}

async function createRequestPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    throw new Error("The PDF generator did not load. Please refresh the page and try again.");
  }

  const fonts = await loadPdfFonts();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  doc.addFileToVFS("NotoSans-Regular.ttf", fonts.regular);
  doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
  doc.addFileToVFS("NotoSans-Bold.ttf", fonts.bold);
  doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold");
  doc.setFont("NotoSans", "normal");

  const state = getEstimate();
  const created = new Date();
  const pageWidth = 210;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const footerLimit = 276;
  let y = 0;

  function setText(size, style = "normal", color = [31, 43, 47]) {
    doc.setFont("NotoSans", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  }

  function drawHeader(firstPage = false) {
    if (firstPage) {
      doc.setFillColor(13, 87, 82);
      doc.rect(0, 0, pageWidth, 46, "F");
      setText(10, "bold", [255, 208, 197]);
      doc.text("COMMERCIAL SERVICES", margin, 15);
      setText(24, "bold", [255, 255, 255]);
      doc.text("Project Request", margin, 29);
      setText(9.5, "normal", [220, 239, 235]);
      doc.text("Applied analytics, decision consulting, and analytical development", margin, 38);
      y = 59;
      return;
    }

    doc.setDrawColor(15, 118, 110);
    doc.setLineWidth(1.2);
    doc.line(margin, 14, pageWidth - margin, 14);
    setText(9, "bold", [13, 87, 82]);
    doc.text("PROJECT REQUEST - CONTINUED", margin, 22);
    y = 31;
  }

  function newPage() {
    doc.addPage();
    drawHeader(false);
  }

  function ensureSpace(height) {
    if (y + height > footerLimit) {
      newPage();
    }
  }

  function addSectionTitle(title) {
    ensureSpace(16);
    setText(9, "bold", [15, 118, 110]);
    doc.text(title.toLocaleUpperCase(), margin, y);
    doc.setDrawColor(207, 201, 188);
    doc.setLineWidth(0.35);
    doc.line(margin, y + 3, pageWidth - margin, y + 3);
    y += 11;
  }

  function addDetailRow(label, value) {
    const valueLines = doc.splitTextToSize(String(value), contentWidth - 48);
    const rowHeight = Math.max(9, valueLines.length * 5 + 4);
    ensureSpace(rowHeight);
    setText(9, "bold", [89, 100, 104]);
    doc.text(label, margin, y + 4);
    setText(10, "normal", [31, 43, 47]);
    doc.text(valueLines, margin + 48, y + 4);
    doc.setDrawColor(229, 225, 216);
    doc.setLineWidth(0.25);
    doc.line(margin, y + rowHeight - 1, pageWidth - margin, y + rowHeight - 1);
    y += rowHeight;
  }

  function addParagraph(text, size = 10, color = [31, 43, 47]) {
    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = 5.2;

    lines.forEach((line) => {
      ensureSpace(lineHeight + 2);
      setText(size, "normal", color);
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += 3;
  }

  drawHeader(true);
  addDetailRow("Prepared for", customerName.value.trim());
  addDetailRow("Company", companyName.value.trim());
  addDetailRow("Email", customerEmail.value.trim());
  addDetailRow("Prepared by", "Vladimir Belolipetskiy");
  addDetailRow("Date", formatDate(created));
  y += 7;

  addSectionTitle("Problem description");
  addParagraph(problemDescription.value.trim());

  addSectionTitle("Engagement parameters");
  addDetailRow("Service class", state.service);
  addDetailRow("Task class", state.classification + " - " + money.format(state.rate) + "/hour");
  addDetailRow("Urgency", state.urgencyLabel + " - " + state.urgency.toFixed(2) + "x");
  addDetailRow("Scope certainty", state.scopeLabel + " - " + state.scope.toFixed(2) + "x");
  addDetailRow("Expected effort", state.hours + " hours");
  y += 8;

  ensureSpace(39);
  doc.setFillColor(220, 239, 235);
  doc.roundedRect(margin, y, contentWidth, 33, 2, 2, "F");
  setText(9, "bold", [13, 87, 82]);
  doc.text("WORKING ESTIMATE", margin + 7, y + 9);
  setText(22, "bold", [13, 87, 82]);
  doc.text(money.format(state.estimate), margin + 7, y + 22);
  setText(9.5, "normal", [54, 65, 69]);
  doc.text("Planning range: " + money.format(state.low) + "-" + money.format(state.high), pageWidth - margin - 7, y + 21, { align: "right" });
  y += 43;

  addSectionTitle("Estimate basis");
  addParagraph(
    state.hours + " hours x " + money.format(state.rate) + "/hour x " + state.urgency.toFixed(2) + " urgency x " + state.scope.toFixed(2) + " scope factor."
  );
  addParagraph(
    "This is a preliminary budget estimate, not a binding quotation. Final scope, deliverables, schedule, and price will be agreed after a diagnostic discussion. Data acquisition, travel, taxes, and third-party software are not included.",
    8.5,
    [89, 100, 104]
  );

  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(207, 201, 188);
    doc.setLineWidth(0.3);
    doc.line(margin, 283, pageWidth - margin, 283);
    setText(7.5, "normal", [106, 116, 119]);
    doc.text("Vladimir Belolipetskiy | Commercial services", margin, 289);
    doc.text("Page " + page + " of " + pages, pageWidth - margin, 289, { align: "right" });
  }

  return {
    blob: doc.output("blob"),
    filename: "project-request-" + safeFilename(companyName.value || customerName.value) + "-" + created.toISOString().slice(0, 10) + ".pdf",
  };
}

async function formRequest(event) {
  event.preventDefault();

  if (!costForm.reportValidity()) {
    return;
  }

  formRequestButton.disabled = true;
  formRequestButton.textContent = translated("Creating PDF preview...");
  requestStatus.classList.remove("is-error", "is-success");
  requestStatus.textContent = translated("Creating your PDF preview...");

  try {
    const request = await createRequestPdf();

    if (requestUrl) {
      URL.revokeObjectURL(requestUrl);
    }

    requestUrl = URL.createObjectURL(request.blob);
    requestPreview.src = requestUrl + "#toolbar=1&navpanes=0";
    requestDownload.href = requestUrl;
    requestDownload.download = request.filename;
    requestDocument.hidden = false;
    requestStatus.textContent = translated("PDF preview created. Review it below or download the file.");
    requestDocument.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    requestStatus.classList.add("is-error");
    requestStatus.textContent = translated(error instanceof Error ? error.message : "The PDF could not be created. Please try again.");
  } finally {
    formRequestButton.disabled = false;
    formRequestButton.textContent = translated("Preview");
  }
}

function buildRequestMessage(state) {
  return [
    "Problem description:",
    problemDescription.value.trim(),
    "",
    "Project estimate:",
    "Service: " + state.service,
    "Task classification: " + state.classification,
    "Expected hours: " + state.hours,
    "Hourly rate: " + money.format(state.rate),
    "Urgency: " + state.urgencyLabel + " (" + state.urgency.toFixed(2) + "x)",
    "Scope certainty: " + state.scopeLabel + " (" + state.scope.toFixed(2) + "x)",
    "Working estimate: " + money.format(state.estimate),
    "Planning range: " + money.format(state.low) + "-" + money.format(state.high),
  ].join("\n");
}

function getCaptchaToken() {
  if (window.smartCaptcha && typeof window.smartCaptcha.getResponse === "function") {
    return window.smartCaptcha.getResponse() || "";
  }

  const tokenInput = document.querySelector('#request-captcha input[name="smart-token"]');
  return tokenInput ? tokenInput.value : "";
}

function resetCaptcha() {
  if (window.smartCaptcha && typeof window.smartCaptcha.reset === "function") {
    window.smartCaptcha.reset();
  }
}

async function submitRequest() {
  if (!costForm.reportValidity()) {
    return;
  }

  const captchaToken = getCaptchaToken();

  if (!captchaToken) {
    requestStatus.classList.remove("is-success");
    requestStatus.classList.add("is-error");
    requestStatus.textContent = translated("Complete the security check before submitting.");
    return;
  }

  const state = getEstimate();
  const originalLabel = submitRequestButton.textContent;
  submitRequestButton.disabled = true;
  formRequestButton.disabled = true;
  submitRequestButton.textContent = translated("Submitting...");
  requestStatus.classList.remove("is-error", "is-success");
  requestStatus.textContent = translated("Submitting your request...");

  try {
    const response = await fetch(feedbackEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: customerName.value.trim(),
        email: customerEmail.value.trim(),
        company: companyName.value.trim(),
        category: "Commercial project request",
        message: buildRequestMessage(state),
        page_url: window.location.href,
        website: websiteField.value,
        smart_token: captchaToken,
      }),
    });

    const responseText = await response.text();
    let result = {};

    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch {
        result = {};
      }
    }

    if (!response.ok) {
      throw new Error(result.error || "The request could not be submitted.");
    }

    const reference = result.id || result.request_id;
    requestStatus.classList.add("is-success");
    requestStatus.textContent = reference
      ? translated("Request submitted successfully.") + " " + translated("Reference:") + " " + reference
      : translated("Request submitted successfully.");
  } catch (error) {
    requestStatus.classList.add("is-error");
    requestStatus.textContent = translated(error instanceof Error ? error.message : "The request could not be submitted. Please try again.");
  } finally {
    resetCaptcha();
    submitRequestButton.disabled = false;
    formRequestButton.disabled = false;
    submitRequestButton.textContent = originalLabel;
  }
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

costForm.addEventListener("submit", formRequest);
submitRequestButton.addEventListener("click", submitRequest);

window.addEventListener("beforeunload", () => {
  if (requestUrl) {
    URL.revokeObjectURL(requestUrl);
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

initializeMobileAccordions();
updateEstimate();
