function questionGenerationTemplate(
  {
    difficulty,
  subject,
  questionType,
  customPrompt}
) {
 return `You are a highly intelligent question generation model. Generate and give me a list of 10 natural language questions in lists that are relevant to the subject of ${subject}. 
The difficulty level of the questions should be  ${difficulty}. 
You should also be able to provide the correct answer to the question. 
The questions should be in the ${questionType} format. 
Please generate a question and answer based on the following information`

}
export default questionGenerationTemplate;



