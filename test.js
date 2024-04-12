let cellWidth = 60;
let cellHeight = 60;
let gameWidth = 10;
let gameHeight = 10;
let shuffleIndex
let value
let totalCells = gameHeight * gameWidth;
var DONE = false
const cell_images = [
    "image/pokemon-1.jpg",
    "image/pokemon-2.jpg",
    "image/pokemon-3.jpg",
    "image/pokemon-4.jpg",
    "image/pokemon-5.jpg",
    "image/pokemon-6.jpg",
    "image/pokemon-7.jpg",
    "image/pokemon-8.jpg",
    "image/pokemon-9.jpg",
    "image/pokemon-11.jpg",
    "image/pokemon-12.jpg",
    "image/pokemon-13.jpg",
    "image/pokemon-14.jpg",
    "image/pokemon-15.jpg",
    "image/pokemon-16.jpg",
    "image/pokemon-17.jpg",
    "image/pokemon-18.jpg",
    "image/pokemon-19.jpg",
    "image/pokemon-20.jpg",
    "image/pokemon-21.jpg",
    "image/pokemon-22.jpg",
    "image/pokemon-23.jpg",
    "image/pokemon-24.jpg",
    "image/pokemon-25.jpg",
    "image/pokemon-26.jpg",
    "image/pokemon-27.jpg",
    "image/pokemon-28.jpg",
    "image/pokemon-29.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-30.jpg",
    "image/pokemon-31.jpg",
    "image/pokemon-32.jpg",
    "image/pokemon-33.jpg",
    "image/pokemon-34.jpg",
    "image/pokemon-35.jpg",
    "image/pokemon-36.jpg",
    "image/pokemon-37.jpg",
    "image/pokemon-38.jpg",
    "image/pokemon-39.jpg",
    "image/pokemon-40.jpg",
    "image/pokemon-41.jpg",
    "image/pokemon-42.jpg",
    "image/pokemon-43.jpg",
    "image/pokemon-44.jpg",
    "image/pokemon-45.jpg",
    "image/pokemon-46.jpg",
    "image/pokemon-47.jpg",
    "image/pokemon-48.jpg",
    "image/pokemon-49.jpg",
    "image/pokemon-50.jpg",
    "image/pokemon-51.jpg",
    "image/pokemon-52.jpg",
    "image/pokemon-53.jpg",
    "image/pokemon-54.jpg",
    "image/pokemon-55.jpg",
    "image/pokemon-56.jpg",
    "image/pokemon-57.jpg",
    "image/pokemon-58.jpg",
    "image/pokemon-59.jpg",
    "image/pokemon-60.jpg"
];

let cellsLength
var cells = [];

let gameFrame = document.getElementById("gameFrame");

//let shuffle = document.getElementById("shuffleButton")

function getRandomImages() {
    let cellImages = [];
    // lấy tổng ô chia số cặp (10 -2 = 8) (8*8/2=32)

    for (let i = 0; i < ((gameWidth - 2)*(gameHeight-2)/2) ; i++) {
        let randomIndex = Math.floor(Math.random() * cell_images.length);
        let randomImage = cell_images[randomIndex];
        // thêm 1 cặp
        cellImages.push(randomImage);
        cellImages.push(randomImage);
    }
    cellsLength = cellImages.length
    return cellImages;
}

// trộn ảnh
function shuffleCellImages(cellImages) {
    for (let i = cellImages.length - 2; i > 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cellImages[i], cellImages[j]] = [cellImages[j], cellImages[i]];
    }
    return cellImages;
}

//import images to game frame
const init = () => {
    for (let i = 0; i < gameWidth; i++) {
        let rs = []
        for (let j = 0; j < gameHeight; j++) {
            rs.push(0)
        }
        cells.push(rs)
    }
    let cellImages = shuffleCellImages(getRandomImages());
    let k = 0
    for (let i = 1; i < gameWidth - 1; i++) {
        for (let j = 1; j < gameHeight - 1; j++) {
             value = cellImages[k]
            cells[i][j] = value
            k = k + 1
        }
    }
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j])
        }
    }
}

//generate cells by div element to game frame
const draw = (x, y, value) => {
    let cell = document.createElement("div");
    cell.className = "cell cell_" + x + "-" + y;
    cell.style.backgroundImage = `url(${value})`;
    if (value === 0) {
        // cell.style.backgroundColor = "#faebd700"
        cell.style.backgroundColor = "red"
        cell.style.border = "none"

    }
    cell.style.left = `${y * cellWidth}px`;
    cell.style.top = `${x * cellHeight}px`;
    cell.addEventListener("click", (e) => {
        mouseClicked(x, y, e)
    });
    gameFrame.appendChild(cell);
}

//mouse clicked function
let cell1, cell2, div1, div2
let visited = []

//store and check visited cells
const initVisited = () => {
    visited = []
    for (let i = 0; i < gameWidth; i++) {
        let row = []
        for (let j = 0; j < gameHeight; j++) {
            row.push(false)
        }
        visited.push(row)
    }
}

