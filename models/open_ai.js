
require('dotenv').config();
const OpenAI = require('openai');
const MaxTokens = 3000
const CharsPerToken = 4
const CharsPerMaxTokenCount = CharsPerToken * MaxTokens

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration)

const split_into_chunks = function(data, MaxTokens) {
  chunks = []
  startIndex = 0
  while (startIndex < data.length) {
    chunks.push(data.slice(startIndex, startIndex + CharsPerMaxTokenCount))
    startIndex += CharsPerMaxTokenCount
  }
  return chunks
}

const chunk_to_promise = async function(chunk) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: `Summarize the following rrweb events:\n ${chunk} in one short paragraph.`,
        }]
    })

    return response.choices[0].message.content
  } catch (e) {
    console.error(e)
    return ''
  }
}

const process_chunks = async function(chunks) {
  const promises = chunks.map(chunk_to_promise)
  const summaries = await Promise.allSettled(promises)
  
  return summaries.map(summary => summary.value);
}


const process_summaries = async function(summaries) {
  console.log('processing summary')
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: `Summarize the following rrweb summaries into one main summary:\n ${summaries}`,
        }]
    })

  return completion.choices[0].message.content
}


module.exports = { split_into_chunks, process_chunks, process_summaries }
