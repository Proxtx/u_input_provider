import config from "@proxtx/config";
import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";

export const api = await genCombine(
  config.unifyGui,
  "public/api.js",
  genModule
);
export const meta = await genCombine(
  config.unifyGui,
  "public/meta.js",
  genModule
);
export const input = await genCombine(
  config.unifyGui,
  "public/input.js",
  genModule
);

export const auth = async (pwd) => {
  return await meta.auth(pwd);
};
