var renderStatistics = function (ctx, names, times) { 
 var coordX = 140;
 var coordY = 240;
 var minName = '';
 var winWord = ' победил!';
 //Рисуем тень под 'облаком'.
 ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
 ctx.fillRect(110, 20, 420, 270);
 //рисуем 'облако'.
 ctx.fillStyle = 'white';
 ctx.fillRect(100, 10, 420, 270);
 ctx.strokeStyle = 'rgb(255,140,0)';
 ctx.strokeRect(100, 10, 420, 270);

 // настраиваем шрифт и цвет текста.
 ctx.fillStyle = 'black';
 ctx.font='16px PT Mono';
 // округляем массив значений времени.
 for (var j = 0;j < times.length; j++){
   times[j] = Math.round(times[j]);
 }
 // находим игрока с минимальным временем и сохраняем его имя и значение времени. 
 var minValue = times[0];
	 for (var j = 0;j <= times.length - 1;j++ ){
		if (times[j] <= minValue) {
				minValue = times[j];
				minName = names[j];
			}
	}
 // меняем текст в зависимости от победителя.
 if (minName == 'Катя'){
	winWord = ' победила!';
	}
 if (minName == 'Вы'){
	winWord = ' победили!';
	}  
 // отрисовываем текст.
 ctx.fillText('Ура, ' + minName + winWord,coordX,40);
 ctx.fillText('Список результатов:',coordX,60);
 // генерируем значение для альфа канала  гистограммы
 function getRandomAlpha(min, max){
  return Math.random() * (max - min) + min;
  } 
 // отрисовываем гистограммы.
 for (var i = 0;i <= names.length - 1; i++){
	//находим координату Y для текста с указанием времени участников.
	var coordYTimes = (220 - (times[i] / 100));	
	// сбрасываем цвет текста на чёрный.
	ctx.fillStyle = 'black';
	//рисуем текст с указанием времени участников.
	ctx.fillText(times[i], coordX, coordYTimes - 20);
	//рисуем имена участников
	ctx.fillText(names[i], coordX, coordY);
	//устанавливаем цвет гистограмм.
		if (names[i] == 'Вы' ){
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
		}
		else{
        ctx.fillStyle = 'rgba(0, 0, 255,' + getRandomAlpha(0,1).toFixed(2) + ')';
		console.log('Цвет колонны: ' + ctx.fillStyle);
		}
	//отрисовываем гистограммы		
	ctx.fillRect(coordX,220,40,-times[i] / 100);
	//сдвигаем следующую гистограмму на 50px.	
	coordX = coordX + 90;
   console.log('высота гистограммы ' + times[i] / 100);
   console.log(names[i], (times[i] / 50) + 80);
   console.log('Отладочное значение:' + coordYTimes);
  }
console.log(names);
console.log(times);
 };
