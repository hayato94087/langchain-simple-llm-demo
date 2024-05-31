import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'

// model
const model = new ChatOpenAI({model: "gpt-3.5-turbo"});

// system
const systemTemplate = `あなたは入力された文章を{language}に変換するアシスタントです`; // String PromptTemplates

// Prompt Templates
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

// 動作確認
const promptTemplateResult = await promptTemplate.invoke({ language: "イタリア語", text:  "昔々あるところにおじいさんとおばあさんがいました" });
console.log(promptTemplateResult); // rowデータを表示
console.log(promptTemplateResult.toChatMessages()); // 変換後のモデルへのメッセージを確認

// parser
const parser = new StringOutputParser();

// chain
const chain = promptTemplate.pipe(model).pipe(parser);

// 英語に翻訳
const chainResult01 = await chain.invoke({ language: "英語", text: "ありがとう" });
console.log(chainResult01);

// イタリア語に翻訳
const chainResult02 = await chain.invoke({ language: "イタリア語", text: "ありがとう" });
console.log(chainResult02);

// ドイツ語に翻訳
const chainResult03 = await chain.invoke({ language: "ドイツ語", text: "ありがとう" });
console.log(chainResult03);

// 中国語に翻訳
const chainResult04 = await chain.invoke({ language: "中国語", text: "ありがとう" });
console.log(chainResult04);

// 関西弁に翻訳
const chainResult05 = await chain.invoke({ language: "関西弁", text: "ありがとう" });
console.log(chainResult05);

// 宇宙語に翻訳
const chainResult06 = await chain.invoke({ language: "宇宙語", text: "ありがとう" });
console.log(chainResult06);