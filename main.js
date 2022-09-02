// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList = []; // 총알들을 저장하는 리스트
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 15;
        this.y = spaceshipY;

        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.jpg";
}

// 방향키를 누르면
let keysDown={};
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true; // 사용자가 클릭한 모든 키보드 값들이 객체에 저장됨
        // console.log("키다운객체에 들어간 값은?", keysDown);
    });
    document.addEventListener("keyup", function(){
        delete keysDown[event.keyCode];
        // console.log("버튼 클릭 후", keysDown);

        if(event.keyCode == 32){ // 스페이스바
            createBullet(); // 총알 생성
        }
    });
}

function createBullet(){
    let b = new Bullet(); // 총알 하나 생성
    b.init();
    // console.log("새로운 총알 리스트", bulletList);
}

function update(){
    if(39 in keysDown){// 오른쪽 버튼이 클릭되었으면
        spaceshipX += 5; // 우주선의 속도
    }
    if(37 in keysDown){// 왼쪽 버튼이 클릭되었으면
        spaceshipX -= 5;
    }

    // 우주선의 좌표값이 무한대로 업데이트가 되는게 아닌 경기장 안에서만 있게 하려면
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64;
    }

    // 총알의 y좌표 업데이트하는 함수 호출
    for(let i = 0; i < bulletList.length; i++){
        bulletList[i].update();
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    for(let i = 0; i < bulletList.length; i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y); 
    }
}

function main(){
    update(); // 좌표값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 우주선의 xy 좌표가 바뀌고 다시 render 그려준다


// 총알만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장을 한다
// 4. 총알들은 x,y좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다