class TogetherManager {
    constructor(apiKey, model = null, maxTokens = 1000, streamTokens = false) {
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
        return result;
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
  
  // Example usage:
  // const apiKey = process.env.TOGETHER_API_KEY;
  // const togetherManager = new TogetherManager(apiKey, 'togethercomputer/llama-2-70b-chat', 1000, true);
  // const prompt = 'Tell me about the history of the United States';
  // const result = await togetherManager.performInference(prompt);
  // console.log(result);