// 奖项名数组
let prizesArr = ["HUAWEI P60 Art", "HUAWEI Nova 10 Pro 4G", "HUAWEI 畅享 60 Pro", "Matebook E 2023", "MatePad Air", "HUAWEI Watch D", "HUAWEI FreeBuds 5", "720全效空气净化器1i 白色"];
// 奖项图片数组
let arrBigImg = ["./img/1.png", "./img/2.png", "./img/3.png",
  "./img/4.png", "./img/5.png", "./img/6.png",
  "./img/7.png", "./img/8.png", "./img/9-prizes.png"];

// Get All Award Cells
let allPrizesLi = document.querySelectorAll('.prizes-li');
// Get Pictures
let prizesImg = document.querySelectorAll('.pic');

// Initial value of rotation
let count = 0;
let isClick = true;
let index = 3;
// Turn to which position
let prizesPosition = 0;

// Bind an IMG
for (let j = 0;j < prizesImg.length; j++) {
  prizesImg[j].src = arrBigImg[j];
}
// Rotation speed. The larger the value, the slower the speed
let speed = 500;

// rotation function
function roll() {
  // velocity decay
  speed -= 50;
  if (speed <= 10) {
    speed = 10;
  }

  // Remove all active class names for each call
  for (let j = 0; j < allPrizesLi.length; j++) {
    allPrizesLi[j].classList.remove('active');
  }
  prizesPosition++;

  // Calculate the number of turns
  if (prizesPosition >= allPrizesLi.length - 1) {
    prizesPosition = 0;
    count++;
  }

  allPrizesLi[prizesPosition].classList.add('active');
  let initSpeed = 500;
  let timer;
  // Total number of revolutions at least
  let totalCount = 5;

  // Stop when the number of turns and the specified position are met
  if (count >= totalCount && (prizesPosition + 1) === index) {
    clearTimeout(timer);
    isClick = true;
    speed = initSpeed;
    // Wait for 1s to open the pop-up window
    timer = setTimeout(openDialog, 1000);
  } else {
    // Wait for 1s to open the pop-up window
    timer = setTimeout(roll, speed);
    // Last lap deceleration
    if (count >= totalCount - 1 || speed <= 50) {
      speed += 100;
    }
  }
}

// Draw Start Function
function startDraw() {
  // Prevent multiple triggering of the lottery
  if (isClick) {
    count = 0;
    // Randomly generate the winning position
    index = Math.floor(Math.random() * prizesArr.length + 1);
    roll();
    isClick = false;
  }
}

function openDialog() {
  linkObj.messageFromHtml(prizesArr[prizesPosition]);
}