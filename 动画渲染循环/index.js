import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// 点光源
// const pointLight = new THREE.PointLight(0xffffff, 1);
// // pointLight.position.set(100, 100, 100);
// pointLight.position.set(100, 0, 0);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 100, 100);
directionalLight.target = mesh;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  10
);
scene.add(directionalLightHelper);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const clock = new THREE.Clock();
function render() {
  const spt = clock.getDelta() * 1000; //毫秒
  console.log("两帧渲染时间间隔(毫秒)", spt);
  console.log("帧率FPS", 1000 / spt);

  mesh.rotateY(0.01); //每次都旋转0.01弧度
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

// controls.addEventListener("change", () => {
//   renderer.render(scene, camera);
// });

document.body.appendChild(renderer.domElement);