function mouseClicked(x, y, e) {
    let count = 0
    if (cells[x][y] !== 0) {
        e.target.style.opacity = "0.5"
        let clickedCell = e.target
        if (clickedCell !== cell1) {
            if (!cell1) {
                div1 = clickedCell
                cell1 = [x, y]
                count++
            } else if (cell1[0] === x && cell1[1] === y) {
                e.target.style.opacity = "1"
                cell1 = null;
            } else {
                div2 = clickedCell
                cell2 = [x, y]
                finishPath = false
                initVisited()
                let first_cell = cells[cell1[0]][cell1[1]]
                let second_cell = cells[cell2[0]][cell2[1]]
                // kiểm tra 2 giá trị giống nhau
                if (first_cell === second_cell) {
                    pathWay(cell1, cell2)
                }
                if (DONE) {
                    DONE = false
                } else {
                    div1.style.opacity = "1"
                    div2.style.opacity = "1"

                    //selector
                    cell1 = null
                    cell2 = null

                }
            }
        }
    }
}

let count = 0;
const pathWay = (cell1, cell2) => {
    let stack = []
    stack.push(cell1)
    while (stack.length !== 0) {
        //get next element in stack
        let getCell = stack.shift()
        //find neighbors for current cell
        const neighbors = [
            {row: getCell[0] - 1, col: getCell[1]},
            {row: getCell[0] + 1, col: getCell[1]},
            {row: getCell[0], col: getCell[1] - 1},
            {row: getCell[0], col: getCell[1] + 1},
        ]
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            let neighborRow = neighbor.row
            let neighborCol = neighbor.col
            //check if the neighbor is within the size of the game then push to stack if correct
            if (neighborRow >= 0 && neighborRow < gameWidth && neighborCol >= 0 && neighborCol < gameHeight) {
                if (cells[neighborRow][neighborCol] === 0 && visited[neighborRow][neighborCol] === false) {
                    let tmp = [neighborRow, neighborCol]
                    stack.push(tmp)
                    visited[neighborRow][neighborCol] = getCell
                }
                if (neighborRow === cell2[0] && neighborCol === cell2[1]) {
                    visited[cell2[0]][cell2[1]] = getCell
                    logPath(visited)
                }
            }
        }
    }
}
var finishPath = false
const logPath = (v) => {
    let path = []
    let c = cell2
    //loop until reach start cell
    while (c[0] !== cell1[0] || c[1] !== cell1[1]) {
        c = v[c[0]][c[1]]
        path.push(c)
    }
    let checkExistCell2 = false
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === cell2[0] && path[i][1] === cell2[1]) {
            checkExistCell2 = true
            break
        }
    }
    if (!checkExistCell2) {
        path.reverse()
        path.push(cell2)
    } else {
        path.push(cell1)
    }
    //check path's length and mark cells in path
    let pathWay = new Map()
    if (path.length <= 2 && !finishPath) {
        pathWay.set(0, path)
        removeCells()

    } else {
        let count = 0
        pathWay.set(count, [path[0]])
        pathWay.set(count, [...pathWay.get(count), path[1]])
        for (let i = 2; i < path.length; i++) {
            if (path[i][0] !== path[i - 2][0] && path[i][1] !== path[i - 2][1]) {
                count++
                if (pathWay.get(count) !== undefined) {
                    pathWay.set(count, [...pathWay.get(count), path[i]])
                } else {
                    pathWay.set(count, [path[i]])
                }
            } else {
                if (pathWay.get(count) !== undefined) {
                    pathWay.set(count, [...pathWay.get(count), path[i]])
                } else {
                    pathWay.set(count, [path[i]])
                }
            }
        }
        if (count <= 2 && !finishPath) {
            removeCells()
        }
    }
}

function removeCells() {
    // Kiểm tra xem có đủ hai ô được chọn không
    if (cell1 && cell2) {
        // Lấy DOM elements của hai ô
        const div1 = document.querySelector(`.cell_${cell1[0]}-${cell1[1]}`);
        const div2 = document.querySelector(`.cell_${cell2[0]}-${cell2[1]}`);

        // Xóa các ô khỏi DOM
        div1.parentNode.removeChild(div1);
        div2.parentNode.removeChild(div2);


        // Đặt giá trị của hai ô trong ma trận về 0
        cells[cell1[0]][cell1[1]] = 0;
        cells[cell2[0]][cell2[1]] = 0;

        // Đặt lại các biến lưu trạng thái cho các ô được chọn
        cell1 = null;
        cell2 = null;

        // Vẽ lại ma trận sau khi xóa
        reRender();
    }
}

//shuffle pokemon
let shuffle_display
const shuffleButton = () => {
    if (shuffleIndex >= 0) {
        for (let i = 1; i < cells.length - 1; i++) {
            for (let j = 1; j < cells[i].length - 1; j++) {
                if (cells[i][j] !== 0) {
                    let c1 = cells[i][j]
                    let i_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                    let j_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                    for (let k = 0; k < 10000; k++) {
                        if (cells[i_r][j_r] === 0) {
                            i_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                            j_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                        } else {
                            break
                        }
                    }
                    let value_c1 = cells[i][j]
                    cells[i][j] = cells[i_r][j_r]
                    cells[i_r][j_r] = value_c1
                }
            }
        }
        console.log("Num : " + cells )
        shuffleIndex = shuffleIndex - 1
        shuffle_display = shuffleIndex
    }
    reRender()
}

//update the game frame after changes
const reRender = () => {
    gameFrame.textContent = ""
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
                draw(i, j, cells[i][j])
        }
    }
}
document.getElementById("shuffleButton").addEventListener("click", function () {
    init()
    shuffleButton()

});
init()
