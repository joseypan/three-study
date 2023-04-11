import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(100, 100, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(80);
scene.add(axesHelper);

const geometry = new THREE.SphereGeometry(50, 32, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  metalness: 0.5,
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const gui = new GUI();
gui.add(material, "metalness", 0, 1).name("金属度").step(0.1);
gui.add(material, "roughness", 0, 1).name("粗糙度").step(0.1);

// 添加灯光
// const ambientLight = new THREE.AmbientLight("0xffffff", 1);
// scene.add(ambientLight);

// 一定要添加灯光，不然什么也看不见
// 用平行光来模拟太阳光效果
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 200, 200);
directionalLight.target = mesh;
scene.add(directionalLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);
