// Simple Line Graph
function zLine() {
  var vizSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: { url: "data/farm.csv" },
    vconcat: [
      {
        width: 480,
        mark: "line",
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            scale: { domain: { selection: "brush", encoding: "x" } },
            axis: { title: "" },
          },
          color: {
            field: "farm",
            type: "nominal",
            scale: { scheme: "tealblues" },
          },
          y: {
            field: "temp",
            type: "quantitative",
          },
        },
      },
      {
        width: 480,
        height: 60,
        mark: "line",
        selection: { brush: { type: "interval", encodings: ["x"] } },
        encoding: {
          x: { field: "date", type: "temporal" },
          color: { field: "farm", type: "nominal" },
          y: {
            field: "temp",
            type: "quantitative",
            axis: { tickCount: 3, grid: false },
          },
        },
      },
    ],
  };

  return vizSpec;
}

// Line graph with highlight
function zLineHighlighter(_param, _cscheme) {
  var vizSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
      url: "http://localhost:3000/",
      format: {
        type: "json",
        property: "data",
      },
    },
    title: {
      text: _param + " across farms",
      anchor: "middle",
    },
    vconcat: [
      {
        width: 500,
        encoding: {
          x: { field: "date", type: "temporal", title: "date" },
          y: { field: _param, type: "quantitative", title: _param },
          color: {
            field: "farm",
            type: "nominal",
            scale: { scheme: _cscheme },
          },
          opacity: {
            condition: {
              param: "hover",
              value: 1,
            },
            value: 0.2,
          },
        },
        layer: [
          {
            description:
              "transparent layer to make it easier to trigger selection",
            params: [
              {
                name: "hover",
                select: {
                  type: "point",
                  fields: ["farm"],
                  on: "mouseover",
                },
              },
            ],
            mark: { type: "line", strokeWidth: 8, stroke: "transparent" },
          },
          {
            mark: "line",
          },
          {
            encoding: {
              x: {
                field: "date",
                type: "temporal",
                scale: { domain: { selection: "brush", encoding: "x" } },
                axis: { title: "" },
              },

              y: {
                field: _param,
                type: "quantitative",
              },
            },
            layer: [
              {
                mark: { type: "circle" },
                encoding: {
                  tooltip: [
                    {
                      field: "date",
                      type: "temporal",
                      format: "%Y",
                    },
                    { field: _param, type: "quantitative" },
                  ],
                },
              },
              //   {
              //     mark: { type: "text", align: "left", dx: 4 },
              //     encoding: {
              //       text: { field: "temp", type: "nominal" },
              //     },
              //   },
            ],
          },
        ],
        config: { view: { stroke: null } },
      },
      {
        width: 500,
        height: 60,
        mark: "area",
        selection: { brush: { type: "interval", encodings: ["x"] } },
        encoding: {
          x: { field: "date", type: "temporal" },
          color: { field: "farm", type: "nominal" },
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
