export const css = `
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

export const css2 = `
background-color: lemonchiffon;
color: #003366;
`;

export function getAllNodes(vis: any) {
  return vis.selectAll('.role-mark').selectAll('path').nodes();
}

export function getOrientation(scales: any) {
  const [s1, s2] = scales;
  const { type: s1Type } = s1;
  const { type: s2Type } = s2;

  return {
    x: s1Type === 'band' ? 'horizontal' : 'vertical',
    y: s2Type === 'band' ? 'horizontal' : 'vertical',
    b: s1Type === 'band' ? 'height' : 'width',
  };
}

function getPropertyValues(arr: any) {
  const res: any = {};
  const keys = Object.keys(arr[0]);

  keys.forEach((k) => {
    res[k] = arr.map((e: any) => e[k]);
  });

  return res;
}

export function getMinMax(data: any) {
  const values = getPropertyValues(data);
  const keys = Object.keys(values);
  const res: {key: string, min: number, max: number}[] = [];

  keys.forEach((k) => {
    res.push({
      key: k,
      min: Math.min(...values[k]),
      max: Math.max(...values[k]),
    });
  });

  return res;
}

export function createCR(color = 'white') {
  return `<div class="colorRect" style="background: ${color}"></div>`;
}
