var max_rows = 32, max_cols = 48;
var frame_delay = 6;

let population = 0;
let last_render_time = 0;
let grid_display = document.getElementById("grid");
let pause = document.getElementById("pause");
let dead_cells = document.getElementsByClassName("ded");
let alive_cells = document.getElementsByClassName("alv");
let inc = document.getElementById("inc");
let dec = document.getElementById("dec");
let clr = document.getElementById("clr");
let dragging = false;

grid_display.style.setProperty('grid-template-columns', 'repeat(' + max_cols + ', 1fr)');
grid_display.style.setProperty('grid-template-rows', 'repeat(' + max_rows + ', 1fr)');

pause.addEventListener("click", () => {
	pause.classList.toggle(".on");
	if (pause.textContent == "PLAY") pause.textContent = "PAUSE"
	else pause.textContent = "PLAY"
})

clr.addEventListener("click", () => {
	grid = initialize_grid()
})

inc.addEventListener("click", () => {
	frame_delay++;
	document.getElementById("display-speed").textContent = frame_delay;
})

dec.addEventListener("click", () => {
	if (frame_delay == 1) return;
	frame_delay--;
	document.getElementById("display-speed").textContent = frame_delay;
})

function main(current_time)
{
	window.requestAnimationFrame(main);

	for (let alive of alive_cells) {
		alive.addEventListener("click", (event) => {
			let node = event.target;
			let co_ords = node.id.split("-");
			grid[co_ords[0]][co_ords[1]] = false;

			node.classList.remove("alv");
			node.classList.add("ded");
		})
	}

	for (let dead of dead_cells) {
		dead.addEventListener("click", (event) => {
			dragging = true;
			let node = event.target;
			let co_ords = node.id.split("-");
			grid[co_ords[0]][co_ords[1]] = true;

			node.classList.add("alv");
			node.classList.remove("ded");
		})
	}

	const last_render_seconds = (current_time - last_render_time) / 1000;
    if (last_render_seconds < 1 / frame_delay || is_paused()) return;
    last_render_time = current_time;

	document.getElementById("population").textContent = population
	population = 0
    grid = evolve(grid);
    draw_grid(grid);
}

function evolve(cur_gen) 
{
  	let next_gen = initialize_grid();

  	let positions = [0,1, 0,-1, 1,0, -1,0, 1,1, -1,-1, -1,1, 1,-1];
  	for (let i = 0; i < max_rows; i++) {
	    for (let j = 0, count = 0; j < max_cols; j++, count = 0) {
			next_gen[i][j] = false;

			for (let k = 0, x, y; k < 16;) {
				y = i + positions[k++], x = j + positions[k++];
				count += y >= 0 && x >= 0 && x < max_cols && y < max_rows && cur_gen[y][x];
			}

			if (count == 3 || (count == 2 && cur_gen[i][j])) next_gen[i][j] = true, population++;
	    }
  	}

  	return next_gen;
}

function initialize_grid()
{
	let grid = [];

	for (let i = 0; i < max_rows; i++) {
		let grid_row = [];
		for (let j = 0; j < max_cols; j++) {
			grid_row.push(false);
		}
		grid.push(grid_row);
	}

	return grid;
}

function draw_grid(grid)
{
	let html = "";
	for (let i = 0; i < max_rows; i++) {
		for (let j = 0; j < max_cols; j++) {
			html += (grid[i][j]) ? "<div id='"+ i + "-" + j + "' class='cell alv'></div>" : "<div id='"+ i + "-" + j + "' class='cell ded'></div>";
		}
	}

	grid_display.innerHTML = html;
}

function draw_cell(event) {
	let node = event.target
	let co_ords = node.id.split("-");
	let r = parseInt(co_ords[0]), c = parseInt(co_ords[1]);

	if (grid[r][c]) {
		grid[r][c] = false;
		node.classList.remove("alv");
		node.classList.add("ded");
	} else {
		grid[r][c] = true;
		node.classList.remove("ded");
		node.classList.add("alv");
	}
}

var is_paused = () => { return (pause.classList[1] == ".on") ? true : false }

let grid = initialize_grid();

const gun = [
	[5, 1], [5, 2], [6, 1], [6, 2],   // initial block
	[5, 11], [6, 11], [7, 11],        // first glider
	[4, 12], [8, 12],                  // second glider
	[3, 13], [9, 13],                  // third glider
	[3, 14], [9, 14],                  // fourth glider
	[6, 15],                           // fifth glider
	[4, 16], [8, 16],                  // sixth glider
	[5, 17], [6, 17], [7, 17],        // seventh glider
	[6, 18],                           // eighth glider
	[3, 21], [4, 21], [5, 21],        // ninth glider
	[3, 22], [4, 22], [5, 22],        // tenth glider
	[2, 23], [6, 23],                  // eleventh glider
	[1, 25], [2, 25], [6, 25], [7, 25], // twelfth glider
	[3, 35], [4, 35],                  // final block
	[3, 36], [4, 36]                   // final block
];

for (const [row, col] of gun) grid[row][col] = true;

main(0);
