document.getElementById('method').addEventListener('change', function () {
    const method = this.value;
    const manualSection = document.getElementById('manualSection');
    const bulkSection = document.getElementById('bulkSection');
  
    // Show the correct section based on the selected method
    if (method === 'manual') {
      manualSection.classList.remove('hidden');
      bulkSection.classList.add('hidden');
    } else if (method === 'bulk') {
      bulkSection.classList.remove('hidden');
      manualSection.classList.add('hidden');
    } else {
      manualSection.classList.add('hidden');
      bulkSection.classList.add('hidden');
    }
  });
  
  // Event listener for generating questions
  document.getElementById('generateQuestions').addEventListener('click', function () {
    const numQuestions = document.getElementById('numQuestions').value;
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Clear existing questions
  
    // Generate input fields for each question
    for (let i = 0; i < numQuestions; i++) {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
  
      questionDiv.innerHTML = `
        <label>Question ${i + 1}:</label>
        <input type="text" name="questions[${i}][text]" placeholder="Enter question text" required><br>
        
        <label>Option 1:</label>
        <input type="text" name="questions[${i}][options][0]" placeholder="Option 1" required><br>
  
        <label>Option 2:</label>
        <input type="text" name="questions[${i}][options][1]" placeholder="Option 2" required><br>
  
        <label>Option 3:</label>
        <input type="text" name="questions[${i}][options][2]" placeholder="Option 3" required><br>
  
        <label>Option 4:</label>
        <input type="text" name="questions[${i}][options][3]" placeholder="Option 4" required><br>
  
        <label>Correct Answer (1-4):</label>
        <input type="number" name="questions[${i}][correctAnswer]" placeholder="Enter correct option (1-4)" required><br>
  
        <label>Marks:</label>
        <input type="number" name="questions[${i}][marks]" placeholder="Enter marks for this question" required><br>
  
        <label>Negative Marks:</label>
        <input type="number" name="questions[${i}][negativeMarks]" placeholder="Enter negative marks for this question" required><br>
  
        <label>Time Limit (in minutes):</label>
        <input type="number" name="questions[${i}][time]" placeholder="Enter time limit for this question" required><br>
      `;
  
      questionsContainer.appendChild(questionDiv);
    }
  });
  
  // CSV file handling and parsing
  document.getElementById('quizFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = event.target.result;
        const parsedData = parseCSV(csvData);
        console.log(parsedData); // Log parsed data or process further
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a CSV file.');
    }
  });
  
  // Simple CSV parser (you can enhance this)
  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const result = [];
  
    lines.forEach(line => {
      const values = line.split(',');
  
      // Assuming the first line is the header, skip it
      if (lines.indexOf(line) > 0) {
        const question = {
          text: values[0],
          options: [
            values[1], values[2], values[3], values[4]
          ],
          correctAnswer: values[5],
          marks: values[6],
          negativeMarks: values[7],
          time: values[8],
        };
  
        result.push(question);
      }
    });
  
    return result;
  }
  
  // Form submission logic
  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
  
    const method = document.getElementById('method').value;
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const timeLimit = document.getElementById('timeLimit').value;
  
    if (method === 'manual') {
      const questions = [];
  
      // Collect questions
      const questionDivs = document.querySelectorAll('#questionsContainer .question');
      questionDivs.forEach((questionDiv, index) => {
        const questionText = questionDiv.querySelector(`input[name="questions[${index}][text]"]`).value;
        const options = [
          questionDiv.querySelector(`input[name="questions[${index}][options][0]"]`).value,
          questionDiv.querySelector(`input[name="questions[${index}][options][1]"]`).value,
          questionDiv.querySelector(`input[name="questions[${index}][options][2]"]`).value,
          questionDiv.querySelector(`input[name="questions[${index}][options][3]"]`).value,
        ];
        const correctAnswer = questionDiv.querySelector(`input[name="questions[${index}][correctAnswer]"]`).value;
        const marks = questionDiv.querySelector(`input[name="questions[${index}][marks]"]`).value;
        const negativeMarks = questionDiv.querySelector(`input[name="questions[${index}][negativeMarks]"]`).value;
        const time = questionDiv.querySelector(`input[name="questions[${index}][time]"]`).value;
  
        questions.push({
          text: questionText,
          options: options,
          correctAnswer: correctAnswer,
          marks: marks,
          negativeMarks: negativeMarks,
          time: time,
        });
      });
  
      // Log quiz data to console (you can save this to Firebase, for instance)
      console.log({
        title,
        description,
        timeLimit,
        questions,
      });
      alert('Quiz Created Successfully! Data logged in the console.');
    } else if (method === 'bulk') {
      const file = document.getElementById('quizFile').files[0];
      if (!file) {
        alert('Please upload a file!');
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const data = parseCSV(e.target.result); // Parse the CSV file
        console.log(data); // Log parsed data to the console
      };
  
      reader.readAsText(file); // Read the file as text
    }
  });
  