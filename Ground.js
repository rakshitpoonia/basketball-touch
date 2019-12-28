class Ground{
    constructor(x,y){
       var options={
           isStatic:true
       }
        this.width=displayWidth*2;
        this.height=30;
        this.ground=Bodies.rectangle(x,y,this.width,this.height,options);
       World.add(world,this.ground);
    }
    display(){
        rectMode(CENTER);
        rect(this.ground.position.x,this.ground.position.y,this.width,this.height);
    }
}