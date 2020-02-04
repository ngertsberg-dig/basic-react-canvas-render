export default class Ship{
    constructor(args){
        console.log('ship constructor')
        this.position = args.position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.inertia = 0.99;
        this.speed = 0.15;
        this.rotation = 0;
    }
    moveLeft(){
        this.velocity.x -= Math.sin(-this.rotation*Math.PI/180) * this.speed;
        this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;
        console.log(Math.cos(-this.rotation*Math.PI/180))
    }
    render(state){
        if(state.keys.left){
            this.moveLeft();
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;

        const context = state.context;
        
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#000000';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, -15);
        context.lineTo(10, 10);
        context.lineTo(5, 7);
        context.lineTo(-5, 7);
        context.lineTo(-10, 10);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
}