export const circleData = {
  series: [
    {
      data: [400, 430, 448, 470, 540],
    },
  ],
  options: {
    chart: {
      type: "bar",
      //   height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "1 Etoile",
        "2 Etoiles",
        "3 Etoiles",
        "4 Etoiles",
        "5 Etoiles",
      ],
    },
  },
};
