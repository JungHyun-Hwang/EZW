var promise1 = new Promise(function (resolve, reject) {
		// 해결됨 
		console.log("첫번째 Promise 완료");
		resolve("11111");
});

var promise2 = new Promise(function (resolve, reject) {
		console.log("두번째 Promise 완료");
		resolve("222222");
});


Promise.all([promise1, promise2]).then(function (values) {
	console.log("모두 완료됨", values[0], values[1]);
});