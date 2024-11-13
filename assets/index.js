let cpuChart,
  memoryChart,
  historicalCPUChart,
  historicalRAMChart,
  hourCPUChart,
  hourRAMChart;
let systems = [];

function showStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.classList.add("visible");
  setTimeout(() => status.classList.remove("visible"), 2000);
}

function initializeCharts() {
  //const uptimeCtx = document.getElementById("uptimeChart").getContext("2d");
  //uptimeChart = new Chart(uptimeCtx, {
  //  type: "bar",
  //  data: {
  //    labels: [],
  //    datasets: [
  //      {
  //        label: "System Uptime",
  //        data: [],
  //        backgroundColor: "#7aa2f7",
  //        borderColor: "#7aa2f7",
  //        borderWidth: 1,
  //        borderRadius: 4,
  //      },
  //      {
  //        label: "Average Uptime",
  //        data: [],
  //        type: "line",
  //        borderColor: "#9ece6a",
  //        borderWidth: 2,
  //        pointStyle: "dash",
  //        pointRadius: 0,
  //        borderDash: [5, 5],
  //        fill: false,
  //      },
  //    ],
  //  },
  //  options: {
  //    responsive: true,
  //    maintainAspectRatio: false,
  //    animation: {
  //      duration: 1000,
  //      easing: "easeInOutQuart",
  //    },
  //    plugins: {
  //      legend: {
  //        position: "bottom",
  //        labels: {
  //          color: "#a9b1d6",
  //          boxWidth: 12,
  //          font: {
  //            family: "Roboto",
  //          },
  //        },
  //      },
  //      tooltip: {
  //        callbacks: {
  //          label: function (context) {
  //            return formatUptime(context.raw);
  //          },
  //        },
  //      },
  //    },
  //    scales: {
  //      y: {
  //        beginAtZero: true,
  //        ticks: {
  //          color: "#a9b1d6",
  //          font: {
  //            family: "Roboto",
  //          },
  //          callback: function (value) {
  //            return formatUptime(value);
  //          },
  //        },
  //        grid: {
  //          color: "rgba(169, 177, 214, 0.1)",
  //          drawBorder: false,
  //        },
  //      },
  //      x: {
  //        ticks: {
  //          color: "#a9b1d6",
  //          font: {
  //            family: "Roboto",
  //          },
  //          maxRotation: 45,
  //          minRotation: 45,
  //        },
  //        grid: {
  //          color: "rgba(169, 177, 214, 0.1)",
  //          drawBorder: false,
  //        },
  //      },
  //    },
  //  },
  //});
  // Standard CPU chart
  //const cpuCtx = document.getElementById("cpuChart").getContext("2d");
  //cpuChart = new Chart(cpuCtx, {
  //  type: "line",
  //  data: {
  //    labels: [],
  //    datasets: [
  //      {
  //        label: "Maximum Load",
  //        borderColor: "#f7768e",
  //        backgroundColor: "rgba(247, 118, 142, 0.1)",
  //        borderWidth: 2,
  //        fill: "+1",
  //        data: [],
  //      },
  //      {
  //        label: "Average Load",
  //        borderColor: "#7aa2f7",
  //        backgroundColor: "rgba(122, 162, 247, 0.1)",
  //        borderWidth: 2,
  //        data: [],
  //      },
  //      {
  //        label: "Minimum Load",
  //        borderColor: "#9ece6a",
  //        backgroundColor: "rgba(158, 206, 106, 0.1)",
  //        borderWidth: 2,
  //        fill: false,
  //        data: [],
  //      },
  //    ],
  //  },
  //  options: {
  //    responsive: true,
  //    maintainAspectRatio: false,
  //    interaction: {
  //      intersect: false,
  //      mode: "index",
  //    },
  //    plugins: {
  //      legend: {
  //        position: "bottom",
  //        labels: {
  //          color: "#a9b1d6",
  //          boxWidth: 12,
  //          font: {
  //            family: "Roboto",
  //          },
  //        },
  //      },
  //      tooltip: {
  //        mode: "index",
  //        intersect: false,
  //      },
  //    },
  //    scales: {
  //      x: {
  //        type: "time",
  //        time: {
  //          unit: "minute",
  //          displayFormats: {
  //            minute: "HH:mm",
  //          },
  //        },
  //        ticks: {
  //          color: "#a9b1d6",
  //          font: {
  //            family: "Roboto",
  //          },
  //          maxRotation: 0,
  //        },
  //        grid: {
  //          color: "rgba(169, 177, 214, 0.1)",
  //          drawBorder: false,
  //        },
  //      },
  //      y: {
  //        beginAtZero: true,
  //        ticks: {
  //          color: "#a9b1d6",
  //          font: {
  //            family: "Roboto",
  //          },
  //        },
  //        grid: {
  //          color: "rgba(169, 177, 214, 0.1)",
  //          drawBorder: false,
  //        },
  //      },
  //    },
  //  },
  //});
  //
  // Current Memory Usage Doughnut
  //const memoryCtx = document.getElementById("memoryChart").getContext("2d");
  //memoryChart = new Chart(memoryCtx, {
  //  type: "doughnut",
  //  data: {
  //    labels: ["Used", "Free"],
  //    datasets: [
  //      {
  //        data: [0, 100],
  //        backgroundColor: ["#7aa2f7", "rgba(26, 27, 38, 0.5)"],
  //        borderWidth: 0,
  //      },
  //    ],
  //  },
  //  options: {
  //    responsive: true,
  //    maintainAspectRatio: false,
  //    animation: {
  //      duration: 1000,
  //      easing: "easeInOutQuart",
  //    },
  //    plugins: {
  //      legend: {
  //        position: "bottom",
  //        labels: {
  //          color: "#a9b1d6",
  //          boxWidth: 12,
  //          font: {
  //            family: "Roboto",
  //          },
  //        },
  //      },
  //    },
  //    cutout: "70%",
  //  },
  //});
  //
  // Common options for time-series charts
  const commonOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(30, 32, 47, 0.9)",
        titleColor: "#a9b1d6",
        bodyColor: "#a9b1d6",
        borderColor: "#7aa2f7",
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: "Roboto",
          size: 13,
        },
        titleFont: {
          family: "Roboto",
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        grid: {
          display: true,
          color: "rgba(169, 177, 214, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#a9b1d6",
          font: {
            family: "Roboto",
            size: 11,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(169, 177, 214, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#a9b1d6",
          font: {
            family: "Roboto",
            size: 11,
          },
          padding: 8,
          maxTicksLimit: 6,
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 3,
      },
      point: {
        radius: 0,
        hoverRadius: 5,
        hitRadius: 30,
        hoverBorderWidth: 2,
      },
    },
  };

  // Initialize the charts with common options
  const charts = [
    //{
    //  id: "historicalCPUChart",
    //  color: "#7aa2f7",
    //  label: "CPU Load Average",
    //  chart: historicalCPUChart,
    //},
    //{
    //  id: "historicalRAMChart",
    //  color: "#bb9af7",
    //  label: "RAM Usage",
    //  chart: historicalRAMChart,
    //},
    {
      id: "hourCPUChart",
      color: "#f7768e",
      label: "CPU Load Average (1h)",
      chart: hourCPUChart,
    },
    //{
    //  id: "hourRAMChart",
    //  color: "#9ece6a",
    //  label: "RAM Usage (1h)",
    //  chart: hourRAMChart,
    //},
  ];

  // In the initializeCharts function, update the charts.forEach section:

  charts.forEach(({ id, color, label }) => {
    const ctx = document.getElementById(id).getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label,
            data: [],
            borderColor: color,
            backgroundColor: color
              .replace(")", ", 0.2)")
              .replace("rgb", "rgba"),
            fill: true,
            cubicInterpolationMode: "monotone",
          },
        ],
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          x: {
            type: "time",
            time: {
              unit: id.includes("hour") ? "minute" : "hour",
              displayFormats: {
                minute: "HH:mm",
                hour: "HH:mm",
              },
            },
            ticks: {
              source: "auto",
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: id.includes("hour") ? 6 : 12,
            },
          },
          y: {
            ...commonOptions.scales.y,
            beginAtZero: true,
            title: {
              display: true,
              text: label.includes("RAM") ? "RAM Usage (%)" : "Load Average",
              color: "#a9b1d6",
              font: {
                size: 13,
                family: "Roboto",
              },
              padding: { bottom: 10 },
            },
          },
        },
      },
    });

    // Assign the chart to the corresponding variable
    if (id === "historicalCPUChart") historicalCPUChart = chart;
    else if (id === "historicalRAMChart") historicalRAMChart = chart;
    else if (id === "hourCPUChart") hourCPUChart = chart;
    else if (id === "hourRAMChart") hourRAMChart = chart;
  });
}

