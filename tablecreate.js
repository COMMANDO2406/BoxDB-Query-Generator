function createTable(draggableArea, tableCount) {
  const cols = parseInt(prompt("Enter the number of columns:"));

  if (isNaN(cols) || cols <= 0) {
    alert("Please enter a valid number for columns.");
    return;
  }

  const table = document.createElement("div");
  table.classList.add("draggable-table");
  table.style.position = "absolute";
  table.style.top = "50px";
  table.style.left = "50px";

  const headerRow = document.createElement("div");
  headerRow.classList.add("table-header");
  for (let i = 0; i < cols; i++) {
    const headerCell = document.createElement("div");
    headerCell.classList.add("header-cell");
    headerCell.setAttribute("contenteditable", "true");
    headerCell.textContent = "Column " + (i + 1);
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  const dataTypeRow = document.createElement("div");
  dataTypeRow.classList.add("table-header");
  for (let i = 0; i < cols; i++) {
    const dataTypeCell = document.createElement("div");
    dataTypeCell.classList.add("header-cell");

    const textArea = document.createElement("textarea");
    textArea.setAttribute(
      "id",
      "dataTypeTextArea" + tableCount + "_" + (i + 1)
    );
    textArea.classList.add("text-area");
    dataTypeCell.appendChild(textArea);

    dataTypeRow.appendChild(dataTypeCell);
  }
  table.appendChild(dataTypeRow);

  draggableArea.appendChild(table);

  makeDraggable(table);
}

function makeDraggable(table) {
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
