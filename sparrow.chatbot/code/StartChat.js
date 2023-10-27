import console from 'console';
import fail from 'fail';
import * as contextLib from "./lib/context.js";
import * as gpt from "./lib/gptApi.js";


export default function (input) {
  const { context, query } = input
  console.log('StartChat : ', query);
  
  let nextContext = gpt.callApi(context, query);

  // 대화를 계속 이어가게 하기 위해서, 자신을 다시 호출하게 함. StartChat.model.bxb 의 output 부분 참조.
  throw fail.checkedError(
      'Go Next chat',
      'NextChat',
      {
        nextContext,
      }
  );
}