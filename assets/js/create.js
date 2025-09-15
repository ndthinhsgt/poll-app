window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#addOption").addEventListener("click", addOption);

  document.querySelector("form").addEventListener("submit", handleSubmit);
});

// 1 let options = [] => mảng này sẽ chứa [ string, string, string, .... ]
let options = [];

// 2 function renderOptions()
function renderOptions() {
  // 2.1 lấy more-option element
  const moreOption = document.getElementById("more-option");
  // 2.2 set more-option innerHTML = ''
  moreOption.innerHTML = "";
  // 2.3 Loop mảng options vẽ ra input loop (optionData, optionIndex)
  options.forEach((optionData, optionIndex) => {
    // 2.4 <div>Option 2</div><input name="option[]" value="${optionData}" onchange="handleChange(${optionIndex}, event)"/> <button onclick="deleteOption(optionIndex)">Xoá</button>
    moreOption.innerHTML += `
    <div>Option ${optionIndex + 1}</div>
    <input id="option-${optionIndex}" name="option[]" value="${optionData}" onchange="handleChange(${optionIndex}, event)"/>
    <button type="button" id= "btn-${optionIndex}" onclick="deleteOption(${optionIndex})">Xoá</button>`;
  });
}

// 3 function addOption() => thêm vào onclick của add button
function addOption() {
  // 3.1 thêm 1 data chuỗi rỗng vào options => options.push('')
  options.push("");
  renderOptions();
  console.log("data", options);
}

// 4 function deleteOption(optionIndex)
function deleteOption(i) {
  // 4.1 hiển thị 1 confirm('Bạn có muốn xoá option này không ?')
  const delConfirm = confirm("Bạn có muốn xoá option này không?");
  // 4.2 Xoá optionIndex khỏi mảng options (dùng filter hay ... gì cũng được) => kết quả sau khi xoá thì option đó biến mất
  if (delConfirm) {
    options = options.filter((_, index) => index !== i);
    // 4.3 gọi hàm renderOption();
    renderOptions();
  }
}

// sửa handleSubmit
function handleSubmit(event) {
  // 5.1 chặn sự kiện reload page của form event.preventDefault()
  event.preventDefault();
  // 5.2 lấy formdata const formData = new FormData(event.currentTarget)
  const formData = new FormData(event.currentTarget);
  // 5.3 lấy object entries const data = Object.fromEntries(formData.entries());
  const data = Object.fromEntries(formData.entries());

  // sửa từ đây
  const question = formData.get("title");
  const options = formData
    .getAll("option[]")
    .filter((option) => option != "")
    .map((text, index) => ({ index, text }));

  // option [string, string]
  // cần format thành [{index, text}]

  if (options.length == 0) {
    alert("Cần nhập ít nhất một option!");
    return;
  }

  // Lấy ra > push vào list > lưu lại
  const votes = getVotes();
  votes.push({ question, options });
  saveVotes(votes);

  confirm("Tạo vote thành công!");

  if (confirm("Đã tạo vote, bạn có muốn xem trang List?")) {
    // Nếu người dùng chọn OK → về trang danh sách
    window.location.href = "/list";
  } else {
    // Nếu chọn Cancel → reload lại trang hiện tại
    window.location.reload();
  }
}
//end

function handleChange(optionIndex, event) {
  // 6.1 change data của options => options[optionIndex] = event.value
  const newOp = event.target.value;
  options[optionIndex] = newOp;
  renderOptions();
  console.log("Newoption", options);
}
