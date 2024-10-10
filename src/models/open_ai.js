import OpenAI from 'openai';
import AIParent from './ai_parent.js';
import * as AIConfig from '../utils/ai_models_config.js'


// const configuration = {
//   apiKey: process.env.OPENAI_API_KEY,
// };

// const openai = new OpenAI(configuration)

class OpenAIInterface extends AIParent {
  constructor() {
    super()
    this.connection = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.model = AIConfig.OpenAIModel
    this.maxTokens = AIConfig.OpenAIMaxTokens
    this.maxPromptLength = AIConfig.OpenAIMaxPromptLength
  }

  async query(prompt, data) {
    try {
      const response = await this.connection.chat.completions.create({
        model: this.model,
        messages: [
          {
              role: "user",
              content: `${prompt} ${data}`,
          }]
      })
      
      return response.choices[0].message.content
    } catch (e) {
      console.error(e)
      return ''
    }
  }
}

export default OpenAIInterface

// export const split_into_chunks = function(data, llm) {
//   const chunks = []
//   let startIndex = 0
//   const maxPromptLength = llm.maxPromptLength
  
//   while (startIndex < data.length) {
//     chunks.push(data.slice(startIndex, startIndex + maxPromptLength))
//     startIndex += maxPromptLength
//   }

//   return chunks
// }

// export const query_chunks = async function(chunks) {
//   const promises = chunks.map(chunk_to_promise)
//   const summaries = await Promise.allSettled(promises)
  
//   return summaries.map(summary => summary.value);
// }


// const chunk_to_promise = async function(chunk) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: this.model,
//       messages: [
//         {
//             role: "user",
//             content: `Summarize the following rrweb events:\n ${chunk} in one short paragraph.`,
//         }]
//     })
    
//     return response.choices[0].message.content
//   } catch (e) {
//     console.error(e)
//     return ''
//   }
// }

// export const process_summaries = async function(summaries) {
//   console.log('processing summary')
//   const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//             role: "user",
//             content: `Summarize the following rrweb summaries into one main summary:\n ${summaries}`,
//         }]
//     })

//   return completion.choices[0].message.content
// }
