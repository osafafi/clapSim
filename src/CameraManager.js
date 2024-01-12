"use strict";
//CameraManager.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraManager = void 0;
const THREE = __importStar(require("three"));
const camera_controls_1 = __importDefault(require("camera-controls"));
camera_controls_1.default.install({ THREE: THREE });
class CameraManager extends THREE.Object3D {
    constructor(director) {
        super();
        this.director = director;
        // For dev & debug
        this.navCam = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.navCam.position.set(0, 50, 0);
        this.navCamCtrl = new camera_controls_1.default(this.navCam, document.body);
        // Cinematic Cam to use for rendering
        this.cineCam = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cineCam.position.set(60, 50, 32);
        this.activeCam = this.navCam;
        this.init();
    }
    init() {
        this.navCamCtrl.enabled = true;
        this.navCamCtrl.dollyToCursor = false;
        this.navCamCtrl.smoothTime = 0.5;
        this.navCamCtrl.verticalDragToForward = true;
        this.navCamCtrl.maxPolarAngle = Math.PI / 2;
        this.navCamCtrl.setPosition(-12, 2, -25, false);
        this.navCamCtrl.setTarget(0, 0, -1);
        this.navCamCtrl.mouseButtons.left = camera_controls_1.default.ACTION.ROTATE;
        this.navCamCtrl.mouseButtons.middle = camera_controls_1.default.ACTION.TRUCK;
        this.navCamCtrl.mouseButtons.right = camera_controls_1.default.ACTION.TRUCK;
        window.addEventListener("mousedown", (event) => {
            if (event.button === THREE.MOUSE.MIDDLE) {
                this.navCamCtrl.verticalDragToForward = false;
            }
        });
        // When middle mouse button is released, reset the flag for screen space panning
        window.addEventListener("mouseup", (event) => {
            if (event.button === THREE.MOUSE.MIDDLE) {
                this.navCamCtrl.verticalDragToForward = true;
            }
        });
    }
    update(renderingTimeStep) {
        this.navCamCtrl.update(renderingTimeStep);
    }
    handleWindowResize() {
        this.navCam.aspect = window.innerWidth / window.innerHeight;
        this.navCam.updateProjectionMatrix();
        this.cineCam.aspect = window.innerWidth / window.innerHeight;
        this.cineCam.updateProjectionMatrix();
    }
}
exports.CameraManager = CameraManager;
