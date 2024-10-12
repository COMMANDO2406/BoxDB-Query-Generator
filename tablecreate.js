function createTable(draggableArea, tableCount) {
  const cols = parseInt(prompt("Enter the number of columns:"));

  if (isNaN(cols) || cols <= 0) {
    alert("Please enter a valid number for columns.");
    return;
  }

  //table container
  const table = document.createElement("div");
  table.classList.add("draggable-table");
  table.style.position = "absolute";
  table.style.top = "50px";
  table.style.left = "50px";

  //title
  const tableTitle = document.createElement("div");
  tableTitle.classList.add("table-title");
  tableTitle.setAttribute("contenteditable", "true");
  tableTitle.textContent = "Table " + tableCount;
  table.appendChild(tableTitle);

  //create each column header and its data type field
  for (let i = 0; i < cols; i++) {
    //wrapper for each column
    const columnWrapper = document.createElement("div");
    columnWrapper.classList.add("column-wrapper");

    //column header
    const headerCell = document.createElement("div");
    headerCell.classList.add("header-cell");
    headerCell.setAttribute("contenteditable", "true");
    headerCell.textContent = "Column " + (i + 1);
    columnWrapper.appendChild(headerCell);

    //text area for the data type - should add a dropdown menu instead
    const textArea = document.createElement("textarea");
    textArea.classList.add("text-area");
    textArea.setAttribute("placeholder", "Enter data type");
    columnWrapper.appendChild(textArea);

    //append the column wrapper to the table
    table.appendChild(columnWrapper);
  }

  // append the table to the draggable area
  draggableArea.appendChild(table);

  // make the table draggable
  makeDraggable(table);
}

// make table draggable
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

function extractTableInfo() {
  const tables = document.querySelectorAll(".draggable-table");
  const queries = [];

  tables.forEach((table) => {
    const tableName = table.querySelector(".table-title").textContent.trim();

    // wrappers to data
    const columnWrappers = table.querySelectorAll(".column-wrapper");

    const columns = [];
    columnWrappers.forEach((wrapper) => {
      const columnName = wrapper
        .querySelector(".header-cell")
        .textContent.trim();
      const dataType = wrapper.querySelector(".text-area").value.trim();

      // check if both column name and data type are provided
      if (columnName && dataType) {
        columns.push({
          columnName: columnName,
          dataType: dataType,
        });
      }
    });

    // check if there are valid columns - needs better validation
    if (columns.length > 0) {
      const tableInfo = {
        tableName: tableName,
        columns: columns,
      };

      // generate MySQL query for this table
      const query = generateSQLQuery(tableInfo);
      queries.push(query);
    }
  });

  return queries;
}

//generate MySQL query
function generateSQLQuery(tableInfo) {
  let query = "CREATE TABLE " + tableInfo.tableName + " (\n";

  tableInfo.columns.forEach((col, index) => {
    query += `  ${col.columnName} ${col.dataType}`;
    if (index < tableInfo.columns.length - 1) {
      query += ",";
    }
    query += "\n";
  });

  query += ");";
  return query;
}

function refresh_Text() {
  textArea.value = "Generating queries...";
  const tableInfo = extractTableInfo();
  queries(tableInfo);
}

function queries(queriesList) {
  queriesList.forEach((query) => {
    console.log("Generated Query:", query);
  });

  textArea.value = queriesList.join("\n\n");
}
