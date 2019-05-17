const canvas = document.getElementById("canvas");
const mirror = document.getElementById("mirror");
const ctx = canvas.getContext("2d");
const ctxMirror = mirror.getContext("2d");
let points = [];
let arrayCords = [];
const speed = 10; // speed animation

ctx.clearRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  if (points.length >= 4) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [{ x, y }];
  } else {
    points.push({ x, y });
  }
  drawPoint(x, y);
  if (points.length === 4) {
    drawCurve(points, ctx, arrayCords);
    calcMirror();
  }
});

function calcMirror() {
  const mirrorPoints = points.map(point => {
    return {
      x: 300 - point.x,
      y: point.y
    };
  });
  const curvePoints = [];
  drawCurve(mirrorPoints, ctxMirror, curvePoints);
}

function drawPoint(x, y) {
  const pointSize = 3; // Change according to the size of the point.

  ctx.fillStyle = "#ff2626"; // Red color

  ctx.beginPath(); //Start path
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
  ctx.fill(); // Close the path and fill.
}

function drawCurve(points, ctx, arrayCords) {
  arrayCords = getBezierCurve(points); // получаем координаты точек кривой безье
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath(); // очищаем полотно и начинаем рисовать
  ctx.moveTo(arrayCords[0].x, arrayCords[0].y); // двигаемся к 1 точке

  let i = 0;
  const interval = setInterval(function() {
    drawCurvePoint(); // вызываем функцию прорисовки
    i++; // увеличиваем i
    if (i >= arrayCords.length) {
      // проверяем не конец ли массива?
      clearInterval(interval); // конец, удаляем интервал
    }
  }, speed);

  function drawCurvePoint() {
    // функция прорисовки точки
    ctx.lineTo(arrayCords[i].x, arrayCords[i].y); // рисуем итую точку
    ctx.stroke();
  }
}

function getBezierBasis(i, n, t) {
  // находим bi,n по алгоритму де Кастельжо
  // Факториал
  function f(n) {
    return n <= 1 ? 1 : n * f(n - 1);
  }
  // считаем i-й элемент полинома Берштейна
  return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

function getBezierCurve(arr) {
  const step = 0.01; // пишем шаг
  const res = []; // создаем массив в котором будем хранить новые точки для построения

  for (let t = 0; t < 1 + step; t += step) {
    if (t > 1) {
      t = 1; // сумма шага не может быть больше 1
    }

    let ytmp = 0; // временные для хранения координат
    let xtmp = 0;
    arr.map((elem, i) => {
      const b = getBezierBasis(i, arr.length - 1, t); // вычисляем наш полином Берштейна
      xtmp += elem.x * b; // записываем и прибавляем результат
      ytmp += elem.y * b;
      return elem;
    });
    res.push({ x: xtmp, y: ytmp }); // запушиваем конечный результат в наш новыйй массив
  }
  return res; // возвращаем его
}
