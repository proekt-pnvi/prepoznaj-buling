// Препознај Булинг - JavaScript Web Version
// All logic and UI in one file for clarity

// Questions database
const allQuestions = [
    ["Некојa група ученици секојдневно го викаат Марко со навредливи имиња.", true],
    ["Те замолуваат да не седиш со нив на одмор, но потоа те повикуваат друг ден.", false],
    ["Некој го игнорира твојот другар во чат, без причина.", true],
    ["Наставникот ви дава дополнителна задача без навредлив тон.", false],
    ["Група деца го исклучуваат Петар од групен проект без објаснување.", true],
    ["Некој ти се смее поради изгледот на твојата облека.", true],
    ["Ти велат дека не можеш да играш со нив бидејќи нема место.", false],
    ["Постојано ти праќаат навредливи пораки на социјалните мрежи.", true],
    ["Те критикуваат конструктивно за да се подобриш.", false],
    ["Некој намерно ги крши твоите работи.", true],
    ["Те игнорираат само еден ден поради недоразбирање.", false],
    ["Ти се закануваат ако не им дадеш пари.", true],
    ["Те повикуваат на роденден, но не можеш да одиш.", false],
    ["Некој шири лажни гласини за тебе.", true],
    ["Ти велат дека си добар пријател.", false],
    ["Те туркаат намерно во ходникот.", true],
    ["Те игнорираат на групен чат подолго време.", true],
    ["Наставникот те пофалува пред цел клас.", false],
    ["Ти велат дека не си добредојден во нивната група секој ден.", true],
    ["Те прашуваат дали сакаш да се приклучиш на нивната група.", false],
    ["Некој те исмејува поради твојата националност.", true],
    ["Некој постојано те задева за твојот изглед на интернет.", true],
    ["Ти велат дека не можеш да учествуваш во играта бидејќи не ги знаеш правилата.", false],
    ["Група ученици намерно те оставаат сам на одмор секој ден.", true],
    ["Ти се извинуваат откако те повредиле ненамерно.", false],
    ["Некој ги споделува твоите лични информации без дозвола.", true],
    ["Ти велат дека си најдобар во спортот.", false],
    ["Те исмејуваат поради твоите оценки пред другите.", true],
    ["Те охрабруваат да се приклучиш на нова активност.", false],
    ["Некој ти праќа заканувачки пораки преку телефон.", true],
    ["Ти велат дека не можеш да седиш со нив само денес, но утре можеш.", false],
    ["Група деца намерно те игнорираат на секој состанок.", true],
    ["Ти помагаат со домашната задача.", false],
    ["Некој те снима без дозвола и го споделува видеото.", true],
    ["Те покануваат на заедничка активност.", false],
    ["Те навредуваат поради твојата националност.", true],
    ["Ти велат дека си добар другар.", false],
    ["Те исклучуваат од групен разговор без причина.", true],
    ["Те советуваат како да се подобриш во учењето.", false],
    ["Ти велат дека не си доволно добар за нивната група.", true],
    ["Те поздравуваат секое утро со насмевка.", false],
];

// Game state
let questions = [];
let currentQ = 0;
let score = 0;
let showFeedback = false;
let feedbackTimeout = null;
let lastAnswer = null;
let feedbackMsg = '';

function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function pickQuestions() {
    questions = shuffle(allQuestions).slice(0, 10);
    currentQ = 0;
    score = 0;
    showFeedback = false;
    clearTimeout(feedbackTimeout);
    renderQuiz();
}

function renderQuiz() {
    const main = document.getElementById('quiz-main');
    const progress = document.getElementById('progress');
    main.innerHTML = '';
    if (currentQ < questions.length) {
        // Question card
        const qCard = document.createElement('div');
        qCard.className = 'question-card';
        qCard.textContent = questions[currentQ][0];
        main.appendChild(qCard);
        // Buttons
        const yesBtn = document.createElement('button');
        yesBtn.className = 'quiz-btn green';
        yesBtn.innerHTML = '✅ Да – Ова е булинг';
        yesBtn.onclick = () => handleAnswer(true);
        const noBtn = document.createElement('button');
        noBtn.className = 'quiz-btn red';
        noBtn.innerHTML = '❌ Не – Не е булинг';
        noBtn.onclick = () => handleAnswer(false);
        yesBtn.disabled = showFeedback;
        noBtn.disabled = showFeedback;
        main.appendChild(yesBtn);
        main.appendChild(noBtn);
        // Feedback
        if (showFeedback) {
            const fb = document.createElement('div');
            fb.className = 'feedback ' + (questions[currentQ][1] === lastAnswer ? 'green' : 'red');
            fb.innerHTML = feedbackMsg;
            main.appendChild(fb);
        }
        progress.textContent = `Прашање ${currentQ+1} од ${questions.length}`;
    } else {
        // Result card
        const resCard = document.createElement('div');
        resCard.className = 'result-card';
        const emoji = document.createElement('div');
        emoji.className = 'result-emoji';
        emoji.textContent = '🎓';
        resCard.appendChild(emoji);
        const title = document.createElement('div');
        title.className = 'result-title';
        title.textContent = 'Резултати';
        resCard.appendChild(title);
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'result-score';
        scoreDiv.textContent = `Твојот резултат: ${score} / ${questions.length}`;
        resCard.appendChild(scoreDiv);
        // Grade message
        let gradeText, gradeClass;
        if (score > questions.length/2) {
            gradeText = "Браво! Одлично ги препознаваш ситуациите кога има булинг! Продолжи да ги поддржуваш другите и да реагираш кога ќе забележиш неправда. Твојата свесност е важна за подобро училиште за сите деца!";
            gradeClass = '';
        } else {
            gradeText = "Не е секогаш лесно да се забележи булинг, и тоа е во ред — потребно е уште да учиме за булингот. Продолжи да учиш и разговарај со наставници или родители ако не си сигурен. Секој чекор кон препознавање на булинг е важен!";
            gradeClass = 'red';
        }
        const gradeDiv = document.createElement('div');
        gradeDiv.className = 'result-grade ' + gradeClass;
        gradeDiv.textContent = gradeText;
        resCard.appendChild(gradeDiv);
        // Restart button
        const restartBtn = document.createElement('button');
        restartBtn.className = 'quiz-btn';
        restartBtn.textContent = 'Рестарт';
        restartBtn.onclick = pickQuestions;
        resCard.appendChild(restartBtn);
        main.appendChild(resCard);
        progress.textContent = 'Резултат';
    }
}

function handleAnswer(ans) {
    lastAnswer = ans;
    if (questions[currentQ][1] === ans) {
        score++;
        feedbackMsg = '✅ Точно! ' + (ans ? 'Ова е форма на булинг.' : 'Не е булинг.');
    } else {
        feedbackMsg = '❌ Неточно. ' + (ans ? 'Ова не се смета за булинг.' : 'Ова е булинг.');
    }
    showFeedback = true;
    renderQuiz();
    feedbackTimeout = setTimeout(() => {
        showFeedback = false;
        currentQ++;
        renderQuiz();
    }, 2000);
}

// Start the quiz
window.addEventListener('DOMContentLoaded', pickQuestions);
