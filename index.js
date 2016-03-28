window.onload = function(){
  var box = document.getElementById("containerOne");
  var boxTwo = document.getElementById("containerTwo");
  var handPositionIndicator = document.getElementById('indicator');
  var boxLeft, pixelsLeft, boxTop, pixelsTop;

  Leap.loop(function(frame){
    if(frame.hands.length > 0){
      var hand = frame.hands[0];
      handPositionIndicator.setTransform(hand.screenPosition(), hand.roll);

      boxLeft = box.style.left.toString();
      pixelsLeft = boxLeft.substring(0, boxLeft.length - 2);
      boxTop = box.style.top.toString();
      pixelsTop = boxTop.substring(0, boxTop.length - 2);

      // if(handPositionIndicator.style.left > pixelsLeft && handPositionIndicator.style.left < (pixelsLeft + 200)){
        // if(handPositionIndicator.style.top > pixelsTop && handPositionIndicator.style.top < (pixelsTop + 200)){
          if(hand.grabStrength === 1){
            box.setTransform(hand.screenPosition(), hand.roll);
          }
        // }
      // }
      if(frame.gestures.length > 0){
        frame.gestures.forEach(function(gesture){
          if(gesture.type === "keyTap"){
            var hex = Math.floor(Math.random() * 0xFFFFFF);
            boxTwo.style.backgroundColor = "#" + ("000000" + hex.toString(16)).substr(-6);
          } else if(gesture.type === "screenTap"){
            var hex = Math.floor(Math.random() * 0xFFFFFF);
            boxTwo.style.backgroundColor = "#" + ("000000" + hex.toString(16)).substr(-6);
          }
        })
      }
    }
  }).use('screenPosition', {scale: 0.25});

  box.setTransform = function(position){
    box.style.left = position[0] - box.style.width  / 2 + 'px';
    box.style.top  = position[1] - box.style.height / 2 + 'px';
  }

  handPositionIndicator.setTransform = function(position){
    handPositionIndicator.style.left = position[0] - handPositionIndicator.style.width / 2 + 'px';
    handPositionIndicator.style.top = position[1] - handPositionIndicator.style.height / 2 + 'px';
  }
}
