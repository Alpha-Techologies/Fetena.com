import Together from "together-ai";
import { createParser } from "eventsource-parser";
import APIError from "./../utils/apiError";

class TogetherManager {
  constructor(
    apiKey,
    setPromptResponse,
    maxTokens = 1000,
    streamTokens = true
  ) {
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
    this.response = setPromptResponse;
  }

  async performInference(prompt, setPromptResponse) {
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
        this.response("");

        const reader = result.getReader();
        const parser = createParser(this.onParse);

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          parser.feed(new TextDecoder().decode(value));
        }

        // return this.response;
      } else {
        return new APIError("No response found from the AI", 500);
        // return "No response found from the AI";
      }
    } catch (error) {
      console.error("Error occurred during inference:", error);
      new APIError("An Error occurred during inference", 500);
      return null;
    }
  }

  onParse = (event) => {
    if (event.type === "event") {
      const data = event.data;
      if (data === "[DONE]") {
        return;
      }
      try {
        const text = JSON.parse(data).choices[0].text ?? "";
        // this.response += text;
        this.response((prev) => prev + text);
        // setPromptResponse((prev) => prev + text);
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

export default TogetherManager;
