/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
canvas.width = vw;
canvas.height = vh;
var mouse = {};
var colors = ['#205959', '#F2E74B', '#F2B33D', '#F29544', '#8C7161']; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = screen.width;
  canvas.height = screen.height;
  init();
});
var maxRadius = 35; // Objects

function Circle(xCoordinate, yCoordinate, radius) {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomTrueOrFalse = Math.floor(Math.random() * 2);
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.radius = radius;
  this.color = colors[randomNumber];

  if (randomTrueOrFalse == 1) {
    this.xVelocity = -Math.random() * 1;
  } else {
    this.xVelocity = Math.random() * 1;
  }

  if (randomTrueOrFalse == 1) {
    this.yVelocity = -Math.random() * 1;
  } else {
    this.yVelocity = Math.random() * 1;
  } // As distance gets closer to 0, increase radius


  this.update = function () {
    var xDistance = mouse.x - this.xCoordinate;
    var yDistance = mouse.y - this.yCoordinate;
    var originalRadius = radius;
    this.xCoordinate += this.xVelocity;
    this.yCoordinate += this.yVelocity; // Movement Functions

    if (this.xCoordinate + this.radius > canvas.width || this.xCoordinate - this.radius < 0) {
      this.xVelocity = -this.xVelocity;
    }

    if (this.yCoordinate + this.radius > canvas.height || this.yCoordinate - this.radius < 0) {
      this.yVelocity = -this.yVelocity;
    } // Radius Decrease Functions
    // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35


    if (xDistance < 50 && xDistance > -50 && this.radius < maxRadius && yDistance < 50 && yDistance > -50) {
      this.radius += 2;
    } else if (xDistance >= 50 && originalRadius < this.radius || xDistance <= -50 && originalRadius < this.radius || yDistance >= 50 && originalRadius < this.radius || yDistance <= -50 && originalRadius < this.radius) {
      this.radius -= 2;
    }

    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.xCoordinate, this.yCoordinate, Math.abs(this.radius), 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  };
} // Implementation


var circleArray = [];

function init() {
  for (var i = 0; i < 800; i++) {
    var randomXCoordinate = Math.random() * canvas.width;
    var randomYCoordinate = Math.random() * canvas.height;
    var randomRadius = Math.random() * 7;
    circleArray.push(new Circle(randomXCoordinate, randomYCoordinate, randomRadius));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#D9D9D9";
  c.fillRect(0, 0, canvas.width, canvas.height);
  circleArray.forEach(function (object) {
    object.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map