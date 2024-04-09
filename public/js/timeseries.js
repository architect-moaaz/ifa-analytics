var ts_spec = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  repeat: ["temp", "humidity"],
  columns: 3,
  description:
    "Area charts of timeseries, with an interactive overview and filtered detail views.",
  width: 720,
  height: 480,
  padding: 5,

  data: [
    {
      name: "sensorData",
      url: "data/farm.csv",
      format: { type: "csv", parse: { temp: "number", date: "date" } },
    },
  ],

  signals: [
    {
      name: "detailDomain",
    },
  ],

  marks: [
    {
      type: "group",
      name: "detail",
      encode: {
        enter: {
          height: { value: 390 },
          width: { value: 720 },
        },
      },
      scales: [
        {
          name: "xDetail",
          type: "time",
          range: "width",
          domain: { data: "sensorData", field: "date", selection: "brush" },
          domainRaw: { signal: "detailDomain" },
        },
        {
          name: "yDetail",
          type: "linear",
          range: [390, 0], // range should be 0 to "height" set in encode=>enter
          domain: { data: "sensorData", field: "temp" },
          nice: true,
          zero: true,
        },
      ],
      axes: [
        { orient: "bottom", scale: "xDetail" },
        { orient: "left", scale: "yDetail" },
      ],
      marks: [
        {
          type: "group",
          tooltip: { content: "sensorData" },
          encode: {
            enter: {
              height: { field: { group: "height" } },
              width: { field: { group: "width" } },
              clip: { value: true },
            },
          },
          marks: [
            {
              type: "area",

              from: { data: "sensorData" },

              encode: {
                update: {
                  x: { scale: "xDetail", field: "date" },
                  y: { scale: "yDetail", field: "temp" },
                  y2: { scale: "yDetail", value: 0 },
                  fill: { value: "steelblue" },
                  tooltip: {
                    signal:
                      "{'title': 'Temperature','Temp': datum.temp, 'Date': datum.date}",
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
