import fs from "fs/promises";

let inputNames = await fs.readdir("inputs");

export let inputs = {};

for (let inputName of inputNames) {
  let input = await loadInput(inputName);
  inputs[input.definition.type] = input;
}

async function loadInput(inputName) {
  const html = await fs.readFile("inputs/" + inputName + "/index.html", "utf8");
  const component = await fs.readFile(
    "inputs/" + inputName + "/component.js",
    "utf8"
  );
  const css = await fs.readFile("inputs/" + inputName + "/style.css", "utf8");
  const definition = JSON.parse(
    await fs.readFile("inputs/" + inputName + "/definition.json", "utf8")
  );

  let inputObj = {
    definition,
    html,
    css,
    component,
  };

  (async () => {
    try {
      await fs.stat("inputs/" + inputName + "/handler.js");
      inputObj.handler = await import("../inputs/" + inputName + "/handler.js");
    } catch {
      inputObj.handler = null;
    }
  })();

  return inputObj;
}
