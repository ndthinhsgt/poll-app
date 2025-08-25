// hàm redirect
function redirect(url) {
  // redirect đến url
  window.location.href = url;
}

function getVotes() {
  // Lấy votes từ localStorage key là 'votes'
  // TODO
  // const votes = JSON.parse(localStorage.getItem("votes"));
  // Nếu có votes thì return vote
  // Nếu votes không có dữ liệu (null) thì khởi tạo (lưu initVotes vào localStorage)
  const initVotes = [
    {
      question: "Hôm nay ăn gì?",
      options: [
        { index: 0, text: "Ăn mì" },
        { index: 1, text: "Ăn cơm" },
      ],
    },
    {
      question: "Ngày mai uống gì?",
      options: [
        { index: 0, text: "Trà sữa" },
        { index: 1, text: "Cà phê" },
      ],
    },
  ];

  saveVotes(initVotes);

  return initVotes;
}

function saveVotes(votes) {
  localStorage.setItem("votes", votes);
}

function getVotingResult() {
  try {
    return JSON.parse(localStorage.getItem("voteResult"));
  } catch (error) {
    return {};
  }
}

function saveVotingResult(votes) {
  localStorage.setItem("votes", votes);
}

function getUserFromSession() {
  // Lấy user từ session
  const userId = sessionStorage.getItem("loginUser");
  if (!userId) {
    // nếu không có thì login
    redirect("/login");
    return;
  }

  // Nếu có rồi thì trả về { id: 1, name: "Huy (Admin)" }
  const initUser = {
    1: "Huy (Admin)",
    2: "Thinh",
    3: "Quynh",
  };

  // TODO
  return { id: 1, name: "Mockup" };
}
