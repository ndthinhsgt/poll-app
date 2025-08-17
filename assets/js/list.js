function logOut(){
  const logSession = JSON.parse(sessionStorage.getItem("loginUser"));
  if (!logSession){
    window.location.href = '/login';
  } else {
    alert('Bạn có muốn đăng xuất?');
    sessionStorage.removeItem("loginUser");
    window.location.href = '/login';
  }
};

document.querySelector('#logout').addEventListener('click', logOut);