
exports.essay = (questionText, correctAnswer, totalPoints, criteria) => {
    return 
    `
    Please evaluate the following essay based on the prompt:

    ###
    ${questionText}

    The correct answer to address in the essay is:
    ###
    ${correctAnswer}

    Criteria for evaluation:
    ${criteria.map((criterion, index) => `${index + 1}. **${criterion.name}** (${criterion.points} points): ${criterion.description}`).join('\n')}

    !!! To be changed
    Please assign points for each criterion and calculate the overall score out of ${criteria.reduce((total, criterion) => total + criterion.points, 0)} points.

    Evaluation Template:9+ 
    ###
    ${criteria.map((criterion, index) => `
    ${index + 1}. **${criterion.name}**: 
       - Points (out of ${criterion.points}): 
       - Comments: 
    `).join('')}

    **Overall Score**: 
       - Points (out of ${criteria.reduce((total, criterion) => total + criterion.points, 0)}): 
       - Comments:  
    `
} 

// how to call the function

// const criteria = [
//     { name: 'Relevance', description: 'Does the essay address the main question and stay on topic?', points: 10 },
//     { name: 'Structure', description: 'Is the essay well-organized with a clear introduction, body, and conclusion?', points: 10 },
//     { name: 'Evidence and Examples', description: 'Are arguments supported with relevant evidence and examples?', points: 10 },
//     { name: 'Clarity and Coherence', description: 'Is the writing clear and easy to follow? Are the ideas presented logically?', points: 10 },
//     { name: 'Grammar and Style', description: 'Is the essay free of grammatical errors and written in an engaging style?', points: 10 }
// ];

// console.log(exports.essay('Discuss the impacts of climate change on global agriculture.', 'Climate change affects global agriculture through various factors such as changing weather patterns, increased frequency of extreme weather events, and shifts in crop growing seasons.', criteria));

