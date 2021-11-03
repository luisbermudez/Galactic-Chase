const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let requestID;

let overAndReady = false;

// Client window size
let windowWidth = document.documentElement.clientWidth;
let windowHeight = document.documentElement.clientHeight;

// Enemy different level values
let enemySpeedMax;
let enemySpeedMin;
let enemyDirectionChangeSpeed;
let enemyDiameterGrowth;

// Sprite different level values
let spriteSpeed;
let spritePower;

// win or lose
let winDiameterParameter;
let lostDiameterParameter;