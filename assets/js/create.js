window.addEventListener("DOMContentLoaded", () => {
    const newOption = document.getElementById("newOption");
    if (!newOption) return;

    document.querySelector("#logout").addEventListener("click", logOut);

});

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
