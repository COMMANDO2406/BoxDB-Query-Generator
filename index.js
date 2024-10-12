document.addEventListener("DOMContentLoaded", () => {
  const createTableBtn = document.getElementById("createTableBtn");
  const refreshText = document.getElementById("RefreshText");
  const draggableArea = document.querySelector(".draggable-area");
  const textArea = document.getElementById("textArea");

  let tableCount = 0;

  function refresh_Text() {
    textArea.value = "test - this is where queries will go";
  }

  refreshText.addEventListener("click", refresh_Text);
  createTableBtn.addEventListener("click", () => {
    tableCount = tableCount + 1;
    createTable(draggableArea, tableCount);
  });
});
