"use strict";
//UiManager.ts
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
exports.UiManager = void 0;
const THREE = __importStar(require("three"));
const stats_js_1 = __importDefault(require("stats.js"));
const dat_gui_1 = __importDefault(require("dat.gui"));
class UiManager extends THREE.Object3D {
    constructor(director) {
        super();
        this.debugLog = () => {
            console.log(this.director);
        };
        this.director = director;
        // Stats
        this.stats = new stats_js_1.default();
        document.body.appendChild(this.stats.dom);
        // dat.GUI
        this.gui = new dat_gui_1.default.GUI();
        // Move the GUI to a new position
        this.gui.domElement.style.position = "absolute";
        this.gui.domElement.style.zIndex = "5";
        this.gui.domElement.style.opacity = "0.8";
        this.gui.domElement.style.top = "0px";
        this.gui.domElement.style.right = "0px";
        document.body.appendChild(this.gui.domElement);
        this.init();
    }
    init() {
        // Camera Folder
        const cameraFolder = this.gui.addFolder("Cine Camera");
        cameraFolder.add(this.director.cameraManager.cineCam.position, "x", -100, 100);
        cameraFolder.add(this.director.cameraManager.cineCam.position, "y", -100, 100);
        cameraFolder.add(this.director.cameraManager.cineCam.position, "z", -100, 100);
        // Debug folder
        const debugFolder = this.gui.addFolder("Debug");
        debugFolder.add({ DebugLog: this.debugLog }, "DebugLog");
        debugFolder.open();
        //
        const simCtrl = this.gui.addFolder("Simulation Control");
        // Add buttons to the GUI
        simCtrl.add({ Play: this.director.simulationManager.play }, "Play");
        simCtrl.add({ Stop: this.director.simulationManager.stop }, "Stop");
        simCtrl.add({
            Reset: () => {
                this.director.objectManager.resetCps();
                this.director.simulationManager.stop();
                this.director.renderingClock = new THREE.Clock();
            },
        }, "Reset");
        simCtrl.open();
    }
}
exports.UiManager = UiManager;
