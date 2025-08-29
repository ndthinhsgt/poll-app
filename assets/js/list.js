/**
 * Logic chính mình viết trong `DOMContentLoaded`
 * Còn hàm viết bên ngoài
 */

window.addEventListener("DOMContentLoaded", () => {
  // logic chính
  const app = document.getElementById("app");
  if (!app) return;

  // logout button click
  document.querySelector("#logout").addEventListener("click", () => {
    logOut();
  });
  // create button click
  document.querySelector("#createvote").addEventListener("click", function () {
    toCreate();
  });

  // Lấy user
  const user = getUserFromSession();

  // render list vote
  renderListVote(app, user);
});

function toDetail(id) {
  redirect("/detail?id=" + id);
}

function toCreate() {
  redirect("/create");
}

function logOut() {
  const logSession = JSON.parse(sessionStorage.getItem("loginUser"));
  if (!logSession) {
    window.location.href = "/login";
  } else {
    alert("Bạn có muốn đăng xuất?");
    sessionStorage.removeItem("loginUser");
    window.location.href = "/login";
  }
}

function renderListVote(app, user) {
  // lấy list votes
  const votes = getVotes();

  // render list votes: chạy vòng for
  for (let voteIndex in votes) {
    // render vote
    const vote = votes[voteIndex];
    const voteElement = createVoteElement(vote, voteIndex, user);
    app.appendChild(voteElement);
  }
}

function checkVoted(index, optionIndex, userId) {
  const result = getVotingResult();
  // kiểm tra xem index, optionIndex, userId, có trong resutl chứa
  let option = [];
  Object.keys(result?.[index] ?? {})?.map((key) => {
    option = [...option, result?.[index]?.[key]];
  });

  // TODO: kiểm tra user id có trong option
  console.log('checkVoted',index, optionIndex, userId, '1')
  if (!result) return false;
  console.log('checkVoted',index, optionIndex, userId, '2')
  if (!result[index]) return false;
  console.log('checkVoted',index, optionIndex, userId, '3')
  if (!result[index][optionIndex]) return false;
console.log('checkVoted',index, optionIndex, userId, '4')
  return result[index][optionIndex].includes(userId);
  };
// end

function handleChange(index, optionIndex, userId) {
  let result = getVotingResult();
  // kiểm tra xem index, optionIndex, userId, có trong resutl chứa
  const check = checkVoted(index, optionIndex, userId); 
  
  // TODO: kiểm tra user id có trong option
  // if (!result) return;
  // if (!result[index]) return;
  // if (!result[index][optionIndex]) return;
// end

  // nếu có rồi thì không làm gì
  if (check) {
    return;
  };

  const voteButton = document.getElementById(`vote-${index}-button`);
  voteButton.disabled = false;
  voteButton.addEventListener("click", () => {
    voteButton.disabled = true;

  document.querySelectorAll(`input[name="vote-${index}"]`)
    .forEach(opt => opt.disabled = true);

    // Update result
    // result[index][optionIndex]push(userId); //
    /**
     * nếu '.' mà không tồn tại sẽ bị lỗi
     */
    let voteItem = result?.[index]; // object
    if (voteItem) {
      // nếu có lưu vote rồi => không xử lý
    } else {
      // nếu không có, chưa lưu
      voteItem = {};
    }

    let voteItemOption = voteItem?.[optionIndex]; // array
    if (voteItemOption) {
      // nếu có lưu vote option rồi không xử lý
    } else {
      // nếu không có, chưa lưu
      voteItemOption = [];
    }

    voteItemOption.push(userId);
    result={...result??{},[index]:{...result?.[index]??{},[optionIndex]:voteItemOption}}

    // Save voting result
    console.log(result)
    saveVotingResult(result);
    alert("XONG");
  });
}

function createVoteElement(vote, index, user) {
  const id = `vote-${index}`;

  // change
  const element = document.createElement("fieldset");

  const formTop = document.createElement("div");
  formTop.className = "form-top";

  const newQuestion = document.createElement("b");
  newQuestion.textContent = vote.question;
  newQuestion.id = `q${index}`;
  formTop.appendChild(newQuestion);

  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = user?.name ?? "";
  formTop.appendChild(userDiv);

  const formCenter = document.createElement("div");
  formCenter.className = "form-center";

  const voted = vote.options
    .find((option, optionIndex) => {
      const optionId = `option-${index}-${optionIndex}`;
      return checkVoted(index, optionIndex, user?.id);
    })
 
  const options = vote.options
    .map((option, optionIndex) => {
      const optionId = `option-${index}-${optionIndex}`;
      return `
      <div class="form-center--answer">
      <input 
        type="radio" 
        name="${id}" 
        id="${optionId}" 
        onchange="handleChange('${index}', '${optionIndex}', '${user.id}')"
        ${voted ? "disabled" : ""}
        />
      <label for="${optionId}">${option.text}</label>
      </div>
    `;
    })
    .join(" ");

  formCenter.innerHTML = options;

  const formBottom = document.createElement("div");
  formBottom.className = "form-bottom";
  formBottom.innerHTML = `
    <button id="${id}-button" disabled>Vote${voted ?'d':''}</button>
    ${
      user?.id == 1
        ? `<button onclick="toDetail('${index}')">Detail</button>`
        : ""
    }
  `;

  element.appendChild(formTop);
  element.appendChild(formCenter);
  element.appendChild(formBottom);

  return element;
};
//end
