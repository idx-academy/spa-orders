import fs from "fs-extra";

export const fixCucumber = (file) => {
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) throw err;

    const newValue = data.replace(/#/g, "");

    fs.writeFile(file, newValue, "utf-8", function (err) {
      if (err) throw err;
    });
  });
};
