const css = `
text-shadow: 0 0 20px #fefcc9,
10px -10px 30px #feec85,
-20px -20px 40px #ffae34,
20px -40px 50px #ec760c,
-20px -60px 60px #cd4606,
0 -80px 70px #973716,
10px -90px 80px #451b0e,
/* 3d effect follows */
1px 1px 0 yellow,
2px 2px 0 orange,
3px 3px 0 red;
font-size: 4vh;
`;
const css2 = `
background-color: lemonchiffon;
color: #003366;
`;

const getAllNodes = (vis) => {
  return vis.select('.role-mark').selectAll('path').nodes();
};

const getOrientation = (scales) => {
    const [s1, s2] = scales;
    const {name: s1Name, type: s1Type} = s1;
    const {name: s2Name, type: s2Type} = s2;

    return {
        x: s1Type === 'band' ? 'horizontal' : 'vertical',
        y: s2Type === 'band' ? 'horizontal' : 'vertical',
        b: s1Type === 'band' ? 'height' : 'width'
    };
}

const getMinMax = (data) => {
  const values = getPropertyValues(data);
  const keys = Object.keys(values);
  const res = [];

  keys.forEach(k => {
    res.push({
      key: k,
      min: Math.min(...values[k]),
      max: Math.max(...values[k])
    })
  });

  return res;
};

const getPropertyValues = (arr) => {
  const res = {};
  const keys = Object.keys(arr[0]);

  keys.forEach(k => {
    res[k] = arr.map(e => e[k]);
  });

  return res;
}