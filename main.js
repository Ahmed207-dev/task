let countspan = document.querySelector(".count span");
let bulletspans = document.querySelector(".spans");
let quiz = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answers-area");
let but = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let current = 0;
let answercount = 4;
let rightanswr = 0;

async function Ajax() {
  try {
    let questionobject = await fetch("ques.json");
    //
    let data = await questionobject.json();
    //
    let datacount = data.length;
    //

    // count of questions
    createbullets(datacount);
    //

    // functions
    adddata(data[current], datacount);
    // functions
    but.onclick = () => {
      let therightanswer = data[current].right_answer;
      //
      current++; // note 1
      //
      check(therightanswer, datacount);
      //
      answerArea.textContent = ""; //note 2
      //
      quiz.textContent = "";
      //
      adddata(data[current], datacount); //note 3
      //
      handlebullet(); //note 4
      //
      showresult(datacount); //note 5
      //
      countspan.textContent = datacount - current; //notes "use fkin brain"
    };

    //if found error
  } catch (error) {
    console.log(`have a ${error}`);
  }
}
Ajax();

// first function
function createbullets(element) {
  for (let i = 0; i < element; i++) {
    countspan.textContent = element;
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "on";
    }
    bulletspans.appendChild(bullet);
  }
} // note in element in loop and if condition

// second function

function adddata(obj, count) {
  if (current < count) {
    //note 6

    // make question
    let question = document.createElement("h2");
    // add text
    question.textContent = `${obj.title}`;
    // append
    quiz.appendChild(question);
    // make loop to make more one answer
    for (let i = 1; i <= answercount; i++) {
      //make main div = container to take input and label
      let containerdiv = document.createElement("div");
      // add to classname
      containerdiv.className = "answer";
      // add to page
      answerArea.appendChild(containerdiv);
      // make input
      let theinput = document.createElement("input");
      // id / value / type
      theinput.id = `answer ${i}`;
      theinput.type = "radio";
      theinput.dataset.answer = obj[`answer_${i}`]; //note 7
      theinput.name = "question";
      // append
      containerdiv.appendChild(theinput);
      // make label
      let label = document.createElement("label");
      // add for
      label.htmlFor = obj[`answer_${i}`]; //note 8
      // add text
      label.textContent = obj[`answer_${i}`];
      //append
      containerdiv.appendChild(label);
    }
  }
}
// third function
function check(ra, co) {
  //note 9 all function
  let answers = document.getElementsByName("question");
  let chosen;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chosen = answers[i].dataset.answer;
    }
  }
  if (ra === chosen) {
    rightanswr++;
    console.log("right");
  }
}
// four function
function handlebullet() {
  // note 10 all function
  let bullets = [...document.querySelectorAll(".spans span")];
  bullets.forEach((span, index) => {
    if (current === index) {
      span.className = "on";
    }
  });
}
function showresult(co) {
  // note 11 all function
  let res;
  // التأكد أننا في نهاية الأسئلة
  if (current === co) {
    // حذف عناصر الواجهة القديمة
    bullets.remove();
    but.remove();
    answerArea.remove();
    quiz.remove();

    // تعديل المنطق الحسابي للنتائج
    if (rightanswr >= co / 2 && rightanswr < co) {
      res = `<span class="good">Good! You got ${rightanswr} from ${co}</span>`;
    } else if (rightanswr === co) {
      res = `<span class="perfect">Perfect! All answers are correct</span>`;
    } else {
      res = `<span class="bad">Bad performance: ${rightanswr} from ${co}</span>`;
    }

    // عرض النتيجة باستخدام innerHTML لأننا نستخدم وسوم span
    resultsContainer.innerHTML = res;
  }
}
