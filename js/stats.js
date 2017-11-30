'use strict';
/* exported renderStatistics */
(function () {
  var COORD_X = 140;
  var COORD_Y = 240;
  var GISTO_Y = 220;
  var GISTO_WIDTH = 40;
  var minName = '';
  var NAME_TEXT_COORD_Y = 40;
  var RESULT_TEXT_COORD_Y = 60;
  var GISTOGRAMM_SHIFT = 90;
  var RECT_X = 100;
  var RECT_Y = 10;
  var RECT_HEIGHT = 270;
  var RECT_WIDTH = 420;

  // Функция генерируем прозрачность гистограмм
  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  // Функция рисования облака
  function drawClouds(ctx, x, y, width, height) {
    // Рисуем тень под 'облаком'.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + 10, y + 10, width, height);
    // рисуем 'облако'.
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = 'rgb(255 , 140, 0)';
    ctx.strokeRect(x, y, width, height);
  }
  // Функция рисования текста на облаке
  function drawText(ctx, name, x, NameTextY, ResultTextY) {
    ctx.fillText('Ура, ' + name + ' победил!', x, NameTextY);
    ctx.fillText('Список результатов:', x, ResultTextY);
  }
  // Функция рисования столбца гистограммы
  function drawGistogramm(ctx, times, names, yGisto, cnt, xTotal, gWidth, y) {
    // находим координату Y для текста с указанием времени участников.
    var coordYTimes = ( yGisto - (times[cnt] / 100));
    // сбрасываем цвет текста на чёрный.
    ctx.fillStyle = 'black';
    // рисуем текст с указанием времени участников.
    ctx.fillText(times[cnt], xTotal, coordYTimes - 20);
    // рисуем имена участников
    ctx.fillText(names[cnt], xTotal, y);
    // устанавливаем цвет гистограмм.
    ctx.fillStyle = (names[cnt] === 'Вы') ? ('rgba(255, 0, 0, 0.5)') : ('rgba(0, 0, 255,' + getRandomFloat(0.1, 1) + ')');
    // отрисовываем столбец гистограммы
    ctx.fillRect(xTotal, yGisto, gWidth, -times[cnt] / 100);
  }
  // Создание конечной сцены
  window.renderStatistics = function (ctx, names, times) {
    // Рисуем облако
    drawClouds(ctx, RECT_X, RECT_Y, RECT_WIDTH, RECT_HEIGHT);
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
    drawText(ctx, minName, COORD_X, NAME_TEXT_COORD_Y, RESULT_TEXT_COORD_Y);
    var coordXTotal = COORD_X;
    // отрисовываем гистограммы.
    for (var i = 0; i <= names.length - 1; i++) {
      drawGistogramm(ctx, times, names, GISTO_Y, i, coordXTotal, GISTO_WIDTH, COORD_Y);
      // сдвигаем следующую гистограмму на 50px.
      coordXTotal = coordXTotal + GISTOGRAMM_SHIFT;
    }    
  };
}());
