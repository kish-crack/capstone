let isRecording = true;
let timeoutId;

function generateRandomDecimalInRange(min, max) {
  return (Math.random() * (max - min) + min).toFixed(6);
}

function updateOutput(number1, number2) {
  document.getElementById('randomNumber1').textContent = number1;
  document.getElementById('randomNumber2').textContent = number2;
}

function saveToFile(numbers) {
  const dataToSave = numbers.join('\n');
  const blob = new Blob([dataToSave], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'file.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleKeyPress(event, numbers) {
  if (event.key === 'q') {
    isRecording = false;
    clearTimeout(timeoutId);
    saveToFile(numbers);
  }
}

function generateAndRecordNumbers(numbers) {
  if (isRecording) {
    const number1 = generateRandomDecimalInRange(30.354844, 30.354874);
    const number2 = generateRandomDecimalInRange(76.371634, 76.371650);
    updateOutput(number1, number2);
    numbers.push(`Random Number 1: ${number1}`, `Random Number 2: ${number2}`);
    
    const interval = Math.floor(Math.random() * (15000 - 6000 + 1)) + 6000; // Interval between 6 to 15 seconds
    timeoutId = setTimeout(() => generateAndRecordNumbers(numbers), interval);
  }
}

const recordedNumbers = [];
generateAndRecordNumbers(recordedNumbers);

document.addEventListener('keydown', (event) => handleKeyPress(event, recordedNumbers));