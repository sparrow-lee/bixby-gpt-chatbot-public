import console from 'console';
import http from 'http';
import secret from 'secret';

export function callApi(context, query) {
  
  let newMessages = [
      {'role': 'system', 'content': context.instruction}
  ];

  let conversation = JSON.parse(context.conversation);

  conversation.push(
      {'role': 'user', 'content': query},
  );

  newMessages = newMessages.concat(conversation);
  let body = {
    messages: newMessages,
    model: 'gpt-3.5-turbo'
  }

  let nextGptDialog = call(body);

  conversation.push(
      {'role': 'assistant', 'content': nextGptDialog},
  );
  
  // Context 길이 제약이 있기때문에 적당히 잘라내자.
  if (conversation.length > 10) {
    conversation = conversation.slice(conversation.length - 10);
  }

  return {
    instruction : context.instruction,
    conversation : JSON.stringify(conversation),
    gptDialog : nextGptDialog,
    locale : context.locale
  };
}


function call(body) {
  let url = 'https://api.openai.com/v1/chat/completions';

  let options = {
    format: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + secret.get('gpt.key'),
    },
  };

  let response = http.postUrl(url, body, options);
  console.log(JSON.stringify(response));
  return response.choices[0].message.content;
}