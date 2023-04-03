import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const v3 = new THREE.Vector3(0, 0, 0);
console.log("v3", v3);
v3.set(10, 10, 0);
console.log("v3", v3.x);
v3.x = 100;
console.log("v3", v3.x);
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
console.log("position", mesh.position);
const axis = new THREE.Vector3(1, 1, 1);
axis.normalize();
mesh.translateOnAxis(axis, 200);
mesh.scale.set(0.5, 1.5, 2);

scene.add(mesh);
const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
