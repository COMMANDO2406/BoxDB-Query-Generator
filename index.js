document.addEventListener("DOMContentLoaded", () => {
  const createTableBtn = document.getElementById("createTableBtn");
  const refreshText = document.getElementById("RefreshText");
  const draggableArea = document.querySelector(".draggable-area");
  const textArea = document.getElementById("textArea");
  const UpdateCredentialsBtn = document.getElementById("credentials");

  let tableCount = 0;

  refreshText.addEventListener("click", refresh_Text);
  UpdateCredentialsBtn.addEventListener("click", credentialsUpdate);
  createTableBtn.addEventListener("click", () => {
    tableCount = tableCount + 1;
    createTable(draggableArea, tableCount);
  });
});
