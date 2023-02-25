let totalProblems = -1; // загальна кількість прикладів
let correctAnswers = 0; // кількість правильних відповідей
let incorrectAnswers = 0; // кількість неправильних відповідей

// Генеруємо випадкове число в діапазоні [min, max]
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генеруємо випадковий математичний приклад
function generateProblem() {
    const x = getRandomInt(1, 10);
    const y = getRandomInt(1, 10);
    const op = Math.random() < 0.5 ? '+' : '-';
    return { x, y, op };
}

// Генеруємо відповіді на основі правильної відповіді
function generateAnswers(correctAnswer) {
    const answers = [correctAnswer];
    while (answers.length < 4) {
        let a = correctAnswer + getRandomInt(-2, 2);
        if (!answers.includes(a)) {
            answers.push(a);
        }
    }
    return shuffleArray(answers);
}

// Перемішуємо масив випадковим чином
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//Показуємо скільки відповідей дав користувач
function displayResults() {
    let resultString = `Прикладів: ${totalProblems}<br>`;
    resultString += `Правильних відповідей: ${correctAnswers}<br>`;
    resultString += `Неправильних відповідей: ${incorrectAnswers}`;
    document.getElementById("results").innerHTML = resultString;
}

//Очистити кількість прикладів
function clearResults() {
    totalProblems = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    displayResults();
}

// Показуємо математичний приклад та відповіді на сторінці
function showProblem() {
    totalProblems++;
    const problem = generateProblem();
    const correctAnswer = problem.op === '+' ? problem.x + problem.y : problem.x - problem.y;
    const answers = generateAnswers(correctAnswer);
    document.getElementById('problem').innerHTML = `${problem.x} ${problem.op} ${problem.y} = ?`;
    document.getElementById('answers').innerHTML = '';
    for (let i = 0; i < answers.length; i++) {

        const button = document.createElement('button');
        button.innerText = answers[i];
        button.addEventListener('click', () => {
            if (answers[i] === correctAnswer) {
                document.getElementById('result').innerText = 'Правильно!';
                document.getElementById("result").className = "correct";
                correctAnswers++;
            } else {
                document.getElementById('result').innerText = 'Подумай ще.';
                document.getElementById("result").className = "incorrect";
                incorrectAnswers++;
            }
            showProblem();
        });

        displayResults()
        document.getElementById('answers').appendChild(button);
    }
}

// Починаємо гру при завантаженні сторінки
window.onload = showProblem;