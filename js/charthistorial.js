window.onload = function () {
  var dataPoints = [];

  var stockChart = new CanvasJS.StockChart("chartContainer", {
    theme: "dark2",
    title: {
      text: "StockChart Title"
    },
    charts: [{
      data: [{
        type: "line", //Change it to "spline", "area", "column"
        dataPoints: dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date(2021, 10, 22),
        maximum: new Date(2021, 12, 31)
      }
    }
  });

  $.getJSON("https://canvasjs.com/data/docs/btcusd2018.json", function (data) {
    for (var i = 0; i < data.length; i++) {
      dataPoints.push({ x: new Date(data[i].date), y: Number(data[i].close) });
    }

    stockChart.render();
  })
}