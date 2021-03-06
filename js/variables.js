// Intro canvas
const dIntroCanvas = document.getElementById('introCanvas');
const introCTX = dIntroCanvas.getContext('2d');
dIntroCanvas.width = (document.documentElement.clientWidth - 2)*4;
dIntroCanvas.height = (document.documentElement.clientHeight - 5)*4;
dIntroCanvas.style.width = (document.documentElement.clientWidth - 2) + 'px';
dIntroCanvas.style.height = (document.documentElement.clientHeight - 5) + 'px';

// Main canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// To update
let frames;
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
let dUFOPower = false;

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
let powerShadowOn = false;


// DOM 
const body = document.getElementById('body');
const gameArea = document.getElementById('gameArea');
const introArea = document.getElementById('introArea');
const userInfo = document.getElementById('info');
const level = document.getElementById('level');
const instructs = document.getElementById('instructions');

// introCanvas
let intervalID;
let anAstroNX;
let anAstroNY;
let introFrames = 0;

// audio
const shootSound = new Audio();
shootSound.src = './audio/shooting.wav';

const backgroundSound = new Audio();
backgroundSound.src = './audio/backgroundSound.wav'
backgroundSound.loop = true;

const bonusSound = new Audio();
bonusSound.src = './audio/bonus.wav';

const levelSelectSound = new Audio();
levelSelectSound.src = './audio/levelSelect.wav';

const buttonSound = new Audio();
buttonSound.src = './audio/shooting.wav';

const bulletAbd = new Audio();
bulletAbd.src = './audio/bulletAbd.wav';

const aWinSound = new Audio();
aWinSound.src = './audio/aWin.wav';

const ufoPower = new Audio();
ufoPower.src = './audio/UFOpower.wav'