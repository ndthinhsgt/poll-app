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
  const question = document.createElement("p");
  question.textContent = qa.question;
  question.id = `q${index}`;
  newQuestion.appendChild(question);
  fieldset.appendChild(newQuestion);

  qa.options.forEach((option, oIndex) => {
    const newOption = document.createElement("div");
    newOption.className = "form-center";
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
  const detailBtn = document.createElement("button");
  detailBtn.id = `detail_q${index}`;
  detailBtn.textContent = "Detail";
  detailBtn.type = "button";
  formBottom.appendChild(voteBtn);
  formBottom.appendChild(detailBtn);
  fieldset.appendChild(formBottom);

  form.appendChild(fieldset);
})

