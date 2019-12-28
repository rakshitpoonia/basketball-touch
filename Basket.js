class Basket{
    constructor(x,y,width,height){
        var options={
            isStatic:true
        }
    this.body=Bodies.rectangle(x,y,width,height,options);
    this.width=width;
    this.height=height;
    World.add(world,this.body);
    this.image=loadImage("hoop.png");
    }
    display(){
        imageMode(CENTER);
        image(this.image,displayWidth-900,displayHeight-590,280,300);
        //image for stand
        imageMode(CENTER);
        image(stand,displayWidth-1139,displayHeight-550,600,700);
        }
}