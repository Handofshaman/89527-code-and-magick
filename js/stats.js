var renderStatistics = function(ctx,names,times){
  function inRad(num) {
	//я ведь говорил, что функция принимает угол в радианах?
	return num * Math.PI / 180;
  }

 var coordX = 140;
 var coordY = 240;

 var minName = '';
 var winWord = ' победил!';

 ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
 ctx.fillRect(110,20,420,270);
 ctx.fillStyle = 'white';
 ctx.fillRect(100, 10, 420, 270);
 ctx.fillStyle = 'black';
 ctx.font='16px PT Mono';
 for (var j = 0;j < times.length; j++){
   times[j] = Math.round(times[j]);
 }



 console.log(names);
 console.log(times);
 var minValue = times[0];
 for (var j = 0;j <= times.length - 1;j++ ){
    if (times[j] <= minValue) {
			minValue = times[j];
			minName = names[j];
		}
 }
console.log(minValue,minName);
 if (minName == 'Катя'){
	winWord = ' победила!' ;
  }
 if (minName == 'Вы'){
	winWord = ' победили!'
 }

 ctx.fillText('Ура ' + minName + winWord,coordX,40);
 ctx.fillText('Список результатов:',coordX,60);


 for (var i = 0;i <= names.length - 1; i++){
   ctx.fillStyle = 'black';
   ctx.fillText(times[i],coordX,(220 + (times[i] / 50) + 20)) * (-1);
	 ctx.fillText(names[i],coordX,coordY);
    if (names[i] == 'Вы' ){
        ctx.fillStyle = 'red';

      }
      else{
        ctx.fillStyle = 'blue';

      }
	 ctx.fillRect(coordX,220,40,-times[i] / 50);

	 coordX = coordX + 90;
   console.log('высота гистограммы ' + times[i] / 50);
   console.log(names[i],(times[i] / 50) + 80);






 }
/*
 //console.log('Минимальное значение у игрока: '+ minName +' '+ Math.round(minValue));
// console.log(names[0],names[1],names[2],names[3]);
 //console.log(times);

 */

 };
