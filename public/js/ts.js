function timeseries(_param) {
  var vizSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      url: "http://localhost:3000/",
      format: {
        type: "json",
        property: "data",
      },
    },

    vconcat: [
      {
        width: 480,
        mark: "area",

        encoding: {
          x: {
            field: "date",
            type: "temporal",
            scale: { domain: { param: "brush" } },
            axis: { title: "" },
          },
          y: { field: _param, type: "quantitative" },
          tooltip: [
            { field: _param, type: "quantitative" },
            { field: "date", type: "temporal" },
          ],
          color: { value: "#0e3040" },
        },
      },
      {
        width: 480,
        height: 60,
        mark: "area",
        params: [
          {
            name: "brush",
            select: { type: "interval", encodings: ["x"] },
          },
        ],
        encoding: {
          x: {
            field: "date",
            type: "temporal",
          },
          y: {
            field: _param,
            type: "quantitative",
            axis: { tickCount: 3, grid: false },
          },
        },
      },
    ],
  };

  return vizSpec;
}
