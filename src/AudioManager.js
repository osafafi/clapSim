"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
const THREE = __importStar(require("three"));
const AUDIO_FILES = ["./data/audio/clap1.wav"];
class AudioManager extends THREE.Object3D {
    constructor(director) {
        super();
        this.director = director;
        this.listener = new THREE.AudioListener();
        this.init();
    }
    init() {
        this.director.cameraManager.navCam.add(this.listener);
        this.director.cameraManager.cineCam.add(this.listener);
    }
    createClapSound(cps) {
        const clapSound = new THREE.PositionalAudio(this.listener);
        const randomIndex = Math.floor(Math.random() * (AUDIO_FILES.length - 1)) + 1;
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(AUDIO_FILES[0], function (buffer) {
            clapSound.setBuffer(buffer);
            clapSound.setLoop(false);
            clapSound.playbackRate = Math.random() * 2 + 1;
            clapSound.setVolume(Math.random());
        });
        return clapSound;
    }
}
exports.AudioManager = AudioManager;
