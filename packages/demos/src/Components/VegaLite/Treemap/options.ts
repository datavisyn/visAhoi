export const options = {
  title: "American jobs plan",
  description: "An example of treemap layout for hierarchical data.",
  autosize: { type: "fit", contains: "padding" },
  padding: 5,
  signals: [
    {
      name: "layout",
      value: "squarify",
    },
    {
      name: "aspectRatio",
      value: 1.6,
    },
    {
      name: "width",
      init: "containerSize()[0]",
      on: [{ events: "window:resize", update: "containerSize()[0]" }],
    },
    {
      name: "height",
      init: "containerSize()[1]",
      on: [{ events: "window:resize", update: "containerSize()[1]" }],
    },
  ],

  data: [
    {
      name: "tree",
      values: [
        {
          id: 1,
          name: "American Jobs Plan",
          size: 2308,
        },
        {
          id: 2,
          name: "Community Infrastructure",
          parent: 1,
          size: 707,
        },
        {
          id: 3,
          name: "Transportation",
          parent: 1,
          size: 621,
        },
        {
          id: 4,
          name: "Workforce Development",
          parent: 1,
          size: 580,
        },
        {
          id: 5,
          name: "Elder care",
          parent: 1,
          size: 400,
        },
        {
          id: 6,
          name: "Clean drinking water",
          parent: 2,
          size: 111,
        },
        {
          id: 7,
          name: "Broadband",
          parent: 2,
          size: 100,
        },
        {
          id: 8,
          name: "Electric",
          parent: 2,
          size: 100,
        },
        {
          id: 9,
          name: "Housing",
          parent: 2,
          size: 213,
        },
        {
          id: 10,
          name: "Schools and VA hospitals",
          parent: 2,
          size: 155,
        },
        {
          id: 11,
          name: "Other",
          parent: 2,
          size: 28,
        },
        {
          id: 12,
          name: "Electrifying vehicles",
          parent: 3,
          size: 174,
        },
        {
          id: 13,
          name: "Bridge and road repair",
          parent: 3,
          size: 115,
        },
        {
          id: 14,
          name: "Modernizing public transit",
          parent: 3,
          size: 85,
        },
        {
          id: 15,
          name: "Rail service",
          parent: 3,
          size: 80,
        },
        {
          id: 16,
          name: "Ports",
          parent: 3,
          size: 42,
        },
        {
          id: 17,
          name: "Redress historic inequities",
          parent: 3,
          size: 45,
        },
        {
          id: 18,
          name: "Infrastructure",
          parent: 3,
          size: 50,
        },
        {
          id: 19,
          name: "Other",
          parent: 3,
          size: 30,
        },
        {
          id: 20,
          name: "Research & development",
          parent: 4,
          size: 180,
        },
        {
          id: 21,
          name: "Manufacturing",
          parent: 4,
          size: 300,
        },
        {
          id: 22,
          name: "Workforce development",
          parent: 4,
          size: 100,
        },
        {
          id: 24,
          name: "Home/community-based care",
          parent: 5,
          size: 400,
        },
      ],
      transform: [
        {
          type: "stratify",
          key: "id",
          parentKey: "parent",
        },
        {
          type: "treemap",
          field: "size",
          sort: { field: "value" },
          round: true,
          method: { signal: "layout" },
          ratio: { signal: "aspectRatio" },
          size: [{ signal: "width" }, { signal: "height" }],
        },
      ],
    },
    {
      name: "nodes",
      source: "tree",
      transform: [{ type: "filter", expr: "datum.children" }],
    },
    {
      name: "leaves",
      source: "tree",
      transform: [{ type: "filter", expr: "!datum.children" }],
    },
  ],

  scales: [
    {
      name: "color",
      type: "ordinal",
      domain: { data: "nodes", field: "name" },
      range: ["#80b1d3", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
    },
    {
      name: "size",
      type: "ordinal",
      domain: [0, 1, 2, 3],
      range: [120, 25, 20, 14],
    },
    {
      name: "opacity",
      type: "ordinal",
      domain: [0, 1, 2, 3],
      range: [0.15, 0.5, 0.8, 1.0],
    },
  ],

  marks: [
    {
      type: "rect",
      from: { data: "nodes" },
      interactive: false,
      encode: {
        enter: {
          fill: { scale: "color", field: "name" },
        },
        update: {
          x: { field: "x0" },
          y: { field: "y0" },
          x2: { field: "x1" },
          y2: { field: "y1" },
        },
      },
    },
    {
      type: "rect",
      from: { data: "leaves" },
      encode: {
        enter: {
          stroke: { value: "#fff" },
          tooltip: { signal: "{'title': datum.name, 'value': datum.size}" },
        },
        update: {
          x: { field: "x0" },
          y: { field: "y0" },
          x2: { field: "x1" },
          y2: { field: "y1" },
          fill: { value: "transparent" },
        },
        hover: {
          fill: { value: "red" },
        },
      },
    },
    {
      type: "text",
      from: { data: "nodes" },
      interactive: false,
      encode: {
        enter: {
          font: { value: "Helvetica Neue, Arial" },
          align: { value: "center" },
          baseline: { value: "middle" },
          fill: { value: "#000" },
          text: { field: "name" },
          fontSize: { scale: "size", field: "depth" },
          fillOpacity: { scale: "opacity", field: "depth" },
        },
        update: {
          x: { signal: "0.5 * (datum.x0 + datum.x1)" },
          y: { signal: "0.5 * (datum.y0 + datum.y1)" },
        },
      },
    },
  ],
};
