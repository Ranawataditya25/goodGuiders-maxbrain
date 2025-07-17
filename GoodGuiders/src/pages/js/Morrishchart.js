export const Linemorris ={
    data: [
        { year: '2015', value1: 10, value2: 5 },
        { year: '2016', value1: 30, value2: 20 },
        { year: '2017', value1: 15, value2: 30 },
        { year: '2018', value1: 20, value2: 15 },
        { year: '2019', value1: 35, value2: 20 }
    ],

    series: [
        {
            type: 'line',
            xKey: 'year',
            yKey: 'value1',
            yName: 'Series a',
            interpolation: { type: "smooth" },
            stroke: "#0c4079",
            strokeOpacity: 1,
            strokeWidth: 2,
            marker: {
                size: 10,
                fill: "#0c4079",
                stroke: "#0c4079",
            },
        },
        {
            type: 'line',
            xKey: 'year',
            yKey: 'value2',
            yName: 'Series b',
            interpolation: { type: "smooth" },
            stroke: "#e2562a ",
            strokeOpacity: 1,
            strokeWidth: 2,
            marker: {
                size: 10,
                fill: "#e2562a ",
                stroke: "#e2562a ",
            },
        },
    ],
}
export const Areamorris ={
    data: [
        { y: '2006', valuea: 50, valueb: 90 },
        { y: '2007', valuea: 60, valueb: 65 },
        { y: '2008', valuea: 80, valueb: 40 },
        { y: '2009', valuea: 40, valueb: 65 },
        { y: '2010', valuea: 80, valueb: 40 },
        { y: '2011', valuea: 20, valueb: 65 },
        { y: '2012', valuea: 90, valueb: 90 }
    ],

    series: [
        {
            type: "area",
            xKey: "y",
            yKey: "valuea",
            yName: "Series A",
            stacked: true,
            interpolation: { type: "smooth" },
            stroke: "#0c4079",
            strokeOpacity: 1,
            strokeWidth: 2,
            fill: "#0c4079",
            marker: {
                size: 8,
                fill: "#0c4079",
                stroke: "#0c4079",
            },
        },
        {
            type: "area",
            xKey: "y",
            yKey: "valueb",
            yName: "Series B",
            stacked: true,
            interpolation: { type: "smooth" },
            stroke: "#e2562a ",
            strokeOpacity: 1,
            strokeWidth: 2,
            fill: "#e2562a ",
            marker: {
                size: 8,
                fill: "#e2562a ",
                stroke: "#e2562a ",
            },
        },
    ],
}
export const Barmorris ={
    data: [
        { y: '2015', valuea: 100, valueb: 90 },
        { y: '2016', valuea: 75, valueb: 65 },
        { y: '2017', valuea: 50, valueb: 40 },
        { y: '2018', valuea: 75, valueb: 65 },
        { y: '2019', valuea: 50, valueb: 40 },
        { y: '2020', valuea: 75, valueb: 65 },
        { y: '2021', valuea: 100, valueb: 90 }
    ],
    series: [
        {
            type: 'bar',
            xKey: 'y',
            yKey: 'valuea',
            yName: 'Series A',
            interpolation: { type: "smooth" },
            stroke: "#0c4079",
            strokeOpacity: 1,
            strokeWidth: 0,
            fill: "#0c4079",
            marker: {
                // size: 2,
                fill: "#0c4079",
                stroke: "#0c4079",
            },

        },
        {
            type: 'bar',
            xKey: 'y',
            yKey: 'valueb',
            yName: 'Series B',
            // interpolation: { type: "smooth" },
            // stroke: "#e2562a ",
            // strokeOpacity: 1,
            // strokeWidth: 0,
            fill: "#e2562a ",
            marker: {
                // size: 2,
                fill: "#e2562a ",
                stroke: "#e2562a ",
            },
        },
    ],
}
export const Stackbarmorris ={
    data: [
        { y: '2015', valuea: 100, valueb: 90 },
        { y: '2016', valuea: 75, valueb: 65 },
        { y: '2017', valuea: 50, valueb: 40 },
        { y: '2018', valuea: 75, valueb: 65 },
        { y: '2019', valuea: 50, valueb: 40 },
        { y: '2020', valuea: 75, valueb: 65 },
        { y: '2021', valuea: 100, valueb: 90 }
    ],
    series: [
        {
            type: "bar",
            xKey: "y",
            yKey: "valuea",
            yName: "Series A",
            stacked: true,
            stroke: "#0c4079",
            strokeOpacity: 1,
            strokeWidth: 0,
            fill: "#0c4079",
            marker: {
                fill: "#0c4079",
                stroke: "#0c4079",
            },
        },
        {
            type: "bar",
            xKey: "y",
            yKey: "valueb",
            yName: "Series B",
            stacked: true,
            stroke: "#e2562a ",
            strokeOpacity: 1,
            strokeWidth: 0,
            fill: "#e2562a ",
            marker: {
                fill: "#e2562a ",
                stroke: "#e2562a ",
            },
        },

    ],

}
export const Donutmorris ={
    data: [
        {label: "value a", value: 20},
        {label: "value b", value: 30},
        {label: "value c", value: 40},
        {label: "value d", value: 50}
    ],
    series: [
        {
            type: "donut",
            calloutLabelKey: "label",
            angleKey: "value",
            innerRadiusRatio: 0.7,
            
          },
    ],
}
