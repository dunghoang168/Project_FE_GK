const rows = 5;
const cols = 6;

let predefinedValues = Array.from({ length: rows }, () => Array(cols).fill(-1));

let counter = 1;
for (let i = 0; i < rows; i++) {
    predefinedValues[i] = [];
    for (let j = 0; j < cols; j++) {
        predefinedValues[i][j] = counter;
        counter++;
    }
}

const sortedValues = Array.from({ length: rows * cols }, (_, index) => (index % 15) + 1);
 sortedValues.sort(() => Math.random() - 0.5);

let selectedButton = null;

// Tạo bảng HTML và hiển thị mảng
const arrayContainer = document.getElementById("arrayContainer");
const table = document.createElement("table");

for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        const button = document.createElement("button");
        const value = sortedValues[i * cols + j];
        button.textContent = value;
        button.dataset.row = i;
        button.dataset.col = j;
        button.addEventListener("click", function () {
            const clickedRow = parseInt(button.dataset.row);
            const clickedCol = parseInt(button.dataset.col);

            if (!selectedButton) {
                selectedButton = button;
                button.style.backgroundColor = "red";
            } else {
                const firstButton = selectedButton;
                const secondButton = button;
                // if ((isMatch(firstButton, secondButton) && isAdjacent(firstButton, secondButton))
                //     ) {
                //
                //     secondButton.style.backgroundColor = "red";
                //     removeButtons(firstButton, secondButton);
                //     selectedButton = null;
                // } else {
                //     button.style.backgroundColor = "red";
                //     selectedButton.style.backgroundColor = "";
                //     selectedButton = button;
                // }

                const path = findPath(firstButton, secondButton);
                if (path) {
                    console.log("Đường đi được tìm thấy:", path);

                } else {
                    console.log("Không có đường đi từ startButton đến endButton.");
                }
            }
        });
        cell.appendChild(button);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
arrayContainer.appendChild(table);

// Xóa hai ô khỏi bảng
function removeButtons(button1, button2) {
    button1.parentNode.removeChild(button1);
    button2.parentNode.removeChild(button2);

}

// kiểm tra 2 button được chọn có kề nhau hay không
function isAdjacent(button1, button2) {
    const firstRowIndex = parseInt(button1.getAttribute("data-row"));
    const firstColIndex = parseInt(button1.getAttribute("data-col"));
    const secondRowIndex = parseInt(button2.getAttribute("data-row"));
    const secondColIndex = parseInt(button2.getAttribute("data-col"));

    const sameRow = firstRowIndex === secondRowIndex;
    const sameCol = firstColIndex === secondColIndex;

    const adjacent = (sameRow && Math.abs(firstColIndex - secondColIndex) === 1) ||
        (sameCol && Math.abs(firstRowIndex - secondRowIndex) === 1);

    return adjacent;
}

// kiểm tra 2 button config giá trị
function isMatch(button1, button2) {
    const value1 = sortedValues[button1.dataset.row * cols + parseInt(button1.dataset.col)];
    const value2 = sortedValues[button2.dataset.row * cols + parseInt(button2.dataset.col)];
    return value1 === value2;
}

// Hàm tìm đường đi giữa hai button được chọn
function findPath(startButton, endButton) {
    const visited = new Set();
    const queue = [[startButton]];

    while (queue.length > 0) {
        const path = queue.shift();
        const currentButton = path[path.length - 1];

        if (currentButton === endButton) {
            return path;
        }

        if (!visited.has(currentButton)) {
            visited.add(currentButton);

            const row = parseInt(currentButton.dataset.row);
            const col = parseInt(currentButton.dataset.col);

            const neighbors = [];
            if (row > 0) neighbors.push(document.querySelector(`button[data-row="${row - 1}"][data-col="${col}"]`));
            if (row < rows - 1) neighbors.push(document.querySelector(`button[data-row="${row + 1}"][data-col="${col}"]`));
            if (col > 0) neighbors.push(document.querySelector(`button[data-row="${row}"][data-col="${col - 1}"]`));
            if (col < cols - 1) neighbors.push(document.querySelector(`button[data-row="${row}"][data-col="${col + 1}"]`));

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) ) {
                    queue.push([...path, neighbor]);
                }
            }
        }
    }

    return path; // Không tìm thấy đường đi
}



