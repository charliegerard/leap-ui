window.onload = function(){
  var menuItems = document.getElementsByClassName('menu-item');
  var handPositionIndicator = document.getElementById('indicator');
  var menuItemSelected, handPositionIndicatorLeft, handPositionpixelsLeft;

  var controller = new Leap.Controller();

  if(!controller.deviceAttached){
    console.log('Leap Motion not connected')
    document.getElementById('status-alert').style.display = 'block';

    document.getElementsByClassName('status-button')[0].onclick = function(){
      document.getElementById('status-alert').style.display = 'none';
    }
  }

  controller.connect();

  Leap.loop(function(frame){
    if(frame.hands.length > 0){
      var hand = frame.hands[0];
      handPositionIndicator.setTransform(hand.screenPosition(), hand.roll);

      handPositionIndicatorLeft = handPositionIndicator.style.left.toString();
      handPositionpixelsLeft = handPositionIndicatorLeft.substring(0, handPositionIndicatorLeft.length - 2);

      for(var i = 0; i < menuItems.length; i++){
        if(handPositionpixelsLeft > (window.innerWidth - menuItems[i].getBoundingClientRect().width)){
          if(hand.grabStrength === 1){
            console.log('here')
            menuItemSelected = menuItems[i];
            menuItemSelected.setTransform(hand.screenPosition(), hand.roll);
          }
        }
      }
    }
  }).use('screenPosition', {scale: 0.25});

  if(menuItemSelected){
    menuItemSelected.setTransform = function(position){
      menuItemSelected.style.left = position[0] - menuItemSelected.style.width  / 2 + 'px';
      menuItemSelected.style.top  = position[1] - menuItemSelected.style.height / 2 + 'px';
    }
  }

  handPositionIndicator.setTransform = function(position){
    handPositionIndicator.style.left = position[0] - handPositionIndicator.style.width / 2 + 'px';
    handPositionIndicator.style.top = position[1] - handPositionIndicator.style.height / 2 + 'px';
  }
}
