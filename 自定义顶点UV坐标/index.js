import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(100, 50);
// 纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("../assets/earth.jpeg");
const material = new THREE.MeshBasicMaterial({
  // color: 0x00ffff,
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
console.log("uv", geometry.attributes.uv);
// 自定义修改uv坐标
const uvs = new Float32Array([0, 0, 0.5, 0, 0.5, 0.5, 0, 0.5]);
const uvsAttributes = new THREE.BufferAttribute(uvs, 2);
geometry.attributes.uv = uvsAttributes;

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
