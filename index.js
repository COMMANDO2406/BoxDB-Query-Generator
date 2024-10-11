document.addEventListener("DOMContentLoaded", () => {
  const createTableBtn = document.getElementById("createTableBtn");
  const draggableArea = document.querySelector(".draggable-area");

  let tableCount = 0;

  function createTable() {
    tableCount = tableCount + 1;

    const table = document.createElement("div");
    table.classList.add("draggable-table");
    table.textContent = "Table " + tableCount;
    table.style.top = 50;
    table.style.left = 50;

    draggableArea.appendChild(table);

    interact(table).draggable({
      listeners: {
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
    });
  }

  createTableBtn.addEventListener("click", createTable);
});
