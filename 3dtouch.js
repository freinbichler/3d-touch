var element = document.getElementById('forceMe');
var forceValueOutput = document.getElementById('forceValue');
var background = document.getElementById('background');
var touch = null;

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
  setTimeout(renderElement.bind(null, 0), 10);
  touch = null;
}

// use timeout-based method only on devices not supporting ontouchforcechange
function checkForce(e) {
  if('ontouchforcechange' in document === false) {
    touch = e.touches[0];
    setTimeout(refreshForceValue.bind(touch), 10);
  }
}

// the maximum force value of a touch event is 1
function onTouchForceChange(e) {
  renderElement(e.changedTouches[0].force);
}

// the maximum force value of a click event is 3
function onClickForceChange(e) {
  renderElement(e.webkitForce / 3);
}

// iOS versions lower than iOS 10 do not support the touchforcechange event, so refresh manually
function refreshForceValue() {
  var touchEvent = this;
  var forceValue = 0;
  if(touchEvent) {
    forceValue = touchEvent.force || 0;
    setTimeout(refreshForceValue.bind(touch), 10);
  }else{
    forceValue = 0;
  }

  renderElement(forceValue);
}

// update the element according to the force value (between 0 and 1)
function renderElement(forceValue) {
  window.requestAnimationFrame(function() {
    element.style.webkitTransform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue * 1.5) + ')';
    background.style.webkitFilter = 'blur(' + forceValue * 30 + 'px)';
    forceValueOutput.innerHTML = 'Force: ' + forceValue.toFixed(4);
  });
}

// add event listeners
function addForceTouchToElement(elem) {
  elem.addEventListener('touchstart', onTouchStart, false);
  elem.addEventListener('touchmove', onTouchMove, false);
  elem.addEventListener('touchend', onTouchEnd, false);
  elem.addEventListener('webkitmouseforcechanged', onClickForceChange, false);
  elem.addEventListener('touchforcechange', onTouchForceChange, false);
}

addForceTouchToElement(element);
