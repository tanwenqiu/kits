let kits = {};

//randomInt  获取n到m之间的随机整数
kits.randomInt = function(n, m) {
  let random = m - n + 1;
  return Math.floor(Math.random() * random + n);
};

//getFormatDate	获取当前时间，并且返回： xxxx-xx-xx HH:mm:ss格式的时间
kits.getFormatDate = function() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentDate =
    date.getFullYear() +
    "-" +
    month +
    "-" +
    strDate +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return currentDate;
};

//randomHexColor  获取一个随机的十六进制的颜色
kits.randomHexColor = function() {
  //定义字符串变量colorValue存放可以构成十六进制颜色值的值
  let colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
  //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
  let colorArray = colorValue.split(",");
  let color = "#"; //定义一个存放十六进制颜色值的字符串变量，先将#存放进去
  //使用for循环语句生成剩余的六位十六进制值
  for (let i = 0; i < 6; i++) {
    //colorArray[Math.floor(Math.random()*16)]随机取出
    // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
    //字符串相加后，得出的仍是字符串
    color += colorArray[Math.floor(Math.random() * 16)];
  }
  return color;
};
//随机生成RGB颜色
kits.randomRgbColor = function() {
  let r = Math.floor(Math.random() * 256); //随机生成256以内r值
  let g = Math.floor(Math.random() * 256); //随机生成256以内g值
  let b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
};



// 从本地存储中读取复杂数据 
kits.getLocalDataArray = function(key) {
  let data = localStorage.getItem(key);
  let arr = JSON.parse(data);
  return arr || [];
};


// 封装好的把复杂数据存储到本地里面的方法，默认是存储json格式字符串 
kits.saveLocalDataArray = function(key, arr) {
  let json = JSON.stringify(arr);
  localStorage.setItem(key, json);
};



// 向localStorage里面指定键(key)的数组数据追加一个数据对象（data）参数 
kits.appendDataIntoArray = function (key,data) {
  let arr = this.getLocalDataArray(key);
  arr.push(data);
  this.saveLocalDataArray(key,arr);
}


//根据对应的id从localStorage中指定键(key)的数组中删除一条数据参数  
kits.deleteLocalDataById = function (key,id) {
  let arr = this.getLocalDataArray(key);
  arr.forEach((e, i) => {
    if(e.id == id) {
      arr.splice(i,1);
    }
  });
  this.saveLocalDataArray(key,arr);
}


//根据id修改localStorage里面的指定键(key)的数组数据参数
kits.modifyLocalDataById = function (key, id, data) {
  let arr = this.getLocalDataArray(key);
  let flag = false;
  arr.forEach((e, i) => {
    if(e.id == id) {
      arr[i] = data;
      flag = true;
    }
  });
  this.saveLocalDataArray(key,arr);
  return flag;
};