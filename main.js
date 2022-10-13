video="";
status="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(400,250);
    canvas.center();
}
function draw(){
    image(video,0,0,400,250);

    if(status!=""){
        objectDetector.detect(video, gotResult);

        for(var xyz=0; xyz<objects.length; xyz++){
            document.getElementById("status").innerHTML="Objects Detected!";
            document.getElementById("number_of_objects").innerHTML="Number of Objects: " + objects.length;
            fill("aliceblue");
            percent=Math.floor(objects[xyz].confidence*100);
            console.log(percent);
            text(objects[xyz].label + " " + percent + "%", objects[xyz].x+5, objects[xyz].y+10);
            noFill();
            stroke("aliceblue");
            rect(objects[xyz].x, objects[xyz].y, objects[xyz].width, objects[xyz].height);
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects..";
}
function modelLoaded(){
    console.log("model loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}