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
exports.Director = void 0;
const THREE = __importStar(require("three"));
const CSS2DRenderer_1 = require("three/examples/jsm/renderers/CSS2DRenderer");
const ObjectManager_1 = require("./ObjectManager");
const CameraManager_1 = require("./CameraManager");
const SimulationManager_1 = require("./SimulationManager");
const UiManager_1 = require("./UiManager");
const LabelManager_1 = require("./LabelManager");
const AudioManager_1 = require("./AudioManager");
class Director extends THREE.Object3D {
    constructor(scene) {
        super();
        this.scene = scene;
        this.renderer = new THREE.WebGLRenderer();
        this.labelRenderer = new CSS2DRenderer_1.CSS2DRenderer();
        this.renderingClock = new THREE.Clock();
        // Managers
        this.cameraManager = new CameraManager_1.CameraManager(this);
        this.audioManager = new AudioManager_1.AudioManager(this);
        this.objectManager = new ObjectManager_1.ObjectManager(this);
        this.simulationManager = new SimulationManager_1.SimulationManager(this);
        this.uiManager = new UiManager_1.UiManager(this);
        this.labelManager = new LabelManager_1.LabelManager(this);
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
exports.Director = Director;
