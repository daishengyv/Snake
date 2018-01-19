const RetroSnaker = {
    x: 20,
    y: 20,
    direction: 39,
    changeDirAble: true,
    snake: [],
    snakeLen: 3,
    viewMap: [],
    dataMap: [],
    gameTimer: null,
    speed: 200,
    index:-1,
    btn:document.getElementById('btn'),
    score:document.getElementById('score'),
    sBtn:document.getElementById('speed'),
    level:[['1级',300],['2级',200],['3级',100],['4级',50]],
    init(){
      this.createMap();
    },
    createData(){
      let {x, y} = this;
      let map = new Array(y);
      for(let i=0; i<map.length; i++){
        map[i] = new Array(x);
        map[i].fill(false);
      }
      return map;
    },
    createMap(){
      const gameMap = document.querySelector('.game-map');
      let {x, y} = this;
      this.viewMap = this.createData(x, y);
      this.dataMap = this.createData(x, y);
      for(let i=0; i<y; i++){
        const row = document.createElement('div');
        for(let j=0; j<x; j++){
          const col = document.createElement('span');
          this.viewMap[i][j] = row.appendChild(col);
        }
        gameMap.appendChild(row);
      }
    },
    createPoint(startX, startY, endX, endY){
      let {x, y, rp, dataMap} = this;
      let p = [];
      let X = rp([startX, endX]);
      let Y = rp([startY, endY]);
      
      if(dataMap[Y][X]){
        return this.createPoint(startX, startY, endX, endY);
      }
      
      p.push(Y, X);
      return p;
    },
    rp(arr){
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return Math.round(Math.random() * (max - min) + min);
    },
    initSnake(){
      let {snakeLen, x, y, snake, viewMap, dataMap} = this;
      let p = this.createPoint(snakeLen-1, 0, x - snakeLen, y - 1);
      for(let i=0; i<snakeLen; i++){
        let x = p[1] - i;
        let y = p[0];
        snake.push([y, x]);
        viewMap[y][x].className = !i ? 'snake head' : 'snake';
        dataMap[y][x] = 'snake';
      }
    },
    addObject(name){
      let {x, y, viewMap, dataMap} = this;
      let p = this.createPoint(0, 0, x-1, y-1);
      viewMap[p[0]][p[1]].className = name;
      dataMap[p[0]][p[1]] = name;
    },
    walk(){
      let {speed} = this;
    
      clearInterval(this.gameTimer);
      this.gameTimer = setInterval(this._walk.bind(this),speed);
    },
    _walk(){
      let {snake, viewMap, dataMap} = this;
      let headX = snake[0][1];
      let headY = snake[0][0];
     
      viewMap[headY][headX].className = 'snake';
      
      switch (this.direction) {
        case 37:
          headX -= 1;
          break;
        case 38:
          headY -= 1;
          break;
        case 39:
          headX += 1;
          break;
        case 40:
          headY += 1;
          break;
      }

     
    if(headX > 19 || headX < 0 ||  headY>19 || headY< 0){
      clearInterval(this.gameTimer);
      alert('游戏结束');
      return window.location.reload();
}


      if(dataMap[headY][headX] === 'food'){
        this.addObject('food');
      }
      else if(dataMap[headY][headX] === 'snake'){
          clearInterval(this.gameTimer);
          alert('游戏结束')
          return window.location.reload();
      }
      else{
        let lastIndex = snake.length - 1;
        let lastX = snake[lastIndex][1];
        let lastY = snake[lastIndex][0];
        snake.pop();
        viewMap[lastY][lastX].className = '';
        dataMap[lastY][lastX] = false;
      }
      this.score.innerHTML = snake.length - 2;
      
      snake.unshift([headY, headX]);
      if(!viewMap[headY][headX]) return;
      viewMap[headY][headX].className = 'snake head';
      dataMap[headY][headX] = 'snake';
      this.changeDirAble = true;
    },
    changeDir(){
      const fn = this.changeDir.fn = this._changeDir.bind(this);
      window.addEventListener('keydown', fn);
    },
    _changeDir(e){
      if(!this.changeDirAble) return;
      const {keyCode} = e;
      if(keyCode > 36 && keyCode < 41 && Math.abs(this.direction - keyCode) !== 2){
        this.direction = keyCode;
        this.changeDirAble = false;
      }
    }
  };
  
  RetroSnaker.init();
 
  RetroSnaker.btn.onclick = function (){
      if(RetroSnaker.snake.length) return;
      RetroSnaker.sBtn.innerHTML='';
      RetroSnaker.initSnake();
      RetroSnaker.addObject('food');
      RetroSnaker.changeDir();
      RetroSnaker.walk();
      console.log(RetroSnaker.snake);
  }

  RetroSnaker.sBtn.onclick = function (){
    const i =RetroSnaker.index<3?++RetroSnaker.index:RetroSnaker.index -=3 ;

    RetroSnaker.sBtn.innerHTML = `难度：${RetroSnaker.level[i][0]}`
    RetroSnaker.speed =  RetroSnaker.level[i][1];
    console.log(111111111111111,RetroSnaker.speed);
}
  
  
  
  
  