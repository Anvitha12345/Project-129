Peter_pan ="";
Harry_potter ="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreleftWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){

    Peter_pan = loadSound("music2.mp3");
    Harry_potter = loadSound("music.mp3");
}

function modelLoaded(){

    console.log("PoseNet is Initialized");
}

function draw(){
    image(video,0,0,600,500);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = Peter_pan.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter.stop();
        
        if(song_name == false){
            Peter_pan.play();
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    
    }

}
function gotPoses(results){

    if(results.length > 0){

        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log( "leftWristX = "+leftWristX+ "leftWristY = "+leftWristY+ " rightWristX = "+rightWristX+"rightWristY = "+rightWristY);

    }
}