importScripts('opencv.js');

self.onmessage = function (e) {
	console.log("successfully loading opencv.js");
	match(e.data.data0,e.data.data1,e.data.data2,e.data.data3,e.data.data4,e.data.data5,e.data.data6);
}

self.onerror = function (e) {
	console.log("loading error");
}

function match(ImageData0,ImageData1,ImageData2,ImageData3,ImageData4,ImageData5,ImageData6)
{
	let src = cv.matFromImageData(ImageData0);
	let temp1 = cv.matFromImageData(ImageData1);
	let temp2 = cv.matFromImageData(ImageData2);
	let temp3 = cv.matFromImageData(ImageData3);
	let temp4 = cv.matFromImageData(ImageData4);
	let temp5 = cv.matFromImageData(ImageData5);
	let temp6 = cv.matFromImageData(ImageData6);
	
	let dst1 = new cv.Mat();
	let mask1 = new cv.Mat();
	let dst2 = new cv.Mat();
	let mask2 = new cv.Mat();
	let dst3 = new cv.Mat();
	let mask3 = new cv.Mat();
	let dst4 = new cv.Mat();
	let mask4 = new cv.Mat();
	let dst5 = new cv.Mat();
	let mask5 = new cv.Mat();
	let dst6 = new cv.Mat();
	let mask6 = new cv.Mat();
	
	var maxvalue = new Array();
	
	cv.matchTemplate(src, temp1, dst1, cv.TM_CCOEFF, mask1);
	let result1 = cv.minMaxLoc(dst1, mask1);
	maxvalue[1] = result1.maxVal;
	cv.matchTemplate(src, temp2, dst2, cv.TM_CCOEFF, mask2);
	let result2 = cv.minMaxLoc(dst2, mask2);
	maxvalue[2] = result2.maxVal;
	cv.matchTemplate(src, temp3, dst3, cv.TM_CCOEFF, mask3);
	let result3 = cv.minMaxLoc(dst3, mask3);
	maxvalue[3] = result3.maxVal;
	cv.matchTemplate(src, temp4, dst4, cv.TM_CCOEFF, mask4);
	let result4 = cv.minMaxLoc(dst4, mask4);
	maxvalue[4] = result4.maxVal;
	cv.matchTemplate(src, temp5, dst5, cv.TM_CCOEFF, mask5);
	let result5 = cv.minMaxLoc(dst5, mask5);
	maxvalue[5] = result5.maxVal;
	cv.matchTemplate(src, temp6, dst6, cv.TM_CCOEFF, mask6);
	let result6 = cv.minMaxLoc(dst6, mask6);
	maxvalue[6] = result6.maxVal;
	
	
	var maxData = maxvalue[1];
	for (var i = 1; i < 7; i++) 
	{
		if (maxvalue[i] >= maxData) 
		{
			maxData = maxvalue[i]; 
			var num = i;
		}
	}
	
	var maxPoint;
	var col,row;
	switch(num)
	{
	case 1:
	  maxPoint = result1.maxLoc;
	  col = temp1.cols;
	  row = temp1.rows;
	  break;
	case 2:
	  maxPoint = result2.maxLoc;
	  col = temp2.cols;
	  row = temp2.rows;
	  break;
	case 3:
	  maxPoint = result3.maxLoc;
	  col = temp3.cols;
	  row = temp3.rows;
	  break;
	case 4:
	  maxPoint = result4.maxLoc;
	  col = temp4.cols;
	  row = temp4.rows;
	  break;
	case 5:
	  maxPoint = result5.maxLoc;
	  col = temp5.cols;
	  row = temp5.rows;
	  break;
	case 6:
	  maxPoint = result6.maxLoc;
	  col = temp6.cols;
	  row = temp6.rows;
	  break;
	}
	
	let point = new cv.Point(maxPoint.x + col, maxPoint.y + row);
	console.log("the object number is "+num+", the point is : ("+point.x+","+point.y+")");
  let msg = {point1 : maxPoint.x, point2:maxPoint.y, point3:col, point4:row};
  postMessage(msg);
  
	src.delete(); 
	dst1.delete(); dst2.delete();dst3.delete();
	dst4.delete();dst5.delete();dst6.delete();
	mask1.delete();mask2.delete();mask3.delete();
	mask4.delete();mask5.delete();mask6.delete();
}