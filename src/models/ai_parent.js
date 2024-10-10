import * as AIConfig from '../utils/ai_models_config.js'

class AIParent {
  // Splits data into manageable chunks of data to feed into the AI model
  // Each model will have a diffrent max prompt length as seen on line 9
  splitIntoChunks(data) {
    const chunks = []
    let startIndex = 0
    const maxPromptLength = this.maxPromptLength
    
    while (startIndex < data.length) {
      chunks.push(data.slice(startIndex, startIndex + maxPromptLength))
      startIndex += maxPromptLength
    }

    return chunks
  }

  // Feeds session data into the instation of a spcific AI model. Handles if
  // there is more than one chunk of data. 
  async summarizeSession(data) {
    const chunks = this.splitIntoChunks(data)
    let summaries = await this.#summarizeSessionChunks(chunks)

    if (summaries.length > 1) { 
      summaries = summaries.join(' ')
      return await this.query(AIConfig.SessionSummariesPrompt, summaries)
    } else {
      return summaries[0]
    }
  }
  
  // This is needed to speed up the queries to the AI model via Promise.allSettled
  async #summarizeSessionChunks(chunks) {
    const promises = chunks.map(chunk => this.query(AIConfig.SessionChunkPrompt, chunk)) // queries the LLM based on individual query implementation, chunk by chunk
    const summaries = await Promise.allSettled(promises)
    
    return summaries.map(summary => summary.value);
  }
}

export default AIParent