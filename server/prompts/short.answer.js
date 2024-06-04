

exports.shortAnswer = (questionText, correctAnswer, maxPoint, criteria, userAnswer) => {
    return `
    I am giving you a question, correct answer to that question grading criteria, max point and the users answer which is to be graded and evaluated in a way you can understand understand 
    the requirements and grade it based on the critera layed out and give a point that you think it desrves
    // ${JSON.stringify({ questionText,correctAnswer,criteria,maxPoint,userAnswer})} 

    [] for question,
    <> for answer to be graded, 
    {} for point you think is deserved based on the criteria  and 
    () for reason


    use following brackets in your response, 
    [${questionText}] for question,
    <${correctAnswer}> for answer to be graded, 
    {${criteria}} for point you think is deserved based on the criteria  and 
    (${maxPoint}) for reason
    and the answer to be graded is as follows '${userAnswer}'

    in your response use the following as examples regarding only format of your response 

    [question]
    <answer>
    {points}
    (reason)
    `
} 

