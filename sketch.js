import { onSensorData } from 'https://cdn.jsdelivr.net/npm/imu-tools@0.0.7/index.js'
 
onSensorData(handleSensorData) 

let img
let x = 0
let y = 0 
let sensor = null
let first = false
let mySound;
let button;
// let liquid

export function preload(){
    mySound = loadSound('samplepond.wav');
    // mySound.play();
}

// Code in this function is run once, when the sketch is started.
export function setup() {
    button = createButton('play me!')
    button.position(350,200)
    button.mousePressed(liquid)
    createCanvas(windowWidth , windowHeight)
    img = loadImage('koi2.png') 

    
}
function liquid(){
     mySound.loop();
}

// Code in this function is run once per frame. If it draws the same thing each
// time, the sketch is a static image. If it draws something different on
// different frames, the sketch is an animation.

export function draw() { 
    clear();
    angleMode(DEGREES) 
    let angle = frameCount / 5;

    // strokeWeight (5); 
    // stroke (255, 0, 0)
    // line (510, 0, 510, 500); 


    const context = canvas.getContext('2d')
    context.clearRect(0,0, canvas.width, canvas.height)
    // image(img,x,y)
    if (sensor !== null){
        let a = sensor[0]
        console.info(sensor[2])
        let x = map(sensor[1], -100,0,200,900) 

        push ()
        translate(x,300) 
        rotateAbout(a, img.width/2 , img.height/2 ) 
        image(img,0,0) 
        pop ()
        
        translate(x,1) 
        rotateAbout(a, img.width , img.height/2 ) 
        image(img,0,0) 
    
    }

    
  

    function rotateAbout(angle,x,y){
        translate(x,y);
        rotate(angle);
        translate(-x,-y);
    }
}

function handleSensorData(data){
    if (first === false){
        console.info('sensor data:', data.euler)
    }
    first = true
    sensor = data.euler
}