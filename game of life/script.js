var max_rows = 32, max_cols = 32;
var frame_delay = 4;

let last_render_time = 0;
let grid_display = document.getElementById("grid");
let pause = document.getElementById("pause");
let dead_cells = document.getElementsByClassName("ded");
let alive_cells = document.getElementsByClassName("alv");
let inc = document.getElementById("inc");
let dec = document.getElementById("dec");

grid_display.style.setProperty('grid-template-columns', 'repeat(' + max_cols + ', 1fr)');
grid_display.style.setProperty('grid-template-rows', 'repeat(' + max_rows + ', 1fr)');

pause.addEventListener("click", () => {
	pause.classList.toggle(".on");
	if (pause.textContent == "Play") pause.textContent = "Pause"
	else pause.textContent = "Play"
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
	let frame = window.requestAnimationFrame(main);

	for (let alive of alive_cells) {
		alive.addEventListener("click", (event) => {
			let node = event.target
			let co_ords = node.id.split("-")
			grid[co_ords[0]][co_ords[1]] = false;

			node.classList.remove("alv")
			node.classList.add("ded")
		})
	}

	for (let dead of dead_cells) {
		dead.addEventListener("click", (event) => {
			let node = event.target
			let co_ords = node.id.split("-")
			grid[co_ords[0]][co_ords[1]] = true;

			node.classList.remove("ded")
			node.classList.add("alv")
		})
	}

	const last_render_seconds = (current_time - last_render_time) / 1000;
    if (last_render_seconds < 1 / frame_delay || is_paused()) return;

    last_render_time = current_time;

    grid = evolve(grid);
    draw_grid(grid);
}

function evolve(cur_gen) 
{
  	let next_gen = initialize_grid();

  	let positions = [0,1, 0,-1, 1,0, -1,0, 1,1, -1,-1, -1,1, 1,-1];
  	for (let i = 0; i < max_rows; i++) {
	    for (let j = 0, count; j < max_cols; j++) {
			count = 0;

			for (let k = 0, x, y; k < 16;) {
				y = i + positions[k++], x = j + positions[k++];
				count += y >= 0 && x >= 0 && x < max_cols && y < max_rows && cur_gen[y][x];
			}

			next_gen[i][j] = count == 3 || (count == 2 && cur_gen[i][j]);
	    }
  	}

	next_gen[16][16] = true;
	next_gen[15][16] = true;
	next_gen[14][16] = true;

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
		for (let j = 0; j < max_cols; j++)
			html += (grid[i][j]) ? "<div id='"+ i + "-" + j + "' class='cell alv'></div>" : "<div id='"+ i + "-" + j + "' class='cell ded'></div>";
	}

	grid_display.innerHTML = html;
}

var is_paused = () => { return (pause.classList[0] == ".on") ? true : false }

let grid = initialize_grid();
main(0);
