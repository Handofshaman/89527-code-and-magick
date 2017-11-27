'use strict';
/* exported renderStatistics */
(function () {
  var COORD_X = 140;
  var COORD_Y = 240;
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
  function getRandomFloat(min, max) {
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
    ctx.strokeStyle = 'rgb(255 , 140, 0)';
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeigth);
  }

  // Функция рисования текста на облаке
  function drawText(ctx) {
    ctx.fillText('Ура, ' + minName + ' победил!', COORD_X, nameTextCoordY);
    ctx.fillText('Список результатов:', COORD_X, resultTextCoordY);
  }

  // Функция рисования столбца гистограммы
  function drawGistogramm(ctx, times, names, i, coordXTotal) {
    // находим координату Y для текста с указанием времени участников.
    var coordYTimes = (gistoY - (times[i] / 100));
    // сбрасываем цвет текста на чёрный.
    ctx.fillStyle = 'black';
    // рисуем текст с указанием времени участников.
    ctx.fillText(times[i], coordXTotal, coordYTimes - 20);
    // рисуем имена участников
    ctx.fillText(names[i], coordXTotal, COORD_Y);
    // устанавливаем цвет гистограмм.
    ctx.fillStyle = (names[i] === 'Вы') ? ('rgba(255, 0, 0, 0.5)') : ('rgba(0, 0, 255,' + getRandomFloat(0.1, 1) + ')');
    // отрисовываем столбец гистограммы
    ctx.fillRect(coordXTotal, gistoY, gistoWidth, -times[i] / 100);
  }

  // Создание конечной сцены
  window.renderStatistics = function (ctx, names, times) {
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
    var coordXTotal = COORD_X;
    // отрисовываем гистограммы.
    for (var i = 0; i <= names.length - 1; i++) {
      drawGistogramm(ctx, times, names, i, coordXTotal, COORD_Y);
      // сдвигаем следующую гистограмму на 50px.
      coordXTotal = coordXTotal + gistogrammShift;
    }
    // Возвращаем значение для coordXTotal
    coordXTotal = 140;
  };
}());
