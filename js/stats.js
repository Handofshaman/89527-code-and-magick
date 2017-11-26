'use strict';
/* exported renderStatistics */
// генерируем значение для альфа канала  гистограммы
var coordX = 140;
var coordY = 240;
var gistoY = 220;
var gistoWidth = 40;
var minName = '';
var nameTextCoordY = 40;
var resultTextCoordY = 60;
var gistogrammShift = 90;
var rectX = 100;
var rectY = 10;
var rectHeigth = 270;
var rectWidth = 420;

// Функция генерируем прозрачность гистограмм
function getRandomTransparency(min, max) {
  return Math.random() * (max - min) + min;
}
// Функция рисования облака
function drawClouds(ctx) {
  // Рисуем тень под 'облаком'.
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(rectX + 10, rectY + 10, rectWidth, rectHeigth);
  // рисуем 'облако'.
  ctx.fillStyle = 'white';
  ctx.fillRect(rectX, rectY, rectWidth, rectHeigth);
  ctx.strokeStyle = 'rgb(255,140,0)';
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeigth);
}
// Функция рисования текста на облаке
function drawText(ctx) {
  ctx.fillText('Ура, ' + minName + ' победил!', coordX, nameTextCoordY);
  ctx.fillText('Список результатов:', coordX, resultTextCoordY);
}
// Функция рисования столбца гистограммы
function drawGistogramm(ctx, times, names, i) {
  // находим координату Y для текста с указанием времени участников.
  var coordYTimes = (gistoY - (times[i] / 100));
  // сбрасываем цвет текста на чёрный.
  ctx.fillStyle = 'black';
  // рисуем текст с указанием времени участников.
  ctx.fillText(times[i], coordX, coordYTimes - 20);
  // рисуем имена участников
  ctx.fillText(names[i], coordX, coordY);
  // устанавливаем цвет гистограмм.
  if (names[i] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  } else {
    ctx.fillStyle = 'rgba(0, 0, 255,' + getRandomTransparency(0.1, 1) + ')';
  }
  // отрисовываем столбец гистограммы
  ctx.fillRect(coordX, gistoY, gistoWidth, -times[i] / 100);
}
// Создание конечной сцены
var renderStatistics = function (ctx, names, times) {
  // Рисуем облако
  drawClouds(ctx);
  // настраиваем шрифт и цвет текста.
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  // округляем массив значений времени.
  for (var j = 0; j < times.length; j++) {
    times[j] = Math.round(times[j]);
  }
  // находим игрока с минимальным временем и сохраняем его имя и значение времени.
  var minValue = times[0];
  for (var c = 0; c <= times.length - 1; c++) {
    if (times[c] <= minValue) {
      minValue = times[c];
      minName = names[c];
    }
  }
  // отрисовываем текст.
  drawText(ctx);
  // отрисовываем гистограммы.
  for (var i = 0; i <= names.length - 1; i++) {
    drawGistogramm(ctx, times, names, i, coordX, coordY);
    // сдвигаем следующую гистограмму на 50px.
    coordX = coordX + gistogrammShift;
  }
};
