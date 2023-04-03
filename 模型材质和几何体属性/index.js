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

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
console.log("mesh", mesh);
console.log("mesh.geometry", mesh.geometry);
console.log("mesh.material", mesh.material);
// 修改材质颜色
mesh.material.color.set(0x00ffff);
mesh.geometry.translate(100, 0, 0);
scene.add(mesh);
console.log("mesh.position", mesh.position);
const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.set(100, 100, 100);
mesh1.material.color.set(0xffff00);
scene.add(mesh1);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
