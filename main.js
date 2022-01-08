let turn = 'x';
let grid_items = Array.from(document.getElementsByClassName('grid-item'));
let diag_left = [];
let diag_right = [];
let acrosses = [
  [],
  [],
  []
];
let downs = [
  [],
  [],
  []
];

function init() {
  grid_items.forEach(e => e.addEventListener('click', handle_click));
  build_checks();
}

function build_checks() {
  grid_items.forEach((grid_item, i) => {
    if (i === 0 || i === 4 || i === 8) {
      diag_right.push(grid_item);
    }
    if (i === 2 || i === 4 || i === 6) {
      diag_left.push(grid_item);
    }
    if (i < 3) {
      acrosses[0].push(grid_item);
    }
    if (i > 2 && i < 6) {
      acrosses[1].push(grid_item);
    }
    if (i > 5) {
      acrosses[2].push(grid_item);
    }
    if (i % 3 === 0) {
      downs[0].push(grid_item);
    }
    if (i === 1 || i === 4 || i === 7) {
      downs[1].push(grid_item);
    }
    if (i === 2 || i === 5 || i === 8) {
      downs[2].push(grid_item);
    }
  });
}

function apply_winner(winners, class_name) {
  winners.forEach(e => {
    e.classList.add('win');
    e.classList.add(class_name);
  });
}

function is_winning_three(three) {
  let last_seen = null;
  let count = 0;
  three.forEach(e => {
    if (e === last_seen) {
      count++;
    } else {
      last_seen = e;
      count = 1;
    }
  });
  return last_seen !== null && count === 3;
}

function check_game_end() {
  let is_done = false;
  let count = 0;

  function count_all(e) {
    if (e.classList.contains('x')) {
      count++;
      return 'x'
    }
    if (e.classList.contains('o')) {
      count++;
      return 'o';
    }
    return null;
  }

  if (is_winning_three(diag_left.map(count_all))) {
    apply_winner(diag_left, 'win-diag-left');
    is_done = true;
  }
  if (is_winning_three(diag_right.map(count_all))) {
    apply_winner(diag_right, 'win-diag-right');
    is_done = true;
  }

  acrosses.forEach(e => {
    if (is_winning_three(e.map(count_all))) {
      apply_winner(e, 'win-across');
      is_done = true;
    }
  });

  downs.forEach(e => {
    if (is_winning_three(e.map(count_all))) {
      apply_winner(e, 'win-down');
      is_done = true;
    }
  });

  if (count === 24) {
    is_done = true;
  }

  if (is_done) {
    grid_items.forEach(e => {
      e.removeEventListener('click', handle_click);
      e.classList.add('done');
    });
  }

}

function handle_click(event) {
  let clicked_elem = event.target;

  // add x or o class to grid-item
  clicked_elem.classList.add(turn);

  // change players turn
  turn = turn === 'x' ? 'o' : 'x';

  // remove the event listener
  clicked_elem.removeEventListener('click', handle_click);

  check_game_end();
}

init();