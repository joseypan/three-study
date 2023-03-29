import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(500, 500, 500);
// camera.lookAt(100, 0, 0); //单独设置这个没有反应，是因为OrbitControls会影响lookAt的设置

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial({
//   color: 0x00ffff,
//   transparent: true,
//   opacity: 0.5,
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});
// for (let i = 0; i < 10; i++) {
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.position.set(i * 20, 0, 0); //呈现一种近大远小的效果
//   scene.add(mesh);
// }

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i * 20, 0, j * 20); //呈现一种近大远小的效果
    scene.add(mesh);
  }
}

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
// 平行光
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(100, 100, 100);
// // directionalLight.target = mesh;
// scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const stats = new Stats();
document.body.appendChild(stats.domElement);

function render() {
  stats.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(100, 0, 0);
controls.update();

document.body.appendChild(renderer.domElement);

window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight); //如果只设置setSize会导致物体变形
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
