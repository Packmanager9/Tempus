
window.addEventListener('DOMContentLoaded', (event) =>{


    let bred = 0

    let babies = []
    let cloneint = 0

    let dispocts = []
    let dispocts2 = []
    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#FFFFFF"

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas by the ratio given






 let flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz

let seeker = 0
 
 window.addEventListener('mousedown', e => {


    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip

      for(let g = seeker; g<seeker+1;g++){
          if(intersects(octopi[g].body, tip)){
            if(cloneint == 1){
                // if(keysPressed[' ']){
                    cloneint= 0
                  octopi[g].clone2()
              }else{
                  cloneint = 1

              octopi[g].clone()
              }
          }
      }


      // example usage: if(squarecircle(squareOnScreen, tip)){ do stuff }

   window.addEventListener('mousemove', continued_stimuli);
 });



 window.addEventListener('mouseup', e => {
 window.removeEventListener("mousemove", continued_stimuli);
 })

function continued_stimuli(e) {
flex = tutorial_canvas.getBoundingClientRect();
xs = e.clientX - flex.left;
ys = e.clientY - flex.top;
  tip.x = xs
  tip.y = ys

  tip.body = tip


  }







    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.xfric = 0
            this.yfric = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.xfric = 1
            this.yfric = 1
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
 
            this.xmom*= this.xfric    //.992
            this.ymom*=  this.yfric   //.992  //friction adjust this to change the slowing of a circle

            this.x += this.xmom
            this.y += this.ymom

            // if(this.x+this.radius > tutorial_canvas.width){

            //     if(this.xmom > 0){
            //     this.xmom *= -1
            //     }

            // }
            // if(this.y+this.radius > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom *= -1
            //     }

            // }
            // if(this.x-this.radius < 0){
            //     if(this.xmom < 0){
            //         this.xmom *= -1
            //     }

            // }
            // if(this.y-this.radius < 0){

            //     if(this.ymom < 0){
            //         this.ymom *= -1
            //     }
        
            // }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }


    class Octopus{
        constructor(x,y){
            this.r = Math.floor(Math.random()*255)
            this.g = Math.floor(Math.random()*255)
            this.b = Math.floor(Math.random()*255)
        
            this.speed = .75+(Math.random()*2.5)
            this.unspeed = .75+(Math.random()*2.5)
            this.tickline = Math.floor(Math.random()*4)
            this.twofer = Math.floor(Math.random()*2)
            this.third = Math.floor(Math.random()*2)
            this.enbiggen = Math.floor(Math.random()*3)
            this.secondboth = Math.floor(Math.random()*20)
            this.both = Math.floor(Math.random()*20)
            this.suppcolor =  `rgb(${this.g},${this.b},${this.r})`
            this.body = new Circle(x,y,(Math.random()*9)+5, `rgb(${this.r},${this.g},${this.b})`)
            this.minsize = (Math.random()*1.5)+.49
            this.dialate = (Math.random()*0.07)+ .96
            this.wiggle = Math.random()*Math.PI //2
            this.whathuh = Math.random()*5
            this.thickness =  (Math.random()*1.5)+.35 //.49
            this.wave = Math.random()*Math.PI*2
            if(this.dialate >= .995){
                this.dialate = .995
            }
            this.arms = Math.floor(Math.random()*12)+1
            if(Math.random()<.3){
                this.arms += Math.random()
            }
            this.beads = []
            this.spin = (Math.random() *0.20) /this.arms
            if(Math.random()<.5){
                this.spin*=-1
            }
            this.start = 0
            this.end = 0
            this.ratio = Math.floor(Math.random()*2)+.9

            this.body.xfric = (Math.random()*0.11)+ .93
            this.body.yfric = (Math.random()*0.11)+ .93

            if(this.body.yfric > .993){
                this.body.yfric = .993
            }
            if(this.body.xfric > .993){
                this.body.xfric = .993
            }
            if(Math.random() < .75){
                this.body.xfric = this.body.yfric
            }
        }








        draw(){
            if(this.both == 3){

                this.cryptlive()

            }else if(this.both == 1){
                this.relive()
            }else if(this.both == 4){
                this.ylive()
            }else if(this.both==5){
                this.xlive()

            }else if(this.both==6){
                this.ezlive()

            }else if(this.both==7){
                this.exlive()

            }else if(this.both==8){
                this.eylive()

            }else if(this.both==9){
                this.cryptzlive()

            }else if(this.both==10){
                this.cryptxlive()

            }else if(this.both==11){
                this.cryptylive()

            }else if(this.both==12){
                this.ecryptzlive()

            }else if(this.both==13){
                this.ecryptxlive()

            }else if(this.both==14){
                this.ecryptylive()

            }else if(this.both==15){
                this.clive()

            }else if(this.both==16){
                this.clivex()

            }else if(this.both==17){
                this.clivey()

            }else if(this.both==18){
                this.livex()

            }else if(this.both==19){
                this.livey()

            }else{
                this.live()
            }
            if(this.twofer == 1){

            if(this.secondboth == 3){

                this.cryptlive()

            }else if(this.secondboth == 4){
                this.ylive()
            }else if(this.secondboth == 1){
                this.relive()
            }else if(this.secondboth==5){
                this.xlive()

            }else if(this.secondboth==6){
                this.ezlive()

            }else if(this.secondboth==7){
                this.exlive()

            }else if(this.secondboth==8){
                this.eylive()

            }else if(this.secondboth==9){
                this.cryptzlive()

            }else if(this.secondboth==10){
                this.cryptxlive()

            }else if(this.secondboth==11){
                this.cryptylive()

            }else if(this.secondboth==12){
                this.ecryptzlive()

            }else if(this.secondboth==13){
                this.ecryptxlive()

            }else if(this.secondboth==14){
                this.ecryptylive()

            }else if(this.secondboth==15){
                this.clive()

            }else if(this.secondboth==16){
                this.clivex()

            }else if(this.secondboth==17){
                this.clivey()

            }else if(this.secondboth==18){
                this.livex()

            }else if(this.secondboth==19){
                this.livey()

            }else{
                this.live()
            }
            }
            // this.live()
            // this.clive()
            this.body.draw()
            for(let b = 0; b < this.beads.length; b++){
                this.beads[b].radius *= this.dialate

                if(this.enbiggen ==1){
                    for(let d = 0; d < this.beads.length; d++){
                        this.beads[d].xfric = 1
                        this.beads[d].yfric = 1
                        if(intersects(this.body, this.beads[d])){
                            this.beads[d].move()
                        }
                    }
                }
                if(this.enbiggen ==2){
                    for(let d = 0; d < this.beads.length; d++){
                        this.beads[d].xfric = 1
                        this.beads[d].yfric = 1
                        if(intersectshuge(this.body, this.beads[d])){
                            this.beads[d].move()
                        }
                    }
                }

                this.beads[b].xfric = this.body.xfric
                this.beads[b].yfric = this.body.yfric
                this.beads[b].move()

                this.beads[b].radius *= this.dialate

                if(b < this.beads.length-(this.arms*2)){

                if(typeof this.beads[b+Math.floor(this.arms)]!=="undefined"){

                    if(this.twofer == 1){

                        if(typeof this.beads[b+Math.floor(this.arms)*2]!=="undefined"){

                            // if(this.third == 1){

                                let beam = new Line(this.beads[b].x, this.beads[b].y, this.beads[b+Math.floor(this.arms)*2].x, this.beads[b+Math.floor(this.arms)*2].y, this.beads[b].color, this.beads[b].radius/this.thickness)
                                beam.draw()
                        //     }else{

                        // let beam = new Line(this.beads[b].x, this.beads[b].y, this.beads[b+Math.floor(this.arms)].x, this.beads[b+Math.floor(this.arms)].y, this.beads[b].color, this.beads[b].radius*2)
                        // beam.draw()
                        //     }
    

                        }

                    }else{

                        let beam = new Line(this.beads[b].x, this.beads[b].y, this.beads[b+Math.floor(this.arms)].x, this.beads[b+Math.floor(this.arms)].y, this.beads[b].color, this.beads[b].radius/this.thickness)
                        beam.draw()
                    }
                }


                }

                // this.beads[b].draw()
            }
            for(let b = 0; b < this.beads.length; b++){
                if(this.beads[b].radius < this.minsize){

                    this.beads.splice(b,Math.ceil(this.arms))
                    if(this.twofer == 1){
                        if(this.tickline !== 0){

                            this.beads.splice(b,Math.ceil(this.arms))
                        }
                    }
                }
            }
        }
        live(){
                this.start += this.spin
                let rotx = this.start
                let roty = this.start
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        livex(){
                
                this.start += this.spin
                let rotx = this.wave
                let roty = this.start
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        livey(){
                
                this.start += this.spin
                let rotx = this.start
                let roty = this.wave
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        clive(){
                
                this.start += this.spin
                let rotx = this.start
                let roty = this.start
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.suppcolor, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        clivex(){
                
                this.start += this.spin
                let rotx = this.wave
                let roty = this.start
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.suppcolor, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        clivey(){
                
                this.start += this.spin
                let rotx = this.start
                let roty = this.wave
                for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.suppcolor, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        xlive(){
                
                this.start += this.spin
                let rotx = this.start
                let roty = this.start
               for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 4*Math.PI/this.arms
                }
        }
        ylive(){
                 
                 this.start += this.spin
                 let rotx = this.start
                 let roty = this.start
                for(let g = 0; g < Math.floor(this.arms); g++){
                     let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                     this.beads.push(dot1)
                     rotx += 4*Math.PI/this.arms
                     roty += 2*Math.PI/this.arms
                 }
         }
         zlive(){
                  
                  this.start += this.spin
                  let rotx = this.start
                  let roty = this.start
                 for(let g = 0; g < Math.floor(this.arms); g++){
                      let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                      this.beads.push(dot1)
                      rotx += this.whathuh*Math.PI/this.arms
                      roty += 2*Math.PI/this.arms
                  }
          }
        exlive(){
                
                this.end -= this.spin
                let rotx = this.end
                let roty = this.end
               for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 4*Math.PI/this.arms
                }
        }
        eylive(){
                 
                 this.end -= this.spin
                 let rotx = this.end
                 let roty = this.end
                for(let g = 0; g < Math.floor(this.arms); g++){
                     let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                     this.beads.push(dot1)
                     rotx += 4*Math.PI/this.arms
                     roty += 2*Math.PI/this.arms
                 }
         }
         ezlive(){
                  
                  this.end -= this.spin
                  let rotx = this.end
                  let roty = this.end
                 for(let g = 0; g < Math.floor(this.arms); g++){
                      let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.speed, Math.sin(roty)/this.speed )
                      this.beads.push(dot1)
                      rotx += this.whathuh*Math.PI/this.arms
                      roty += 2*Math.PI/this.arms
                  }
          }
          cryptzlive(){
                   
                   this.end -= this.spin
                   let rotx = this.end
                   let roty = this.end
                  for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                       this.beads.push(dot1)
                       rotx += 3*Math.PI/this.arms
                       roty += 2*Math.PI/this.arms
                   }
           }
          cryptylive(){
                   
                   this.end -= this.spin
                   let rotx = this.end
                   let roty = this.end
                  for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                       this.beads.push(dot1)
                       rotx += this.whathuh*Math.PI/this.arms
                       roty += this.whathuh*Math.PI/this.arms
                   }
           }
           cryptxlive(){
                    
                    this.end -= this.spin
                    let rotx = this.end
                    let roty = this.end
                   for(let g = 0; g < Math.floor(this.arms); g++){
                     let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                        this.beads.push(dot1)
                        rotx += 4*Math.PI/this.arms
                        roty += 2*Math.PI/this.arms
                    }
            }
           ecryptzlive(){
                     
                     this.end -= this.spin
                     let rotx = this.end
                     let roty = this.end
                    for(let g = 0; g < Math.floor(this.arms); g++){
                      let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                         this.beads.push(dot1)
                         rotx += 2*Math.PI/this.arms
                         roty += 4*Math.PI/this.arms
                     }
             }
          ecryptezlive(){
                   
                   this.start += this.spin
                   let rotx = this.start
                   let roty = this.start
                  for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                       this.beads.push(dot1)
                       rotx += this.whathuh*Math.PI/this.arms
                       roty += 2*Math.PI/this.arms
                   }
           }
           ecryptylive(){
                    
                    this.start += this.spin
                    let rotx = this.start
                    let roty = this.start
                   for(let g = 0; g < Math.floor(this.arms); g++){
                     let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                        this.beads.push(dot1)
                        rotx += 4*Math.PI/this.arms
                        roty += 2*Math.PI/this.arms
                    }
            }
            ecryptxlive(){
                     
                     this.start += this.spin
                     let rotx = this.start
                     let roty = this.start
                    for(let g = 0; g < Math.floor(this.arms); g++){
                      let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                         this.beads.push(dot1)
                         rotx += 2*Math.PI/this.arms
                         roty += 4*Math.PI/this.arms
                     }
             }
        cryptlive(){
                
                this.start += this.spin
                let rotx = this.start
                let roty = this.start
               for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx+(this.start%this.wiggle))/this.speed, Math.sin(roty+(this.start%this.wiggle))/this.speed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        relive(){
                
                this.end -= this.spin
                let rotx = this.end
                let roty = this.end
               for(let g = 0; g < Math.floor(this.arms); g++){
                    let dot1 = new Circle(this.body.x, this.body.y, this.body.radius/this.ratio, this.body.color, Math.cos(rotx)/this.unspeed, Math.sin(roty)/this.unspeed )
                    this.beads.push(dot1)
                    rotx += 2*Math.PI/this.arms
                    roty += 2*Math.PI/this.arms
                }
        }
        clone(){
            let dispoct =new Octopus(100, 100)

            // dispoct.body.x = 100
            // dispoct.body.y = 100
            

            dispoct.r = this.r
            dispoct.g = this.g
            dispoct.b = this.b
            dispoct.speed = this.speed
            dispoct.unspeed = this.unspeed
            dispoct.both = this.both
            dispoct.body.radius = this.body.radius
            dispoct.body.color = this.body.color
            dispoct.body.xfric = this.body.xfric
            dispoct.body.yfric = this.body.yfric
            dispoct.suppcolor = this.suppcolor
            dispoct.minsize =this.minsize
            dispoct.dialate =this.dialate
            dispoct.arms = this.arms
            dispoct.beads = []
            dispoct.spin = this.spin
            dispoct.start = this.start
            dispoct.end = this.end
            dispoct.ratio = this.ratio
            dispoct.twofer = this.twofer
            dispoct.third = this.third
            dispoct.secondboth = this.secondboth
            dispoct.wiggle = this.wiggle
            dispoct.whathuh = this.whathuh
            dispoct.thickness = this.thickness
            dispoct.wave = this.wave
            dispoct.tickline = this.tickline
            dispoct.enbiggen = this.enbiggen

            dispocts = [dispoct]

        }

        clone2(){
        
            let dispoct = new Octopus(1000, 100)


            dispoct.r = this.r
            dispoct.g = this.g
            dispoct.b = this.b
            dispoct.speed = this.speed
            dispoct.unspeed = this.unspeed
            dispoct.both = this.both
            dispoct.body.radius = this.body.radius
            dispoct.body.xfric = this.body.xfric
            dispoct.body.yfric = this.body.yfric
            dispoct.body.color = this.body.color
            dispoct.suppcolor = this.suppcolor
            dispoct.minsize =this.minsize
            dispoct.dialate =this.dialate
            dispoct.arms = this.arms
            dispoct.beads = []
            dispoct.spin = this.spin
            dispoct.start = this.start
            dispoct.end = this.end
            dispoct.ratio = this.ratio
            dispoct.twofer = this.twofer
            dispoct.third = this.third
            dispoct.secondboth = this.secondboth
            dispoct.wiggle = this.wiggle
            dispoct.whathuh = this.whathuh
            dispoct.thickness = this.thickness
            dispoct.wave = this.wave
            dispoct.tickline = this.tickline
            dispoct.enbiggen = this.enbiggen


            dispocts2 = [dispoct]

        }
        breed(mate){
            bred = 1
            babies = []

            let cf = 300
            for(let t = 0; t< 1; t++){

                let dispoct = new Octopus(550, 100)

                cf+=200

                if(Math.random() < .5){
                    dispoct.r =  mutate(this.r)
                }else{
                    dispoct.r =  mutate(mate.r)
                }

                if(Math.random() < .5){
                    dispoct.g =  mutate(mate.g)
                }else{
                    dispoct.g =  mutate(this.g)
                }

                if(Math.random() < .5){
                    dispoct.b =  mutate(this.b)
                }else{
                    dispoct.b =  mutate(mate.b)
                }

                if(Math.random() < .5){
                    dispoct.tickline = this.tickline
                }else{
                    dispoct.tickline =  mate.tickline
                }

                if(Math.random() < .5){
                    dispoct.speed = this.speed
                }else{
                dispoct.speed = mate.speed
                }

                if(Math.random() < .5){
                    dispoct.wave = this.wave
                }else{
                dispoct.wave = mate.wave
                }

                if(Math.random() < .5){
                    dispoct.enbiggen = this.enbiggen
                }else{
                dispoct.enbiggen = mate.enbiggen
                }

                if(Math.random() < .5){
                    dispoct.unspeed = mate.unspeed
                }else{
                dispoct.unspeed = this.unspeed
                }

                if(Math.random() < .5){
                    dispoct.body.xfric = mate.body.xfric
                }else{
                dispoct.body.xfric = this.body.xfric
                }
                if(Math.random() < .5){
                    dispoct.body.yfric = mate.body.yfric
                }else{
                dispoct.body.yfric = this.body.yfric
                }
                if(Math.random() < .5){
                    dispoct.both = this.both
                }else{
                    dispoct.both = mate.both
                }
                if(Math.random() < .5){
                    dispoct.thickness = this.thickness
                }else{
                    dispoct.thickness = mate.thickness
                }
                if(Math.random() < .5){
                    dispoct.secondboth = this.secondboth
                }else{
                    dispoct.secondboth = mate.secondboth
                }
                if(Math.random() < .5){
                    dispoct.twofer = this.twofer
                }else{
                    dispoct.twofer = mate.twofer
                }
                if(Math.random() < .5){
                    dispoct.third = this.third
                }else{
                    dispoct.third = mate.third
                }

                if(Math.random() < .5){
                    dispoct.wiggle = this.wiggle
                }else{
                    dispoct.wiggle = mate.wiggle
                }

                if(Math.random() < .5){
                         dispoct.body.radius = mate.body.radius
                }else{
                         dispoct.body.radius = this.body.radius
            }

            dispoct.body.color = `rgb(${dispoct.r},${dispoct.g},${dispoct.b})`
            dispoct.supp = `rgb(${dispoct.g},${dispoct.b},${dispoct.r})`
                dispoct.beads = []
                dispoct.start = 0
                dispoct.end = 0

                if(Math.random() < .5){
                    dispoct.minsize =mate.minsize
                }else{
                     dispoct.minsize =this.minsize
                }

                if(Math.random() < .5){

                    dispoct.dialate =this.dialate
                }else{
                    dispoct.dialate =mate.dialate
                    
                }
                if(Math.random() < .5){

                    dispoct.arms = mate.arms
                }else{
                    
                dispoct.arms = this.arms
                }
                if(Math.random() < .5){

                    dispoct.spin = this.spin
                }else{
                    
                dispoct.spin = mate.spin
                }
                if(Math.random() < .5){

                    dispoct.ratio = mate.ratio
                }else{
                    
                dispoct.ratio = this.ratio
                }
                


    
                dispocts2 = []
                dispocts = []
            babies.push(dispoct)
            }

            setTimeout(function(){ 
                octopi = [...octopi, ...babies]
                babies = []
                dispocts2 = []
                dispocts = []
                bred = 0

                // // dispocts[0].breed(dispocts2[0])
                // let mate1 = new Octopus(100,100)
                // let mate2 = new Octopus(100,100)
                // mate1.breed(mate2)
                // dispocts[0].breed(dispocts2[0])
            }, 3000);
        
    }

    }


    // can be drawn, can have movement with minor changes
    class Triangle{
        constructor(x,y, color, length=40){
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length
        }
        draw(){

            tutorial_canvas_context.strokeStyle = this.color  //sets outline color

            tutorial_canvas_context.lineWidth = 0 // sets outline width
    
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x+this.length, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x,this.y-this.length*1.41); 
            
            tutorial_canvas_context.lineTo(this.x-this.length, this.y+this.length/2); 
    
            tutorial_canvas_context.lineTo(this.x,this.y+this.length/2); 
    
            tutorial_canvas_context.stroke();  
            tutorial_canvas_context.fillStyle = this.color  // fills the shape
            tutorial_canvas_context.fill()
    
    
        }
    
    }

    // takes two pairs of coordinates, draws a line of the given color, and width.
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

        
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }



    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects

    let oddarray = []
    let beam = new Line(350, 250, 400, 450, "red", 3)
    let triangle = new Triangle( 500, 500, "#FFFF00", 60 )

    oddarray.push(beam)
    oddarray.push(triangle)

    let xu = 100
    let yu = 100
    let octopi = [] 
    let otto 
    for(let t=0;t<10000; t++){

        otto = new Octopus(xu,yu)
        xu+=100
        if(xu>= 1200){
            yu+=120
            xu = 100

        }
octopi.push(otto)
    }


    clickslower = 0
// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image
     
        if(seeker <0){
            seeker = 0
        }
        if(seeker >= octopi.length-1){
            seeker = octopi.length-1
        }
        if(bred == 0){


            tutorial_canvas_context.fillStyle = "BLACK";
            tutorial_canvas_context.font = `${50}px Arial`
            tutorial_canvas_context.fillText(`<A                     D>`, 400, 650);
            tutorial_canvas_context.fillText(`F = Breed`,  500, 650);
            tutorial_canvas_context.fillText(`Click to select`,  470, 580);




            for(let p=seeker;p<seeker+1; p++){
                octopi[p].body.x = 600
                octopi[p].body.y = 300
                octopi[p].draw()
                // octopi[p+1].body.x = 600
                // octopi[p+1].body.y = 300
                // octopi[p+1].draw()
                // octopi[p+2].body.x = 900
                // octopi[p+2].body.y = 300
                // octopi[p+2].draw()
            }
            // for(let p=0;p<octopi.length; p++){
            //     octopi[p].draw()
            // }
    }


        for(let p=0;p<dispocts.length; p++){
            dispocts[p].draw()
        }
        for(let p=0;p<dispocts2.length; p++){
            dispocts2[p].draw()
        }
        for(let p=0;p<babies.length; p++){
            babies[p].draw()
        }

        

        clickslower++
        if(clickslower%40 == 0){

            players(circ)
        }
    }, 5) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls 
    // this is a player controller function, but the logic used here can be made to do anything on keystrokes
    function players(racer){
        if (keysPressed['w']) {

        }
        if (keysPressed['a']) {
            seeker--
            octopi[seeker].beads = []
            octopi[seeker+1].beads = []
            octopi[seeker+2].beads = []
        }
        if (keysPressed['s']) {
            racer.y += .7
        }
        if (keysPressed['d']) {
            seeker++
            octopi[seeker].beads = []
            octopi[seeker+1].beads = []
            octopi[seeker+2].beads = []
        }
        if (keysPressed['f']) {
            if(typeof dispocts2[0] !== "undefined"){

                if(typeof dispocts[0] !== "undefined"){

                
                    if(bred == 0){

                        dispocts[0].breed(dispocts2[0])
                    }
                }

            }
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the center of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}
function intersectshuge(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius * 3;
}

// random color that will be visible on  black background
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching change the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}


function mutate(int){

   if(Math.random()<.5){
      int+=5
   }else{
       int-=5
   }
   if(int <0){
       int = 0
   }

   if(int>255){
       int = 255
   }
    return int 
}



})