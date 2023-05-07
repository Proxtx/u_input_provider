import { auth } from "./meta.js";
import { inputs } from "../private/inputs.js";

export const getInputs = async (pwd) => {
  if (!(await auth(pwd))) return;
  return Object.keys(inputs);
};

export const getInput = async (pwd, inputName) => {
  if (!(await auth(pwd))) return;
  let input = inputs[inputName];
  return { html: input.html, css: input.css, component: input.component };
};

export const getInputConfig = async (pwd, inputName) => {
  if (!(await auth(pwd))) return;
  return inputs[inputName].definition.config
    ? inputs[inputName].definition.config
    : {};
};

export const evaluateInput = async (pwd, inputName, inputValue) => {
  if (!(await auth(pwd))) return;
  return await inputs[inputName].handler.evaluate(inputValue);
};
