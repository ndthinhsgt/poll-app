const query = new URLSearchParams(window.location.search);
const id = query.get("id")
 
function renderVoteDetail(id) {
  const votes = JSON.parse(localStorage.getItem("votes")) || [];
  const vote = votes[id];
  if (!vote) {
    alert("Bài vote không tồn tại !");
    window.location.href = "/list";
    return;
  }

  const voteContent = document.querySelector(".vote-content");

  // bắt đầu build html
  let html = `
    <fieldset disabled>
      <div class="vote-question">
        <label>Tiêu đề</label>
        <br>
        <input type="text" value="${vote.question}">
      </div>
  `;

  const votingResult = getVotingResult();

  vote.options.forEach((opt, index) => {
    const count = votingResult?.[id]?.[index]?.length || 0;

    html += `
      <div class="vote-option">
        <div>
          <label>Option ${index + 1}</label><br>
          <input type="text" value="${opt.text}">
        </div>
        <div>
          <p style="margin-right:10px;">${count} Votes</p>
        </div>
      </div>
    `;
  });

  html += `</fieldset>`;
  console.log("Generated HTML:", html);
  voteContent.innerHTML = html;
}

renderVoteDetail(id);