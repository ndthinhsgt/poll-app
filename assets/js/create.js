window.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#addOption').addEventListener("click", addOption);
});

let optionLabel = 1;

function addOption(){
    const newOption = document.getElementById("newOption");
    optionLabel++;
    const input = `
    <div class ="singleOption id="option${optionLabel}">
    <label for="option${optionLabel}" >Option ${optionLabel}</label>
    <input type="text" value="" name="option[]">
    <button type="button" class="deleteBtn" onclick="deleteOptopn('option${optionLabel}')">Delete</button>
    </div>
    `;
    newOption.innerHTML += input;
}
 function deleteOptopn(id){
      const newOption = document.getElementById("newOption");
      const opt = document.getElementById(id); 
      if(opt) newOption.removeChild(opt)
 }


  