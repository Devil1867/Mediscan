document.addEventListener("DOMContentLoaded", () => {
  const benignData = [0.00, 0.08, 0.15, 0.30, 0.83, 0.01, 0.04, 0.00, 0.85, 0.00, 0.00, 0.00, 0.90, 0.00, 0.27, 0.00, 0.02, 0.01, 0.00, 0.70]; //[cite: 8]
  const malignantData = [1.00, 0.92, 0.85, 0.70, 0.18, 0.99, 0.96, 1.00, 0.15, 1.00, 1.00, 1.00, 0.09, 0.99, 0.72, 1.00, 0.98, 0.99, 1.00, 0.30]; //[cite: 8]
  const labels = Array.from({ length: 20 }, (_, i) => `P-${i + 1}`);
  const imagePaths = Array.from({ length: 20 }, (_, i) => `lungs_img/image${i + 1}-2.jpg`); //[cite: 8]

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
            label: "Benign Probability", //[cite: 8]
            data: benignData, //[cite: 8]
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#10b981"
          },
          {
            label: "Malignant Probability", //[cite: 8]
            data: malignantData, //[cite: 8]
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
        responsive: true, //[cite: 8]
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
            title: { display: true, text: "Probability", color: "#64748b" }, //[cite: 8]
            min: 0, //[cite: 8]
            max: 1, //[cite: 8]
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          x: {
            title: { display: true, text: "Patient Number", color: "#64748b" }, //[cite: 8]
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
        labels: ["Benign", "Malignant"], //[cite: 8]
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
      const val = parseInt(this.value); //[cite: 8]

      if (val >= 1 && val <= 20) { //[cite: 8]
        if (pieChart) {
          pieChart.data.datasets[0].data = [benignData[val - 1], malignantData[val - 1]]; //[cite: 8]
          pieChart.update(); //[cite: 8]
        }
        if (imgEl) {
          imgEl.src = imagePaths[val - 1]; //[cite: 8]
          imgEl.style.display = "block"; //[cite: 8]
        }
        if (emptyState) emptyState.style.display = "none";
      } else {
        if (pieChart) {
          pieChart.data.datasets[0].data = [50, 50];
          pieChart.update(); //[cite: 8]
        }
        if (imgEl) {
          imgEl.src = "";
          imgEl.style.display = "none"; //[cite: 8]
        }
        if (emptyState) emptyState.style.display = "block";
      }
    });
  }
});