import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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

// requestAnimationFrame(moveTexture);
const loader = new GLTFLoader();
loader.load("../models/model.glb", (obj) => {
  console.log("model-obj", obj.scene);
  obj.scene.traverse((item) => {
    if (item.isMesh) {
      console.log("item", item);
      item.material = item.material.clone();
    }
  });
  const mesh1 = obj.scene.getObjectByName("Q_01");
  const mesh2 = obj.scene.getObjectByName("Q_02");
  console.log("mesh1", mesh1);
  console.log("mesh2", mesh2);
  mesh1.material.color.set(0xffff00);
  mesh2.material.color.set(0x00ff00);
  scene.add(obj.scene);
});
renderer.outputEncoding = THREE.sRGBEncoding; //保持模型渲染编码方式与渲染器渲染方式一致，才没有色差

// 添加灯光
const ambientLight = new THREE.AmbientLight("0xffffff", 1);
scene.add(ambientLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", (event) => {
  console.log("change", camera.position); //用来记录相机位置的
});

document.body.appendChild(renderer.domElement);
