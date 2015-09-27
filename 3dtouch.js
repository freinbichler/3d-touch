var element = document.getElementById('forceMe');
var message = document.getElementById('message');
var touch = null;

addForceTouchToElement(element);

function onTouchStart(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchMove(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  touch = null;
}

function checkForce(e) {
  touch = e.touches[0];
  setTimeout(refreshForceValue.bind(touch), 10);
}

function refreshForceValue() {
  var touchEvent = this;
  var forceValue = 0;
  if(touchEvent) {
    forceValue = touchEvent.force || 0;
    setTimeout(refreshForceValue.bind(touch), 10);
  }else{
    forceValue = 0;
  }
  message.innerHTML = 'Force: ' + forceValue;
  setCircleScale(forceValue);
}

function setCircleScale(forceValue) {
    element.style.webkitTransform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue) + ')';
}

function addForceTouchToElement(elem) {
  elem.addEventListener('touchstart', onTouchStart, false);
  elem.addEventListener('touchmove', onTouchMove, false);
  elem.addEventListener('touchend', onTouchEnd, false);
}