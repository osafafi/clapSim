import * as THREE from "three";
import { Director } from "./Director";

const AUDIO_FILES = ["./data/audio/clap1.wav"];

export class AudioManager extends THREE.Object3D {
  director: Director;
  listener: THREE.AudioListener;

  constructor(director: Director) {
    super();
    this.director = director;
    this.listener = new THREE.AudioListener();
    this.init();
  }

  init() {
    this.director.cameraManager.navCam.add(this.listener);
    this.director.cameraManager.cineCam.add(this.listener);
  }

  createClapSound(cps: number) {
    const clapSound = new THREE.PositionalAudio(this.listener);
    const randomIndex =
      Math.floor(Math.random() * (AUDIO_FILES.length - 1)) + 1;
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
