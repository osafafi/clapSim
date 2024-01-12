"use strict";
//ObjectManager.ts
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
exports.Person = exports.ObjectManager = void 0;
const THREE = __importStar(require("three"));
const CSS2DRenderer_1 = require("three/examples/jsm/renderers/CSS2DRenderer");
class ObjectManager extends THREE.Object3D {
    constructor(director) {
        super();
        this.director = director;
        this.crowd = new THREE.Object3D();
        this.crowd.name = "Everyone";
        this.grid = new THREE.GridHelper(100, 10);
        this.init();
    }
    init() {
        this.createCrowd(50);
        this.director.scene.add(this.crowd);
        //Grid
        this.director.scene.add(this.grid);
    }
    // createPerson() {
    //   const rand = generateRandomAttributes();
    //   //geo
    //   const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    //   const sphereMaterial = new THREE.MeshStandardMaterial({
    //     color: rand.color,
    //   });
    //   const individual = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //   individual.name = `Person ${rand.number}`;
    //   const pos = generateRandomePosition(10);
    //   individual.position.set(pos.x, pos.y, pos.z);
    //   // indicator
    //   // Clap Indicator Sphere
    //   const clapIndicatorGeo = new THREE.SphereGeometry(0.5, 16, 16); // Smaller Sphere
    //   const clapIndicatorMat = new THREE.MeshStandardMaterial({
    //     color: 0x808080,
    //   }); // Grey Color
    //   const clapIndicator = new THREE.Mesh(clapIndicatorGeo, clapIndicatorMat);
    //   clapIndicator.position.set(0, 1.2, 0); // Positioned on top of the main sphere
    //   individual.add(clapIndicator);
    //   // Create a div element for the cps value
    //   const cpsDiv = document.createElement("div");
    //   cpsDiv.style.color = "white";
    //   cpsDiv.style.backgroundColor = "grey";
    //   cpsDiv.style.border = "1px solid black";
    //   cpsDiv.style.borderRadius = "5px";
    //   cpsDiv.style.fontSize = "1.2rem";
    //   cpsDiv.style.padding = "2px";
    //   cpsDiv.textContent = `0 cps`;
    //   // Positioning the div above the individual
    //   const cssObject = new CSS2DObject(cpsDiv);
    //   cssObject.position.set(0, 1.5, 0); // 1.5 units above the sphere
    //   // individual.add(cssObject);
    //   individual.userData["cps"] = rand.clapsPerSecond;
    //   individual.userData["cpsDiv"] = cpsDiv; //
    //   individual.userData["clapIndicator"] = clapIndicator; // Reference to the indicator
    //   this.crowd.add(individual);
    // }
    createCrowd(count) {
        for (let i = 0; i < count; i++) {
            const person = new Person(count / 2);
            person.addSound(this.director.audioManager.createClapSound(person.cps));
            this.crowd.add(person);
        }
        this.findNeighbors();
    }
    findNeighbors() {
        const detectionRadius = 15;
        this.crowd.children.forEach((child) => {
            const individual = child;
            this.crowd.children.forEach((otherChild) => {
                const fellowIndividual = otherChild;
                if (individual === fellowIndividual)
                    return; // Skip self
                const distance = individual.position.distanceTo(fellowIndividual.position);
                // Find the nearest individual within the detection radius
                if (distance < detectionRadius) {
                    individual.neighbor = fellowIndividual;
                    return;
                }
            });
        });
    }
    simulateClaps(elapsedTime) {
        // Update logic for clap indicators
        this.crowd.children.forEach((child) => {
            var _a;
            const individual = child;
            const cps = individual.cps;
            const cpsDiv = individual.label.element;
            cpsDiv.textContent = cps.toFixed(2);
            // Logic to change color based on cps value
            // Toggle between grey (0x808080) and red (0xff0000)
            const res = Math.abs(elapsedTime % (1 / cps)) < 0.1;
            // const time = (Date.now() * cps) % 1000;
            // // Check if the material is of a type that includes the 'color' property
            if (individual.indicator.material instanceof THREE.MeshStandardMaterial) {
                if (res) {
                    individual.indicator.material.color.set(0x808080);
                    (_a = individual.sound) === null || _a === void 0 ? void 0 : _a.play();
                }
                else {
                    individual.indicator.material.color.set(0xff0000);
                }
                // individual.indicator.material.color.set(!res ? 0x808080 : 0xff0000);
            }
            if (individual.neighbor) {
                individual.cps = this.convergeClap(cps, individual.neighbor.cps);
            }
        });
    }
    convergeClap(src, dest) {
        // Execute the function only if the random number equals 0 (1% chance)
        if (Math.floor(Math.random() * 10) !== 0) {
            return src; // Return the source value without change
        }
        const newClap = src + (dest - src) * 0.1;
        return newClap;
    }
    resetCps() {
        this.crowd.children.forEach((child) => {
            const individual = child;
            individual.resetCps();
        });
    }
}
exports.ObjectManager = ObjectManager;
function generateRandomAttributes() {
    // Generate a random number between 1 and 5000
    const randomNumber = Math.floor(Math.random() * 5000) + 1;
    // Generate a random cps between 1 and 5
    const cps = Math.random() * 3 + 1;
    // Generate a random pastel color
    const pastelColor = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 85%)` // Hue, Saturation, Lightness
    );
    return { number: randomNumber, color: pastelColor, clapsPerSecond: cps };
}
function generateRandomePosition(bounds) {
    const position = new THREE.Vector3(Math.random() * 2 * bounds - bounds, 1, Math.random() * 2 * bounds - bounds);
    return position;
}
class Person extends THREE.Object3D {
    constructor(bounds) {
        super();
        this.neighbor = null;
        this.sound = null;
        // Body Geo
        const rand = generateRandomAttributes();
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: rand.color,
        });
        const individual = new THREE.Mesh(sphereGeometry, sphereMaterial);
        individual.name = `Person ${rand.number}`;
        const pos = generateRandomePosition(bounds);
        individual.position.set(pos.x, pos.y, pos.z);
        this.add(individual);
        // Clap Indicator Sphere
        const clapIndicatorGeo = new THREE.SphereGeometry(0.5, 16, 16); // Smaller Sphere
        const clapIndicatorMat = new THREE.MeshStandardMaterial({
            color: 0x808080,
        }); // Grey Color
        this.indicator = new THREE.Mesh(clapIndicatorGeo, clapIndicatorMat);
        this.indicator.position.set(0, 1.2, 0); // Positioned on top of the main sphere
        individual.add(this.indicator);
        //cps
        this.cps = rand.clapsPerSecond;
        // Create a div element for the cps value
        const cpsDiv = document.createElement("div");
        cpsDiv.style.color = "white";
        cpsDiv.style.backgroundColor = "grey";
        cpsDiv.style.border = "1px solid black";
        cpsDiv.style.borderRadius = "5px";
        cpsDiv.style.fontSize = "1.2rem";
        cpsDiv.style.padding = "2px";
        cpsDiv.textContent = this.cps.toFixed(3);
        this.label = new CSS2DRenderer_1.CSS2DObject(cpsDiv);
        this.label.position.set(0, 1.5, 0); // 1.5 units above the sphere
        this.indicator.add(this.label);
    }
    init() { }
    addSound(sound) {
        if (this.sound) {
            this.remove(this.sound);
        }
        this.add(sound);
        this.sound = sound;
    }
    resetCps() {
        const rand = generateRandomAttributes();
        this.cps = rand.clapsPerSecond;
        this.label.element.textContent = this.cps.toFixed(3);
    }
}
exports.Person = Person;
