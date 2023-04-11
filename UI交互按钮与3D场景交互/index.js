import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
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
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffff00,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 0.5,
  clearcoatRoughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 添加灯光
// const ambientLight = new THREE.AmbientLight("0xffffff", 1);
// scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(200, 200, 200);
scene.add(pointLight);

// 一定要添加灯光，不然什么也看不见
// 用平行光来模拟太阳光效果;
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(300, 300, 300);
// // directionalLight.target = mesh;
// scene.add(directionalLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);

// 创建两个按钮，用来控制Mesh颜色的切换
const redButton = document.createElement("div");
redButton.innerText = "红色";
redButton.style =
  "position:fixed;bottom:20px;color:#fff;left:10px;cursor:pointer";

const greenButton = document.createElement("div");
greenButton.innerText = "绿色";
greenButton.style =
  "position:fixed;bottom:20px;color:#fff;left:80px;cursor:pointer";
document.body.appendChild(redButton);
document.body.appendChild(greenButton);

redButton.onclick = () => {
  material.color.set(0xff0000);
};
greenButton.onclick = () => {
  material.color.set(0x00ff00);
};
