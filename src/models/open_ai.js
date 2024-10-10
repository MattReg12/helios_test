import OpenAI from 'openai'; // From OpenAI's SDK (softward development kit)
import AIParent from './ai_parent.js';
import * as AIConfig from '../utils/ai_models_config.js' // Import configuration values for OpenAI LLM.

// Provides functionality to interact with Open AI
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

  // query the model
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
