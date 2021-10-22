var dps = randomData(new Date(2017, 0, 1), 365);

var chart1 = new CanvasJS.Chart("chartContainer1", {
  exportEnabled: true,
  title: {
    text: "Chart with Date Selector"
  },
  data: [{
    type: "line",
    dataPoints: dps
  }]
});
var chart2 = new CanvasJS.Chart("chartContainer2", {
  zoomEnabled: true,
  toolTip: {
    enabled: false
  },
  rangeChanged: rangeChanged,
  axisX: {
    gridThickness: 0,
    lineThickness: 0,
    tickThickness: 0
  },
  axisY: {
    gridThickness: 0,
    lineThickness: 0,
    tickThickness: 0,
    labelFormatter: function() {
      return " "
    },
  },
  data: [{
    type: "line",
    highlightEnabled: false,
    dataPoints: dps
  }]
});
chart1.render();
chart2.render();

var axisXMin = chart1.axisX[0].get("minimum");
var axisXMax = chart1.axisX[0].get("maximum");

$(function() {
  $("#fromDate").val(CanvasJS.formatDate(axisXMin, "D MMM YYYY"));
  $("#toDate").val(CanvasJS.formatDate(axisXMax, "D MMM YYYY"));
  $("#fromDate").datepicker({
    dateFormat: "d M yy"
  });
  $("#toDate").datepicker({
    dateFormat: "d M yy"
  });
});

$("#date-selector").change(function() {
  var minValue = $("#fromDate").val();
  var maxValue = $("#toDate").val();

  if (new Date(minValue).getTime() < new Date(maxValue).getTime()) {
    chart1.axisX[0].set("minimum", new Date(minValue));
    chart1.axisX[0].set("maximum", new Date(maxValue));
  }
});

$(".period").click(function() {
  var period = this.id;
  var minValue;
  minValue = new Date(axisXMax);

  switch (period) {
    case "1m":
      minValue.setMonth(minValue.getMonth() - 1);
      break;
    case "3m":
      minValue.setMonth(minValue.getMonth() - 3);
      break;
    case "6m":
      minValue.setMonth(minValue.getMonth() - 6);
      break;
    case "1y":
      minValue.setYear(minValue.getFullYear() - 1);
      break;
    default:
      minValue = axisXMin;
  }

  chart1.axisX[0].set("minimum", new Date(minValue));
  chart1.axisX[0].set("maximum", new Date(axisXMax));
});

//Function to generate random data
function randomData(startX, numberOfY) { //startDate:Jan 1 2017, numberOfY: 365
  var xValue, yValue = 0;
  var dataPoints = [];
  for (var i = 0; i < 400; i += 1) {
    xValue = new Date(startX.getTime() + (i * 24 * 60 * 60 * 1000));
    yValue += (Math.random() * 10 - 5) << 0;

    dataPoints.push({
      x: xValue,
      y: yValue
    });
  }
  return dataPoints;
}

function rangeChanged(e) {
  if (chart2.axisX[0].stripLines.length > 0) {
    chart2.axisX[0].stripLines[0].remove();
  }
  chart1.axisX[0].set("minimum", e.chart.axisX[0].get("viewportMinimum"));
  chart1.axisX[0].set("maximum", e.chart.axisX[0].get("viewportMaximum"));
  chart2.axisX[0].addTo("stripLines", {
    startValue: e.chart.axisX[0].get("viewportMinimum"),
    endValue: e.chart.axisX[0].get("viewportMaximum"),
    color: "rgba(153,178,181,0.7)"
  });
  e.chart.axisX[0].set("viewportMinimum", null);
  e.chart.axisX[0].set("viewportMaximum", null);
}
