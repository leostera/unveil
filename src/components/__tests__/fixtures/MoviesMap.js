const fixture = () => [
  {
    index: 0,
    name: "return-of-the-jedi"
  },
  {
    index: 1,
    name: "pulp-fiction",
    children: [
      {
        index: 0,
        name: "vincent-vega"
      },
      {
        index: 1,
        name: "jules"
      },
      {
        index: 2,
        name: false
      }
    ]
  },
  {
    index: 2,
    name: false
  },
  {
    index: 3,
    name: false,
    children: [
      {
        index: 0,
        name: false
      },
      {
        index: 1,
        name: 'donnie-darko'
      }
    ]
  }
];

export default fixture;
