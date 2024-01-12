import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { ObjectManager } from "./ObjectManager";
import { CameraManager } from "./CameraManager";
import { SimulationManager } from "./SimulationManager";
import { UiManager } from "./UiManager";
import { LabelManager } from "./LabelManager";
import { AudioManager } from "./AudioManager";

export class Director extends THREE.Object3D {
  scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  renderingClock: THREE.Clock;
  objectManager: ObjectManager;
  cameraManager: CameraManager;
  simulationManager: SimulationManager;
  uiManager: UiManager;
  labelManager: LabelManager;
  audioManager: AudioManager;

  constructor(scene: THREE.Scene) {
    super();
    this.scene = scene;
    this.renderer = new THREE.WebGLRenderer();
    this.labelRenderer = new CSS2DRenderer();
    this.renderingClock = new THREE.Clock();

    // Managers
    this.cameraManager = new CameraManager(this);
    this.audioManager = new AudioManager(this);
    this.objectManager = new ObjectManager(this);
    this.simulationManager = new SimulationManager(this);
    this.uiManager = new UiManager(this);
    this.labelManager = new LabelManager(this);

    this.init();
  }

  init() {
    // Renderers
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0";
    document.body.appendChild(this.labelRenderer.domElement);

    // Resize handling
    window.addEventListener("resize", () => {
      this.cameraManager.handleWindowResize();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.setupLighting();

    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(hemisphereLight);
  }

  render() {
    this.uiManager.stats.update();
    this.renderer.render(this.scene, this.cameraManager.activeCam);
    this.labelRenderer.render(this.scene, this.cameraManager.activeCam);
  }

  animate() {
    const renderingTimeStep = this.renderingClock.getDelta();

    this.cameraManager.update(renderingTimeStep);
    this.simulationManager.simulate(this.renderingClock.elapsedTime);
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }
}
