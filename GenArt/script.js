WIDTH=window.innerWidth
HEIGHT=window.innerHeight
NUM_POINTS=500
RADIUS=Math.min(WIDTH,HEIGHT);

document.body.style.background='black'
canv=document.getElementById('canv')
ctx=canv.getContext('2d')
canv.width=WIDTH
canv.height=HEIGHT
ctx.fillStyle='black'
ctx.fillRect(0,0,WIDTH,HEIGHT)

pts=new Float32Array(NUM_POINTS*2)
function reset(){
        ctx.fillStyle='black'
        ctx.fillRect(0,0,WIDTH,HEIGHT)
        for(i=0;i<NUM_POINTS;i++){
                pts[i*2]=Math.cos(i/NUM_POINTS*2*Math.PI)*RADIUS;
                pts[i*2+1]=Math.sin(i/NUM_POINTS*2*Math.PI)*RADIUS;
        }
        targets=[]
        for(i=0;i<NUM_POINTS;i++){
                targets.push((i+117)%NUM_POINTS)
        }
        for(i=0;i<1000;i++){
                a=Math.floor(Math.random()*NUM_POINTS);
                b=Math.floor(Math.random()*NUM_POINTS);
                const tmp=targets[a]
                targets[a]=targets[b]
                targets[b]=tmp
        }
}
reset()

function updatePoints(){
        for(i=0;i<NUM_POINTS;i++){
                x=pts[2*i]
                y=pts[2*i+1]
                tx=pts[targets[i]*2]
                ty=pts[targets[i]*2+1]
                pts[2*i]+=(tx-x)*0.1
                pts[2*i+1]+=(ty-y)*0.1
        }
}
ct=0
clearOut=false;
function updateScreen(){
        ct+=1
        updatePoints()
        ctx.fillStyle='rgba(0,0,0,0.01)'
        ctx.fillRect(0,0,WIDTH,HEIGHT)
        if(!clearOut){
                ctx.fillStyle='white'
                for(i=0;i<NUM_POINTS;i++){
                        ctx.fillRect(pts[i*2]+WIDTH/2,pts[i*2+1]+HEIGHT/2,1,1);
                }
        }
        requestAnimationFrame(updateScreen)
        if(ct>500){
                clearOut=true
        }
        if(ct>600){
                reset()
                ct=0
                clearOut=false
        }
}
requestAnimationFrame(updateScreen)