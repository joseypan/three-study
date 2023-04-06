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

const geometry = new THREE.PlaneGeometry(200, 200);
// 纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("../assets/瓷砖.jpg");
const material = new THREE.MeshBasicMaterial({
  // color: 0x00ffff,
  map: texture,
  side: THREE.DoubleSide,
});
//设置阵列
texture.wrapS = THREE.RepeatWrapping; //水平方向
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
console.log("uv", geometry.attributes.uv);

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
