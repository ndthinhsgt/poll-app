window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#addOption").addEventListener("click", addOption);

  document.querySelector("form").addEventListener("submit", handleSubmit);
});

let options = [];

function renderOptions() {
  const moreOption = document.getElementById("more-option");
  moreOption.innerHTML = "";
  options.forEach((optionData, optionIndex) => {
    moreOption.innerHTML += `
    <div>Option ${optionIndex + 1}</div>
    <input id="option-${optionIndex}" name="option[]" value="${optionData}" onchange="handleChange(${optionIndex}, event)"/>
    <button type="button" id= "btn-${optionIndex}" onclick="deleteOption(${optionIndex})">Xoá</button>`;
  });
}

function addOption() {
  options.push("");
  renderOptions();
  console.log("data", options);
}

function deleteOption(i) {
  const delConfirm = confirm("Bạn có muốn xoá option này không?");
  if (delConfirm) {
    options = options.filter((_, index) => index !== i);
    renderOptions();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());

  const question = formData.get("title");
  const options = formData
    .getAll("option[]")
    .filter((option) => option != "")
    .map((text, index) => ({ index, text }));

  if (options.length == 0) {
    alert("Cần nhập ít nhất một option!");
    return;
  }

  const votes = getVotes();
  votes.push({ question, options });
  saveVotes(votes);

  confirm("Tạo vote thành công!");

  if (confirm("Đã tạo vote, bạn có muốn xem trang List?")) {
    window.location.href = "/list";
  } else {
    window.location.reload();
  }
}

function handleChange(optionIndex, event) {
  const newOp = event.target.value;
  options[optionIndex] = newOp;
  renderOptions();
  console.log("Newoption", options);
}
