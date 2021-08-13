var p, e, b, s, PLAY, END, gamestate, path, shuriken, enemy, person, score
gamestate = 1
score = 0
function preload(){
    p = loadImage('player_p_19.png')
    e = loadImage('enemy_p_19.png')
    b = loadImage('background_p_19.png')
    s = loadAnimation('s_1.png','s_2.png')
}

function setup() {
    createCanvas(600,400)
    path = createSprite(300,300)
    path.addImage(b)
    path.velocityX = -4
    path.x = path.width/2
    path.scale = 0.9
    enemy = createSprite(350,200)
    enemy.addImage(e)
    enemy.scale = 0.3
    person = createSprite(100,300,10,10)
    person.addImage(p)
    person.scale = 0.5
    shuriken=createGroup()
    person.setCollider('circle',0,0,25)
    path.setCollider('rectangle',0,0,600,400)
}
function spinning_death() {
    decider = Math.round(random(1,6))
    switch(decider){
        case 1: s_y = 100; break;
        case 2: s_y = 150; break;
        case 3: s_y = 200; break;
        case 4: s_y = 250; break;
        case 5: s_y = 300; break;
        case 6: s_y = 350; break;
    }
    if (frameCount%60 == 0){
        var spinny_things = createSprite(500,s_y,50,50)
        spinny_things.velocityX = -(3*frameCount/60)
        spinny_things.addAnimation('a_str',s)
        spinny_things.scale = 0.3
        spinny_things.setCollider('circle',0,0,70)
        shuriken.add(spinny_things)
    }
}
function draw() {
    background('white')
    text('SCORE: '+score,300,100)
    if (path.x <300){
        path.x = 600
    }
    if (gamestate == 1){
        spinning_death()
        score=score+Math.round(getFrameRate()/60)
        path.velocityX=-(4*frameCount/500)
        if (keyDown("UP")&&person.y <400){
            person.y -= 5
        }
        if (keyDown("DOWN")&&person.y>0){
            person.y += 5
        }
        if (person.isTouching(shuriken)){
            gamestate = 0
        }
    }
    else if (gamestate==0){
        person.velocityY=0
        path.velocityX=0
        shuriken.setVelocityXEach(0)
    }
    drawSprites()
}