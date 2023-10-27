import console from 'console';
import config from 'config';

export function createContext($vivContext) {
  // console.log(JSON.stringify($vivContext));

  let {locale} = $vivContext;
  let instruction = getInstruction();
  let gptDialog;
  locale = locale.toLowerCase();

  let kidName = getKidName(locale);
  if (locale == 'ko-kr') {
    gptDialog = `안녕? ${kidName}에 대해서 아무거나 물어봐!`;
  } else if (locale == 'en-us') {
    gptDialog = `Hello? Do you have any questions about ${kidName}?`;
  } else {
    gptDialog = `Hello? Do you have any questions about ${kidName}?!`;
    console.error('Should not be here');
  }

  let conversation = [
    { 'role': 'assistant', 'content': gptDialog }
  ];

  // instruction과 대화이력은 따로 저장한다. instruction이 잘려나가지 않도록 별도로.
  return {
    instruction,
    conversation : JSON.stringify(conversation),
    gptDialog,
    locale
  }
}

function getInstruction() {
  let instruction = '너는 친절한 인공지능 챗봇이고, 유저와 재미있는 퀴즈를 서로 주고 받을 수 있어. 응답은 50자 정도로 짧게 해줘';
  let instArr = [];
  let insCount = 0;
  try {
    insCount = config.get('instruction.count');  // instruction line 개수

    for (let i = 0; i < insCount; i +=1 ) {
      let key = 'instruction.key' + String(i);
      instArr.push(config.get(key));
    }
    if (instArr.length > 0) {
      instruction = instArr.join('\r\n');
    }
    console.log('getInstruction > ' + instruction);
  } catch (e) {
    console.log(e.toString());
  }
  return instruction;
}

function getKidName(locale) {
  try {
    let name = config.get('kid.name.' + locale.replace('-', '')); // config key는 하이픈을 허용하지 않는다.
    // console.log('kid.name = ' + name);
    return name;
  } catch (e) {
    console.log(e.toString());
  }
  return '';
}