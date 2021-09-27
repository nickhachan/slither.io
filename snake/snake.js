class snake{
    constructor(canvas,color,option={width,height,sX,sY,dot,snakeColor,maxFood}){
        if(!canvas)throw new Error('you need to add canvas')
        option={width:500,height:500,sX:5000,sY:5000,dot:20,snakeColor:'rgb(255, 0, 0)',maxFood:1500,...option}
        this.height=canvas.height=option.height
        this.width=canvas.width=option.width
        this.snakeColor=option.snakeColor
        this.x=-option.sX/2
        this.y=-option.sY/2
        this.sX=option.sX
        this.sY=option.sY
        this.moveX=this.moveY=0
        this.frame=25
        this.snakeSpeed=5
        this.food=[]
        this.foodSize=25
        this.maxFood=option.maxFood
        this.dot_size=20
        this.space=50
        this.point=0
        this.canvas= canvas
        this.ctx= this.canvas.getContext('2d')
        this.begin=this.ctx.beginPath.bind(this.ctx)
        this.end=this.ctx.closePath.bind(this.ctx)
        this.color=color
        this.eye={r:10,x:12,y:10}
        this.clean=100
        this.dot=[]
        this.maxDot=option.dot
        this.init()
        this.loop()
    }
    init(){
        this.canvas.style.backgroundColor=this.color||'#fff'
        this.ctx.translate(this.width/2,this.height/2)
        this.pos=this.canvas.getBoundingClientRect()
        this.movement()
    }
    loop(){
        this.calc()
        this.draw()
        setTimeout(()=>{this.loop()},this.frame)
    }
    movement(){
        this.canvas.onmousemove=(e)=>{
            let x2=this.width/2-(e.clientX-this.pos.x),
                y2=this.height/2-(e.clientY-this.pos.y)
            this.angle=Math.atan2(y2,-x2)
            this.moveX=Math.cos(this.angle)*this.snakeSpeed
            this.moveY=Math.sin(this.angle)*this.snakeSpeed
        }
    }
    calc(){
        this.x-=this.moveX
        this.y+=this.moveY
        for(var i of this.dot){
            i[0]-=this.moveX
            i[1]+=this.moveY
        }
    }
    draw(){
        this.ctx.clearRect(this.x-this.clean,this.y-this.clean,this.sX+this.clean*2,this.sY+this.clean*2)
        this.drawBackground()
        this.drawFood()
        this.drawSnake()
        this.drawPoint()
    }
    drawBackground(){
        this.begin()
        this.ctx.moveTo(this.x,this.y)
        this.ctx.lineTo(this.x,this.y+this.sY)
        this.ctx.lineTo(this.x+this.sX,this.y+this.sY)
        this.ctx.lineTo(this.x+this.sX,this.y)
        this.ctx.lineTo(this.x,this.y)
        this.ctx.stroke()
        this.end()     
        for(var x=this.x;x<this.x+this.sX;x+=this.space){
            this.begin()
            this.ctx.moveTo(x,this.y)
            this.ctx.lineTo(x,this.y+this.sY)
            this.ctx.stroke()
            this.end()        
        }
        for(var y=this.y;y<this.y+this.sY;y+=this.space){
            this.begin()
            this.ctx.moveTo(this.x,y)
            this.ctx.lineTo(this.x+this.sX,y)
            this.ctx.stroke()
            this.end()
        }   
    }
    drawPoint(){
        this.ctx.font='bold 68px serif'
        this.ctx.textBaseline = 'middle'; 
        this.ctx.textAlign = 'center'; 
        this.ctx.fillText(this.point,0,-170)
    }
    drawFood(){
        while(this.food.length<this.maxFood)this.food.push([Math.random()*this.sX,Math.random()*this.sY,Math.random()*this.foodSize,`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`])
        for(var i2 in this.food){
            let i=this.food[i2]
            if(i[0]+this.x+i[2]>-this.dot_size/2&&i[0]+this.x-i[2]<this.dot_size/2&&i[1]+this.y+i[2]>-this.dot_size/2&&i[1]+this.y-i[2]<this.dot_size/2){
                let score=Math.floor(this.food.splice(i2,1)[0][2])
                this.point+=score
                this.maxDot+=score/10
            }
            this.begin()
            this.ctx.fillStyle=i[3]
            this.ctx.arc(i[0]+this.x,i[1]+this.y,i[2],0,2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
            this.end()
        }
    }
    drawSnake(){
        while(this.dot.length<=this.maxDot){
            this.dot.push([0,0])
        }
        this.dot.shift()
        for(var i of this.dot){
            this.begin()
            this.ctx.fillStyle=this.snakeColor
            this.ctx.arc(i[0],i[1],this.dot_size,0,2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
            this.end()
        }
        this.ctx.rotate(-this.angle)
        this.begin()
        this.ctx.fillStyle='#fff'
        this.ctx.arc(this.eye.x,this.eye.y,this.eye.r,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
        this.end()
        this.begin()
        this.ctx.fillStyle='rgb(0,0,0)'
        this.ctx.arc(this.eye.x+this.eye.r/2,this.eye.y,this.eye.r/2,0,2*Math.PI)
        this.ctx.fill()
        this.end()
        this.begin()
        this.ctx.fillStyle='#fff'
        this.ctx.arc(this.eye.x,-this.eye.y,this.eye.r,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
        this.end()
        this.begin()
        this.ctx.fillStyle='rgb(0,0,0)'
        this.ctx.arc(this.eye.x+this.eye.r/2,-this.eye.y,this.eye.r/2,0,2*Math.PI)
        this.ctx.fill()
        this.end()
        this.ctx.rotate(this.angle)
    }
}
export default snake