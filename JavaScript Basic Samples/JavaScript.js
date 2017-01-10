function JavaScript1() {
	var numbers = "";
	var i;

	for (i = 1; i < 301; i++) {
		numbers += i + " ";
	}

	document.getElementById("task").innerHTML = "1. Напишете израз, който изписва всички числа от 1 до 300.";
	document.getElementById("result").innerHTML = numbers;
}

function JavaScript2() {
	var x = 9;
	var check = "";

	if (x % 3 == 0) {
		check = "TRUE";
	}
	else {
		check = "FALSE";
	};

	document.getElementById("task").innerHTML = "2. Напишете израз, който проверява дали дадено число се дели на 3.";
	document.getElementById("result").innerHTML = "Числото " + x + " се дели на 3: " + check;
}

function JavaScript3() {
	var x = 15;
	var check = "";

	if (x % 4 == 0) {
		if (x % 7 == 0) {
			check = "TRUE";
		}
		else {
			check = "FALSE";
		}
	}
	else {
		check = "FALSE";
	};

	document.getElementById("task").innerHTML = "3. Напишете израз, който проверява дали дадено число се дели едновременно на 4 и на 7 (използвайте вложени if-else оператори).";
	document.getElementById("result").innerHTML = "Числото " + x + " се дели едновременно на 4 и на 7: " + check;
}

function JavaScript4() {
	var a = 6;
	var b = 3;
	var area = a * b;

	document.getElementById("task").innerHTML = "4. Напишете израз, който пресмята площта на правоъгълник чрез определени ширина и дължина.";
	document.getElementById("result").innerHTML = "Площта на правоълника е: " + area + " кв. см.";
}

function JavaScript5() {
	var a = 10;
	var b = 5;
	var h = 4;
	var area = ((a+b)*h)/2;

	document.getElementById("task").innerHTML = "5. Напишете израз, който пресмята площта на трапец по дадени страна А, страна B и височина h.";
	document.getElementById("result").innerHTML = "Площта на трапеца е: " + area + " кв. см.";
}

function JavaScript6() {
	var x = 15;
	var y = 27;
	var z = 7;
	var max = "";

	if (x > y) {
		max = x;
		if (x < z) {
			max = z;
		}
	}
	else {
		max = y;
		if (y < z) {
			max = z;
		}
	}

	document.getElementById("task").innerHTML = "6. Напишете израз, който намира най-голямото от 3 числа (използвайки вложени if-else оператори).";
	document.getElementById("result").innerHTML = "Най-голямото от трите числа " + x + ", " + y + " и " + z + " е: " + max;
}

function JavaScript7() {
	var i;
	var a = 50;
	var b = 100;
	var numbers = "";

	for (i = a; i < (b + 1); i++) {
		if (i % 7 == 0) {
			numbers += i + " ";
		}
	}

	document.getElementById("task").innerHTML = "7. Напишете израз, който намира всички делими на 7 числа, които се намират в интервала от 50 до 100.";
	document.getElementById("result").innerHTML = "Всички числа в този интервал, делими на 7 са: " + numbers;
}

function JavaScript8() {
	var i;
	var a = 20;
	var b = 60;
	var numbers = "";

	for (i = a; i < (b + 1); i++) {
		if (i % 4 == 0) {
			if (i % 9 == 0) {
				numbers += i + " ";
			}
		}
	}

	document.getElementById("task").innerHTML = "8. Напишете израз, който намира всички делими на 4 и на 9 числа, които се намират в интервала от 20 до 60.";
	document.getElementById("result").innerHTML = "Всички числа в този интервал, делими на 4 и на 9 са: " + numbers;
}

function JavaScript9() {
	var oldArray = [6, 4, 3, 0, 9];
	var newArray = [oldArray.length];
	var oldElements = "";
	var newElements = "";

	for (i = 0; i < oldArray.length; i++) {
		oldElements += oldArray[i] + " ";
	};

	for (i = 0; i < oldArray.length; i++) {
		newElements += (i * 7) + " ";
	};

	document.getElementById("task").innerHTML = "9. Напишете скрипт, който използва масив от 5 елемента и връща нов масив, който представлява индексите на стария, умножени по 7. Старият масив трябва да изглежда по следния начин: [6, 4, 3, 0, 9], новият масив трябва изглежда по следния начин: [0, 7, 14, 21, 28]";
	document.getElementById("result").innerHTML = "Стария масив съдържа елементи: [ " + oldElements + "]" + ", новият масив съдържа елементи: [ " + newElements + "].";
}

function JavaScript10() {
	var today = new Date();
	var day = today.getDay();
	var day = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];
	var date = today.getDate();
	var month = today.getMonth();
	var month = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
	var year = today.getFullYear();
	var hour = today.getHours();
	var min = today.getMinutes();

	var info = (day[today.getDay()] + ", " + date + " " + month[today.getMonth()] + " " + year + ", " + hour + ":"+ min + "ч.");

	document.getElementById("task").innerHTML = "11. Напишете скрипт, който изписва поотделно пълната дата, деня, месеца, годината, часа и минутите.";
	document.getElementById("result").innerHTML = info;
}