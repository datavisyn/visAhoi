export const importCsv = async (url) => {
    const data = [];
    await fetch(url).then(response => response.text()).then(text => {
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      lines.forEach((line, i) => {
        if (i != 0) {
          let obj = {};
          line.split(",").forEach((l, j) => {
            obj[`${headers[j]}`] = l;
          })
          data.push(obj)
        }
      });
      return data;
    }).catch(e => console.error(e));
    return data;
  }
