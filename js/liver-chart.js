document.addEventListener("DOMContentLoaded", () => {
  const benignData = [0.55, 0.01, 0.05, 0.36, 0.10, 0.45, 0.44, 0.43, 0.48, 0.21, 0.20, 0.11, 0.16, 0.54, 0.20, 0.38, 0.01, 0.35, 0.21, 0.21]; //[cite: 7]
  const malignantData = [0.45, 0.99, 0.95, 0.64, 0.90, 0.55, 0.56, 0.57, 0.52, 0.79, 0.80, 0.89, 0.84, 0.46, 0.80, 0.62, 0.99, 0.65, 0.79, 0.79]; //[cite: 7]
  const labels = Array.from({ length: 20 }, (_, i) => `P-${i + 1}`);
  const imagePaths = Array.from({ length: 20 }, (_, i) => `liver_img/image${i + 1}.jpg`); //[cite: 7]

  Chart.defaults.color = "#94a3b8";
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // Line Chart
  const lineCtx = document.getElementById("lineChart");
  if (lineCtx) {
    new Chart(lineCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Benign Probability", //[cite: 7]
            data: benignData, //[cite: 7]
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#10b981"
          },
          {
            label: "Malignant Probability", //[cite: 7]
            data: malignantData, //[cite: 7]
            borderColor: "#f43f5e",
            backgroundColor: "rgba(244, 63, 94, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#f43f5e"
          }
        ]
      },
      options: {
        responsive: true, //[cite: 7]
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { position: "top", labels: { usePointStyle: true, boxWidth: 8, padding: 20 } },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#f8fafc",
            bodyColor: "#cbd5e1",
            borderColor: "#334155",
            borderWidth: 1
          }
        },
        scales: {
          y: {
            title: { display: true, text: "Probability", color: "#64748b" }, //[cite: 7]
            min: 0, //[cite: 7]
            max: 1, //[cite: 7]
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          x: {
            title: { display: true, text: "Patient Number", color: "#64748b" }, //[cite: 7]
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          }
        }
      }
    });
  }

  // Interactive Doughnut
  const pieCtx = document.getElementById("pieChart");
  let pieChart = null;

  if (pieCtx) {
    pieChart = new Chart(pieCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Benign", "Malignant"], //[cite: 7]
        datasets: [{
          data: [50, 50],
          backgroundColor: ["#10b981", "#f43f5e"],
          borderColor: "#111827",
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, padding: 15 } }
        },
        cutout: "68%"
      }
    });
  }

  // Input Handling
  const patientInput = document.getElementById("patientInput");
  const imgEl = document.getElementById("patientImage");
  const emptyState = document.getElementById("emptyStateText");

  if (patientInput) {
    patientInput.addEventListener("input", function () {
      const val = parseInt(this.value); //[cite: 7]

      if (val >= 1 && val <= 20) { //[cite: 7]
        if (pieChart) {
          pieChart.data.datasets[0].data = [benignData[val - 1], malignantData[val - 1]]; //[cite: 7]
          pieChart.update(); //[cite: 7]
        }
        if (imgEl) {
          imgEl.src = imagePaths[val - 1]; //[cite: 7]
          imgEl.style.display = "block"; //[cite: 7]
        }
        if (emptyState) emptyState.style.display = "none";
      } else {
        if (pieChart) {
          pieChart.data.datasets[0].data = [50, 50];
          pieChart.update(); //[cite: 7]
        }
        if (imgEl) {
          imgEl.src = "";
          imgEl.style.display = "none"; //[cite: 7]
        }
        if (emptyState) emptyState.style.display = "block";
      }
    });
  }
});