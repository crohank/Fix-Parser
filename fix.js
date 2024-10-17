import { 
    parseFixText, 
    fixMessagesFromText, 
    parseFixMsg 
  } from 'parse-fix';
  
  const fixText = `
  127.0.0.1:55220 -> tcp -> some.server.com:8289
      8=FIX.4.49=9935=A34=149=MY_ORDERS52=20221112-00:57:16.86256=RECEIPIENT_SYSTEM98=0108=20141=Y554=password10=150
  127.0.0.1:55220 <- tcp <- some.server.com:8289
      8=FIX.4.4\x019=00086\x0135=A\x0149=RECEIPIENT_SYSTEM\x0156=MY_ORDERS\x0134=1\x0152=20221112-00:57:17.090\x0198=0\x01108=20\x01141=Y\x0110=045\x01
  127.0.0.1:55220 -> tcp -> some.server.com:8289
      8=FIX.4.4|9=68\x0135=5|34=2|49=MY_ORDERS|52=20221112-00:57:17.862|56=RECEIPIENT_SYSTEM|10=084|
  `;
  
  const parsed = parseFixText(fixText);
  const msgsFromText = fixMessagesFromText(fixText);
  const oneParsedMsg = parseFixMsg(msgsFromText[0]);