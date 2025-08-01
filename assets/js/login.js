const userData = [
  { id: 1, name: "Huy (Admin)" },
  { id: 2, name: "Thinh" },
  { id: 3, name: "Quynh" }
];

const select = document.querySelector('#user');
const submitButton = document.querySelector('#loginbutton');

for (const eachUser of userData) {
  const option = document.createElement("option");
  option.value = eachUser.id;
  option.textContent = eachUser.name;
  select.appendChild(option);
};

document.querySelector('#user').addEventListener("change", () => {
  const selectValue = select.value;
  if (selectValue !== '') {
    submitButton.disabled = false
  }
});

document.querySelector('form').addEventListener('submit', (reload) => {
  reload.preventDefault();
  const selectValue = select.value;
  if (selectValue !== '') {
    sessionStorage.setItem("loginUser", selectValue)
    alert('Login thành công');
    window.location.href = 'list.html'
  };
});