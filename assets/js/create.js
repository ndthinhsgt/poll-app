window.addEventListener("DOMContentLoaded", () => {
    const newOption = document.getElementById("newOption");
    if (!newOption) return;

    document.querySelector('#back').addEventListener("click", goBack);
});

function goBack(){
    if (window.history.length > 1){
        window.history.back();
    } else {
        alert("Không có trang trước!");
    }
}