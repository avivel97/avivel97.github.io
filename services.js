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
const problemDescription = document.querySelector("#problem-description");
const formRequestButton = document.querySelector("#form-request");
const requestStatus = document.querySelector("#request-status");
const requestDocument = document.querySelector("#request-document");
const requestPreview = document.querySelector("#request-preview");
const requestDownload = document.querySelector("#request-download");
const year = document.querySelector("#year");
let requestUrl = "";
let fontAssetsPromise;

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

  addSectionTitle("Professional profile");
  addDetailRow("ORCID", "https://orcid.org/0009-0003-4219-0287");
  addDetailRow("GitHub", "https://github.com/avivel97");

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
  formRequestButton.textContent = "Creating PDF...";
  requestStatus.classList.remove("is-error");
  requestStatus.textContent = "Creating your project request...";

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
    requestStatus.textContent = "Request created. Preview it below or download the PDF.";
    requestDocument.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    requestStatus.classList.add("is-error");
    requestStatus.textContent = error instanceof Error ? error.message : "The PDF could not be created. Please try again.";
  } finally {
    formRequestButton.disabled = false;
    formRequestButton.textContent = "Form a request";
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

window.addEventListener("beforeunload", () => {
  if (requestUrl) {
    URL.revokeObjectURL(requestUrl);
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

updateEstimate();
