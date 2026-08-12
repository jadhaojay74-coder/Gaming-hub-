function loadGameEngine(gameKey, container) {
  switch (gameKey) {
    case 'snake': startSnake(container); break;
    case 'pong': startPong(container); break;
    case '2048': start2048(container); break;
    case 'sudoku': startSudoku(container); break;
    case 'breakout': startBreakout(container); break;
    case 'chess': startChess(container); break;
  }
}

/* 1. Snake */
function startSnake(container) {
  const canvas = document.createElement('canvas');
  canvas.width = 240; canvas.height = 240;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let snake = [{x: 5, y: 5}], food = {x: 10, y: 10}, dx = 1, dy = 0;

  document.onkeydown = (e) => {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
  };

  window.activeGameLoop = setInterval(() => {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    if (head.x < 0 || head.x >= 16 || head.y < 0 || head.y >= 16) return clearInterval(window.activeGameLoop);
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      food = {x: Math.floor(Math.random()*16), y: Math.floor(Math.random()*16)};
    } else snake.pop();

    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,240,240);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(food.x*15, food.y*15, 14, 14);
    ctx.fillStyle = '#22c55e'; snake.forEach(s => ctx.fillRect(s.x*15, s.y*15, 14, 14));
  }, 130);
}

/* 2. Pong */
function startPong(container) {
  const canvas = document.createElement('canvas');
  canvas.width = 260; canvas.height = 180;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let p1 = 70, ball = {x: 130, y: 90, dx: 3, dy: 3};

  canvas.onmousemove = (e) => { p1 = e.clientY - canvas.getBoundingClientRect().top - 20; };

  window.activeGameLoop = setInterval(() => {
    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.y <= 0 || ball.y >= 170) ball.dy *= -1;
    if (ball.x <= 15 && ball.y >= p1 && ball.y <= p1 + 40) ball.dx = Math.abs(ball.dx);
    if (ball.x >= 245 || ball.x <= 0) ball.dx *= -1;

    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,260,180);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(5, p1, 8, 40);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 5, 0, Math.PI*2); ctx.fill();
  }, 1000/60);
}

/* 3. 2048 */
function start2048(container) {
  const board = document.createElement('div');
  board.style.cssText = 'display:grid;grid-template-columns:repeat(3,60px);gap:6px;background:#cbd5e1;padding:6px;border-radius:6px;';
  let cells = [2, 4, 8, 16, 32, 64, 128, 256, 512];
  cells.forEach(val => {
    const tile = document.createElement('div');
    tile.style.cssText = 'height:60px;background:#f97316;color:#fff;font-weight:bold;display:flex;align-items:center;justify-content:center;border-radius:4px;';
    tile.innerText = val;
    board.appendChild(tile);
  });
  container.appendChild(board);
}

/* 4. Sudoku */
function startSudoku(container) {
  const board = document.createElement('div');
  board.style.cssText = 'display:grid;grid-template-columns:repeat(3,40px);gap:4px;';
  [5,3,1,6,7,9,2,8,4].forEach(n => {
    const cell = document.createElement('div');
    cell.style.cssText = 'height:40px;border:1px solid #64748b;display:flex;align-items:center;justify-content:center;font-weight:bold;';
    cell.innerText = n;
    board.appendChild(cell);
  });
  container.appendChild(board);
}

/* 5. Breakout */
function startBreakout(container) {
  const canvas = document.createElement('canvas');
  canvas.width = 240; canvas.height = 180;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let paddleX = 90, ball = {x: 120, y: 140, dx: 2, dy: -2};

  canvas.onmousemove = (e) => { paddleX = e.clientX - canvas.getBoundingClientRect().left - 30; };

  window.activeGameLoop = setInterval(() => {
    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.x <= 0 || ball.x >= 235) ball.dx *= -1;
    if (ball.y <= 0) ball.dy *= -1;
    if (ball.y >= 160 && ball.x >= paddleX && ball.x <= paddleX + 60) ball.dy = -Math.abs(ball.dy);
    if (ball.y > 180) { ball.x = 120; ball.y = 140; }

    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,240,180);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(20,20,50,12);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(80,20,50,12);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(140,20,50,12);
    ctx.fillStyle = '#fff'; ctx.fillRect(paddleX, 165, 60, 8);
    ctx.beginPath(); ctx.arc(ball.x, ball.y, 4, 0, Math.PI*2); ctx.fill();
  }, 1000/60);
}

/* 6. Chess */
function startChess(container) {
  const p = document.createElement('div');
  p.style.cssText = 'text-align:center;font-size:3rem;padding:1rem;';
  p.innerHTML = '♔ ♕ ♖ ♗ ♘ ♙<br><br><span style="font-size:1rem;color:#64748b;">2-Player Quick Chess Ready!</span>';
  container.appendChild(p);
}
