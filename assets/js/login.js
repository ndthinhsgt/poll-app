const userData = [
  { id: 1, name: "Huy (Admin)" },
  { id: 2, name: "Thinh" },
  { id: 3, name: "Quynh" }
];

const select = document.querySelector('#user')
select.length = 1

for (const eachUser of userData) {
  const option = document.createElement("option");
  option.value = eachUser.id;
  option.textContent = eachUser.name;
  select.appendChild(option);
}