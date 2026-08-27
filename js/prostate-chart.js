document.addEventListener("DOMContentLoaded", () => {
  const benignData = [0, 0.02, 0.02, 0.2, 0.01, 0.22, 0.01, 0.22, 0.13, 0.1, 0.33, 0.22, 0, 0.18, 0.07, 0.09, 0.6, 0.03, 0.02, 0.73]; //[cite: 9]
  const malignantData = [1, 0.98, 0.98, 0.8, 0.99, 0.78, 0.99, 0.78, 0.87, 0.9, 0.67, 0.78, 1, 0.82, 0.93, 0.91, 0.4, 0.97, 0.98, 0.27]; //[cite: 9]
  const labels = Array.from({ length: 20 }, (_, i) => `P-${i + 1}`);
  const imagePaths = Array.from({ length: 20 }, (_, i) => `prostate_img/${i + 1}output.jpg`); //[cite: 9]

  // Global Chart Defaults for Dark Clinical Theme
  Chart.defaults.color = "#94a3b8";
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // 1. Cohort Line Chart
  const lineCtx = document.getElementById("lineChart");
  if (lineCtx) {
    new Chart(lineCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Benign Probability", //[cite: 9]
            data: benignData, //[cite: 9]
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#10b981"
          },
          {
            label: "Malignant Probability", //[cite: 9]
            data: malignantData, //[cite: 9]
            borderColor: "#f43f5e",
            backgroundColor: "rgba(244, 63, 94, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#f43f5e"
          }
        ]
      },
      options: {
        responsive: true, //[cite: 9]
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#f8fafc",
            bodyColor: "#cbd5e1",
            borderColor: "#334155",
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          y: {
            title: { display: true, text: "Risk Probability (0.0 - 1.0)", color: "#64748b" },
            min: 0, //[cite: 9]
            max: 1, //[cite: 9]
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          x: {
            title: { display: true, text: "Patient Identifier", color: "#64748b" },
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          }
        }
      }
    });
  }

  // 2. Interactive Patient Doughnut/Pie Chart
  const pieCtx = document.getElementById("pieChart");
  let pieChart = null;

  if (pieCtx) {
    pieChart = new Chart(pieCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Benign", "Malignant"], //[cite: 9]
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
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, padding: 15 }
          }
        },
        cutout: "68%"
      }
    });
  }

  // 3. Patient Lookup Listener
  const patientInput = document.getElementById("patientInput");
  const imgEl = document.getElementById("patientImage");
  const emptyState = document.getElementById("emptyStateText");

  if (patientInput) {
    patientInput.addEventListener("input", function () {
      const val = parseInt(this.value); //[cite: 9]

      if (val >= 1 && val <= 20) { //[cite: 9]
        if (pieChart) {
          pieChart.data.datasets[0].data = [benignData[val - 1], malignantData[val - 1]]; //[cite: 9]
          pieChart.update(); //[cite: 9]
        }

        if (imgEl) {
          imgEl.src = imagePaths[val - 1]; //[cite: 9]
          imgEl.style.display = "block"; //[cite: 9]
        }
        if (emptyState) emptyState.style.display = "none";
      } else {
        if (pieChart) {
          pieChart.data.datasets[0].data = [50, 50];
          pieChart.update(); //[cite: 9]
        }

        if (imgEl) {
          imgEl.src = "";
          imgEl.style.display = "none"; //[cite: 9]
        }
        if (emptyState) emptyState.style.display = "block";
      }
    });
  }
});