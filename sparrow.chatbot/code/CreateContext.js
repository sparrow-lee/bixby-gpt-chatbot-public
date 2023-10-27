import console from 'console';
import * as contextLib from "./lib/context.js";

export default function (input) {
  console.log('CreateContext');
  const { $vivContext } = input;
  let context = contextLib.createContext($vivContext);

  return context
}