function updateUptimeChart(systems) {
  // Sort systems by uptime
  const sortedSystems = [...systems].sort(
    (a, b) => b.uptime_seconds - a.uptime_seconds
  );

  // Calculate average uptime
  const averageUptime = Math.floor(
    systems.reduce((sum, sys) => sum + sys.uptime_seconds, 0) / systems.length
  );

  // Prepare data for the chart
  const labels = sortedSystems.map((sys) => sys.email.split("@")[0]);
  const uptimeData = sortedSystems.map((sys) => sys.uptime_seconds);
  const averageLine = new Array(labels.length).fill(averageUptime);

  // Update chart data
  uptimeChart.data.labels = labels;
  uptimeChart.data.datasets[0].data = uptimeData;
  uptimeChart.data.datasets[1].data = averageLine;

  // Update chart
  uptimeChart.update();
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function updateUptimeList(systems) {
  const uptimeList = document.getElementById("uptimeList");
  uptimeList.innerHTML = "";

  // Calculate average uptime
  const totalUptime = systems.reduce((sum, sys) => sum + sys.uptime_seconds, 0);
  const averageUptime = Math.floor(totalUptime / systems.length);

  // Update average uptime display
  document.getElementById("averageUptime").textContent =
    formatUptime(averageUptime);

  // Sort systems by uptime (highest first)
  const sortedSystems = [...systems].sort(
    (a, b) => b.uptime_seconds - a.uptime_seconds
  );

  // Create uptime items
  sortedSystems.forEach((sys) => {
    const div = document.createElement("div");
    div.className = "uptime-item";

    const emailSpan = document.createElement("span");
    emailSpan.className = "uptime-email";
    emailSpan.textContent = sys.email.split("@")[0];

    const uptimeSpan = document.createElement("span");
    uptimeSpan.className = "uptime-value";
    uptimeSpan.textContent = formatUptime(sys.uptime_seconds);

    div.appendChild(emailSpan);
    div.appendChild(uptimeSpan);
    uptimeList.appendChild(div);
  });
}

function updateStats(data) {
  //document.getElementById("totalSystems").textContent = data.total_systems;
  //document.getElementById("totalCPUs").textContent = data.total_cpus;
  //document.getElementById("avgLoad").textContent = data.cpu_load.average;
  //document.getElementById("minLoad").textContent = data.cpu_load.min;
  //document.getElementById("maxLoad").textContent = data.cpu_load.max;
  //document.getElementById("totalRAM").textContent = `${Math.round(
    //data.ram.total / 1024 / 1024 / 1024
  //)} GB`;
  //document.getElementById("usedRAM").textContent = `${Math.round(
  //  data.ram.used / 1024 / 1024 / 1024
  //)} GB`;
  //document.getElementById(
  //  "ramUsage"
  //).textContent = `${data.ram.average_usage_percentage}%`;
}

function updateEmailList(datasites) {
  const emailList = document.getElementById("emailList");
  emailList.innerHTML = "";
  datasites.forEach((email) => {
    const div = document.createElement("div");
    div.className = "email";
    div.textContent = email;
    emailList.appendChild(div);
  });
}

function updateCharts(data) {
  // Update CPU chart with min/max/avg
  if (data.historical_data && data.historical_data.length > 0) {
    const sortedData = [...data.historical_data].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const timeLabels = sortedData.map((d) => new Date(d.timestamp));
    const avgLoads = sortedData.map((d) => d.cpu_load_avg);

    // Calculate min and max for each time point
    const minLoads = sortedData.map((d) =>
      Math.max(0, d.cpu_load_avg * (1 - Math.random() * 0.3))
    );
    const maxLoads = sortedData.map(
      (d) => d.cpu_load_avg * (1 + Math.random() * 0.3)
    );

    //cpuChart.data.labels = timeLabels;
    //cpuChart.data.datasets[0].data = maxLoads;
    //cpuChart.data.datasets[1].data = avgLoads;
    //cpuChart.data.datasets[2].data = minLoads;
    //cpuChart.update();

    // Update Memory chart
    //const totalRam = systems.reduce((sum, sys) => sum + sys.total_ram, 0);
    //const usedRam = systems.reduce((sum, sys) => sum + sys.used_ram, 0);
    //memoryChart.data.datasets[0].data = [usedRam, totalRam - usedRam];
    //memoryChart.update();

    // Filter data for different time ranges
    const now = new Date();
    const oneHourAgo = new Date(now - 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(now - 48 * 60 * 60 * 1000);

    const hourData = sortedData.filter(
      (d) => new Date(d.timestamp) >= oneHourAgo
    );
    const historicalData = sortedData.filter(
      (d) => new Date(d.timestamp) >= fortyEightHoursAgo
    );

    // Update all time series charts
    const chartUpdates = [
      //{
      //  chart: historicalCPUChart,
      //  data: historicalData,
      //  valueKey: "cpu_load_avg",
      //},
      //{
      //  chart: historicalRAMChart,
      //  data: historicalData,
      //  valueKey: "ram_usage_percent",
      //},
      {
        chart: hourCPUChart,
        data: hourData,
        valueKey: "cpu_load_avg",
      },
      //{
      //  chart: hourRAMChart,
      //  data: hourData,
      //  valueKey: "ram_usage_percent",
      //},
    ];

    // Update each chart
    chartUpdates.forEach(({ chart, data, valueKey }) => {
      if (chart && data.length > 0) {
        chart.data.labels = data.map((d) => new Date(d.timestamp));
        chart.data.datasets[0].data = data.map((d) => ({
          x: new Date(d.timestamp),
          y: d[valueKey],
        }));
        chart.update("none"); // Update without animation for better performance
      }
    });
  }
}

async function loadDashboardData() {
  try {
    showStatus("Updating dashboard...");
    console.log("Here ...")
    const response = await fetch("./cpu_tracker_bak.json");
    const data = await response.json();
    
    console.log("My CPU tracker data is: ", data)
    if (!data.historical_data || !Array.isArray(data.historical_data)) {
      console.warn("No historical data found in response");
      data.historical_data = [];
    }

    // Get the most recent data point for each system
    const latestDataPoints = new Map();
    data.historical_data.forEach((entry) => {
      const timestamp = new Date(entry.timestamp);
      data.datasites.forEach((email) => {
        const current = latestDataPoints.get(email);
        if (!current || new Date(current.timestamp) < timestamp) {
          latestDataPoints.set(email, {
            timestamp: entry.timestamp,
            cpu_load: entry.cpu_load_avg || data.cpu_load.average,
          });
        }
      });
    });

    // Create systems array with varying CPU loads
    systems = data.datasites.map((email) => {
      // Find the matching uptime data
      const uptimeData = data.user_uptimes.find((u) => u.email === email) || {
        uptime_seconds: 0,
      };

      return {
        email: email,
        // Create varying loads that stay within min-max range
        total_ram: data.ram.total / data.total_systems,
        used_ram: data.ram.used / data.total_systems,
        uptime_seconds: uptimeData.uptime_seconds, // Use the actual uptime
      };
    });

    // Update all displays
    updateCharts(data);
    //updateStats(data);
    //updateEmailList(data.datasites);
    //updateUptimeChart(systems);

    document.getElementById("lastUpdate").textContent =
      new Date().toLocaleString();
    showStatus("Dashboard updated successfully");
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    showStatus("Error updating dashboard");
  }
}

async function loadCPUTracker() {
  const response = await fetch("./cpu_tracker.json");
  const data = await response.json();
  
  dataset = data;
  //hourCPUChart = data.items;
  const commonOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(30, 32, 47, 0.9)",
        titleColor: "#a9b1d6",
        bodyColor: "#a9b1d6",
        borderColor: "#7aa2f7",
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: "Roboto",
          size: 13,
        },
        titleFont: {
          family: "Roboto",
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        grid: {
          display: true,
          color: "rgba(169, 177, 214, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#a9b1d6",
          font: {
            family: "Roboto",
            size: 11,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(169, 177, 214, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#a9b1d6",
          font: {
            family: "Roboto",
            size: 11,
          },
          padding: 8,
          maxTicksLimit: 6,
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 3,
      },
      point: {
        radius: 0,
        hoverRadius: 5,
        hitRadius: 30,
        hoverBorderWidth: 2,
      },
    },
  };
  
  if (hourCPUChart === null || hourCPUChart === undefined){
    const ctx = document.getElementById("hourCPUChart").getContext("2d");
    hourCPUChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "CPU Load Average (1h)",
            data: [],
            borderColor: "#f7768e",
            backgroundColor: "#f7768e".replace(")", ", 0.2)").replace("rgb", "rgba"),
            fill: true,
            cubicInterpolationMode: "monotone",
          },
        ],
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          x: {
            type: "time",
            time: {
              unit: "hour",
              displayFormats: {
                minute: "HH:mm",
                hour: "HH:mm",
              },
            },
            ticks: {
              source: "auto",
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6,
            },
          },
          y: {
            ...commonOptions.scales.y,
            beginAtZero: true,
            title: {
              display: true,
              text: "Load Average",
              color: "#a9b1d6",
              font: {
                size: 13,
                family: "Roboto",
              },
              padding: { bottom: 10 },
            },
          },
        },
      },
    });
    updateCPUTracker(dataset)
  } else {
    updateCPUTracker(dataset)
  }
  document.getElementById("lastUpdate").textContent =
    new Date().toLocaleString();
  showStatus("Dashboard updated successfully");
}

async function updateCPUTracker(data) {
    hourCPUChart.data.labels = data.items.map((d) => new Date(d.timestamp));
    hourCPUChart.data.datasets[0].data = data.items.map((d) => ({
      x: new Date(d.timestamp),
      y: d.cpu,
    }));
    hourCPUChart.update("none"); // Update without animation for better performance  
    
    updateEmailList(data.peers);

    console.log(data.items)
    console.log(data.items.length)
    console.log(data.items[data.items.length-1])
    document.getElementById("avgLoad").textContent = data.items[data.items.length-1].cpu.toFixed(2);
    ;
}

// Initialize charts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCPUTracker();
  // Refresh data every minute
  setInterval(loadCPUTracker, 10000);
});
