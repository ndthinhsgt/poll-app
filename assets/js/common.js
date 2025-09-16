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

  
  if(localStorage.getItem("votes")) {
    return JSON.parse(localStorage.getItem("votes") ?? "{}");
  }
  //end

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

// change
function saveVotes(votes) {
  localStorage.setItem("votes", JSON.stringify(votes));
}
//end

function getVotingResult() {
  try {
    return JSON.parse(localStorage.getItem("voteResult"));
  } catch (error) {
    return {};
  }
}

//change
function saveVotingResult(votes) {
  localStorage.setItem("voteResult", JSON.stringify(votes));
}
//end

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
  const userName = initUser[userId]; 
  return { id: userId, name: userName };
};
//end


function logOut() {
  const logSession = JSON.parse(sessionStorage.getItem("loginUser"));
  if (!logSession) {
    window.location.href = "/login";
  } else {
    alert("Bạn có muốn đăng xuất?");
    sessionStorage.removeItem("loginUser");
    window.location.href = "/login";
  }

function goBack(){
    if (window.history.length > 1){
        window.history.back();
    } else {
        alert("Không có trang trước!");
    }
}}
  