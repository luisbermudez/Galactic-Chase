const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let requestID;

// Variables for attack
let overAndReady = false;
let bulletReady = false;

// Enemy different level values
let enemySpeedMax;
let enemySpeedMin;
let enemyDirectionChangeSpeed;
let enemyDiameterGrowth;

// Sprite different level values
let spriteZeroGravity;
let spritePower;
let powerOnTimer;
let powerOn = false;

// Power item level values 
let powerItemSpeedMax;
let powerItemSpeedMin;
// let powerSpanTime = frames % 1000;

// win or lose
let winDiameterParameter;
let lostDiameterParameter;

// Attack items 
let attackItems = [];
let spriteShadowArr = [];
let enemyImpactShadow = [];
let startsArr = [];
let shootABullet = true;
let shadowOn = false;

