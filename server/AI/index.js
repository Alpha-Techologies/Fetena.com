const { default: Together } = require("together-ai");
const { createParser } = require("eventsource-parser");
const APIError = require("./../utils/apiError");


class TogetherManager {
  constructor(apiKey, maxTokens = 100, streamTokens = false) {
    this.together = new Together({
      auth: apiKey,
    });
    this.model = "togethercomputer/llama-2-70b-chat";
    this.maxTokens = maxTokens;
    this.streamTokens = streamTokens;
    (this.temperature = 0.7),
      (this.top_k = 5),
      (this.top_p = 0.7),
      (this.repetition_penalty = 1);
    this.response = "";
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
        temperature: this.temperature,
        top_k: this.top_k,
        top_p: this.top_p,
        repetition_penalty: this.repetition_penalty,
      });
      
      if (this.streamTokens) {
        const reader = result.getReader();
        const parser = createParser(this.onParse);
        let output = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          // console.log(typeof(JSON.parse(nesw TextDecoder().decode(value).replaceAll('\\', ''))))

          let chunkValue = (new TextDecoder().decode(value));
          // console.log('chunkValue', chunkValue)
          // let chunk = parser.feed(chunkValue);
          parser.feed(chunkValue);
          // console.log('chunk',chunk)

          // output += " " + chunkValue
          output += " " + this.response
        }
        return output;
      } else {
        return result;
      }

    } catch (error) {
      console.error("Error occurred during inference:", error);
      return null;
    }
  }

  onParse = (event) => {
    if (event.type === 'event') {
      const data = event.data;
      if (data === '[DONE]') {
        return;
      }
      try {
        const text = JSON.parse(data).choices[0].text ?? '';
        console.log({ text });
        this.response += text
      } catch (e) {
        console.error(e);
      }
    }
  };

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

module.exports = TogetherManager;

