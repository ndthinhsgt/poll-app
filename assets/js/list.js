document.querySelector('#detail').addEventListener('click', () => {
  window.location.href = '/detail';
});

function logOut() {
  const logSession = JSON.parse(sessionStorage.getItem("loginUser"));
  if (!logSession) {
    window.location.href = '/login';
  } else {
    alert('Bạn có muốn đăng xuất?');
    sessionStorage.removeItem("loginUser");
    window.location.href = '/login';
  }
};
document.querySelector('#logout').addEventListener('click', logOut);

document.querySelector('#createvote').addEventListener('click', function () {
  window.location.href = '/create';
});


const questionAnswer = [
  {
    question: "Hôm nay ăn gì?",
    options: [
      { index: 0, text: "Ăn mì" },
      { index: 1, text: "Ăn cơm" }
    ]
  },
  {
    question: "Ngày mai uống gì?",
    options: [
      { index: 0, text: "Trà sữa" },
      { index: 1, text: "Cà phê" }
    ]
  }
];

const users = {
  '1': 'Huy',
  '2': 'Thinh',
  '3': 'Quynh'
};

localStorage.setItem("questionAnswer", JSON.stringify(questionAnswer));

function getQA() {
  const getVote = JSON.parse(localStorage.getItem("questionAnswer"));
  return getVote;
};
const saveData = getQA();
const form = document.querySelector("form");

saveData.forEach((qa, index) => {
  const fieldset = document.createElement("fieldset");
  const newQuestion = document.createElement("div");
  newQuestion.className = "form-top";
  const userInfo = document.createElement("div");
  userInfo.className = "user";
  userInfo.innerText = users[sessionStorage.getItem('loginUser') ?? '1']

  const question = document.createElement("b");
  question.textContent = qa.question;
  question.id = `q${index}`;
  newQuestion.appendChild(question);
  newQuestion.appendChild(userInfo)
  fieldset.appendChild(newQuestion);
  const newOption = document.createElement("div");
  newOption.className = "form-center";
  qa.options.forEach((option, oIndex) => {
    const eachOption = document.createElement("div");
    eachOption.className = "form-center--answer";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = question.id;
    input.value = option.index;
    input.id = question.id + input.value;
    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.textContent = option.text;
    newOption.appendChild(eachOption);
    eachOption.appendChild(input);
    eachOption.appendChild(label);
    fieldset.appendChild(newOption);
  });

  const formBottom = document.createElement("div");
  formBottom.className = "form-bottom"
  const voteBtn = document.createElement("button");
  voteBtn.id = `vote_q${index}`;
  voteBtn.textContent = "Vote";
  voteBtn.type = "button"
  voteBtn.disabled = true;
  const detailBtn = document.createElement("button");
  detailBtn.id = `detail_q${index}`;
  detailBtn.textContent = "Detail";
  detailBtn.type = "button";
  formBottom.appendChild(voteBtn);
  formBottom.appendChild(detailBtn);
  fieldset.appendChild(formBottom);

  form.appendChild(fieldset);
});



const voteResult = [];

form.querySelectorAll("fieldset").forEach(fieldset => {
  const voteBtn = document.getElementById(`vote_q${index}`);
  const radios = fieldset.querySelectorAll("input[type=radio]");
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      voteBtn.disabled = false;
    });
  });

  voteBtn.addEventListener("click", () => {
    const ticked = fieldset.querySelector("input[type=radio]:checked");
    if (ticked) {
      radios.forEach(radio => radio.disabled = true);
      voteBtn.disabled = true;
      const questionId = fieldset.querySelector("b").id;
      const tickedValue = ticked.value;
      const userId = sessionStorage.getItem('loginUser')

      let newQA = voteResult.find(q => q.questionId === questionId);
      if (!newQA) {
        newQA = { questionId: questionId, options: [] };
        voteResult.push(newQA);
      };
      let newOption = newQA.options.find(o => o.index === tickedValue);
      if (!newOption) {
        newOption = {index: tickedValue, user: []};
        newQA.options.push(newOption);
      };
      newOption.users.push(userId);

      localStorage.setItem("voteResult", JSON.stringify(voteResult));
    }
  })
}
);
