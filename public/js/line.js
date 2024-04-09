function line() {
  // var vizSpec = {
  //   $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  //   description: "Stock prices of 5 Tech Companies over Time.",
  //   data: { url: "data/farm.csv" },
  //   mark: "line",
  //   encoding: {
  //     x: { field: "date", type: "temporal" },
  //     y: { field: "temp", type: "quantitative" },
  //     color: { field: "farm", type: "nominal" },
  //     tooltip: [
  //       { field: "temp", type: "quantitative" },
  //       { field: "date", type: "temporal" },
  //     ],
  //   },
  // };

  var vizSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      url: "data/farm.csv",
    },
    title: "Temperature across farms",
    encoding: {
      x: { field: "date", type: "temporal" },
      color: { field: "farm", type: "nominal" },
      y: { field: "temp", type: "quantitative" },
    },
    layer: [
      { mark: "line" },
      {
        mark: "point",
        encoding: {
          tooltip: [
            { field: "farm", type: "nominal" },
            { field: "temp", type: "quantitative" },
          ],
        },
      },
    ],
  };

  return vizSpec;
}
