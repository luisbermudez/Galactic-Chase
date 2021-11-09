// Intro canvas
const introCanvas = document.getElementById('introCanvas');
const introCTX = introCanvas.getContext('2d');
introCanvas.width = (document.documentElement.clientWidth - 2)*4;
introCanvas.height = (document.documentElement.clientHeight - 2)*4;
introCanvas.style.width = (document.documentElement.clientWidth - 2) + 'px';
introCanvas.style.height = (document.documentElement.clientHeight - 2) + 'px';

// Main canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// To update
let frames = 0;
let requestID;

// Elements 
let firstSprite;
let firstEnemy;
let poweritem1;
let aStar;

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


// DOM 
const body = document.getElementById('body');
const gameArea = document.getElementById('gameArea');
const introArea = document.getElementById('introArea');
const userInfo = document.getElementById('info');
const level = document.getElementById('level');
const instructs = document.getElementById('instructions');

// introCanvas
let intervalID;
let anAstroN;
let anAstroNX;
let anAstroNY;
