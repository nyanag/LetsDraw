      let model;
      let strokePath = null;

      let x,y;
      let pen = 'down';

      function setup(){
        createCanvas(windowWidth, windowHeight);
        model = ml5.sketchRNN('pineapple', modelReady);
        x=random(width);
        y=random(height);
        background(0);

      }
      function modelReady(){
          console.log('model ready');
          model.reset();
          model.generate(gotSketch);

      }

      function draw(){
        if(strokePath !== null){
            let newX = x+strokePath.dx*0.5;
            let newY = y+strokePath.dy*0.5;
            if(pen == 'down'){
                stroke(200,random(123),random(223));
                strokeWeight(1);
                line(x,y,newX,newY);
            }
           pen = strokePath.pen;
           strokePath = null;
           x = newX;
           y = newY;

           if(pen !== 'end'){
            model.generate(gotSketch);
           } else{
               console.log('drawing complete');
               model.reset();
               model.generate(gotSketch);
               x = random(width);
               y = random(height);
               stroke(random(200),125,random(53));
           }
           
        }
      }
      function gotSketch(error,s){
        if(error){
            console.error(error);
        }
        else{
            strokePath = s;
            //console.log(strokePath);
        }
      }