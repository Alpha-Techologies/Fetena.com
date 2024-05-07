const {default: Together} = require('together-ai');

class TogetherManager {
    constructor(apiKey, model = null, maxTokens = 0, streamTokens = false) {

      this.together = new Together({
        auth: apiKey,
      });
      this.model = model;
      this.maxTokens = maxTokens;
      this.streamTokens = streamTokens;
    }
  
    async performInference(prompt) {
      try {
        if (!this.model) {
          console.error("Model not specified.");
          return null;
        }
  
        const result = await this.together.inference(this.model, {
          prompt: prompt,
          max_tokens: this.maxTokens,
          stream_tokens: this.streamTokens,
        });
        
        if (this.streamTokens) {
          const reader = result.getReader();
          let output = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // console.log(typeof(JSON.parse(nesw TextDecoder().decode(value).replaceAll('\\', ''))))
            output += (new TextDecoder().decode(value)).replaceAll('\\', '');
          }
          return output;
        } else {
          return result.replaceAll('\\', '');
        }

      } catch (error) {
        console.error("Error occurred during inference:", error);
        return null;
      }
    }
  
    updateModel(model) {
      this.model = model;
    }
  
    updateMaxTokens(maxTokens) {
      this.maxTokens = maxTokens;
    }
  
    updateStreamTokens(streamTokens) {
      this.streamTokens = streamTokens;
    }
  }
  
  module.exports = TogetherManager
  // Example usage:
  // const apiKey = process.env.TOGETHER_API_KEY;
  // const togetherManager = new TogetherManager(apiKey, 'togethercomputer/llama-2-70b-chat', 1000, true);
  // const prompt = 'Tell me about the history of the United States';
  // const result = await togetherManager.performInference(prompt);
  // console.log(result);