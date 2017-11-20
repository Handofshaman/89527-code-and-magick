var renderStatistics = function(ctx,names,times){

 var  offset = 10;
 var coordX = 140;
 var coordY = 240; 
 var minValue = times[0];
 var minName = '';
 var winWord = '';
 
 
 //  function inRad(num){
//	return num * Math.PI / 180;
//	} 
 ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
 ctx.fillRect(100 + offset,10 + offset,420,270);	
 ctx.fillStyle = 'white';
 ctx.fillRect(100, 10, 420, 270);
 ctx.fillStyle = 'black';
 ctx.font='16px PT Mono';

 for (j = 0;j < times.length;j++ ){	 ;
		if (times[j] < minValue) {
			minValue = times[j];
			minName = names[j];	
		}
 }
 
 if (minName == 'Катя'){
	winWord = ' победила!' ;
  }
 if (minName == 'Вы'){
	winWord = ' победили!' 
 }
else {
	 var winWord = ' победил!';


}
 

 ctx.fillText('Ура ' + minName + winWord,coordX,40);
 ctx.fillText('Список результатов:',coordX,60);
 
 
 for (var i = 0;i < names.length; i++){
	// times[i] = Math.round(times[i]);	
	 ctx.fillText(names[i],coordX,coordY);
	 ctx.fillRect(coordX,220,40,0 - times[i] / 100);
	 coordX = coordX + 90;	
	 console.log(Math.round(times[i] / 100));
	 
 }
 

 
 
 console.log('Минимальное значение у игрока: '+ minName +' '+ Math.round(minValue));
 console.log('Вы прекрасны.Вот список победителей');
 console.log(names[0],names[1],names[2],names[3]);
 console.log(times);



};