import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { gsap } from 'gsap';

import {
	CSS2DRenderer,
	CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const debugMode = false;

// initialize scene
const scene = new THREE.Scene();

// make scene background black
scene.background = new THREE.Color(0x000000);

// initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// initialize camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(-6, 4, 6);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.enableDamping = true;

// for playing model with animation
// let mixer;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/gltf/');

const loadingDiv = document.getElementById('loading');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
	'VR Therapy Scene.glb',
	function (gltf) {
		// hide loading div
		loadingDiv.style.display = 'none';

		const model = gltf.scene;
		model.position.set(0, -0.98, 0);
		model.scale.set(0.8, 0.8, 0.8);

		// block light from shining through model
		model.traverse((o) => {
			if (o.isMesh) {
				o.castShadow = true;
				o.receiveShadow = true;
			}
		});

		scene.add(model);

		// play model animation if it has one
		// mixer = new THREE.AnimationMixer(model);
		// mixer.clipAction(gltf.animations[0]).play();

		animate();
	},
	onProgress,
	function (e) {
		console.log('error', e);
	}
);

// add html to scene
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// const p = document.createElement('p');
// p.textContent = 'Hello';
// const cPointLabel = new CSS2DObject(p);
// scene.add(cPointLabel);
// cPointLabel.position.set(1, 3, -3);

// const div = document.createElement('div');
// div.appendChild(p);
// const divContainer = new CSS2DObject(div);
// scene.add(divContainer);

// loading percent
const loadingPercent = document.getElementById('loadingPercent');

function onProgress(xhr) {
	// if (xhr.lengthComputable) {
	const percentComplete = (xhr.loaded / xhr.total) * 100;
	console.log(Math.round(percentComplete) + '% downloaded');

	loadingPercent.innerHTML = 'Loading: ' + Math.round(percentComplete) + '%';
	// }
}

// object interaction listener material
const objectInteractionListenerMaterial = new THREE.MeshBasicMaterial({
	wireframe: true,
	opacity: 0.0,
	transparent: debugMode ? false : true
});

// add folder interaction listener to scene
const folderBox = new THREE.BoxGeometry();
const folder = new THREE.Mesh(folderBox, objectInteractionListenerMaterial);
folder.name = 'folder';
// set dimensions of folder
folder.scale.set(0.7, 0.1, 0.85);
// set position of folder
const folderX = -2.9;
const folderY = 0.3;
const folderZ = -2.55;
folder.position.set(folderX, folderY, folderZ);
scene.add(folder);

// add monitor interaction listener to scene
const monitorBox = new THREE.BoxGeometry();
const monitor = new THREE.Mesh(monitorBox, objectInteractionListenerMaterial);
monitor.name = 'monitor';
// set dimensions of monitor
monitor.scale.set(1.9, 0.1, 1);
// set position of monitor
const monitorX = -1.5;
const monitorY = 1.25;
const monitorZ = -3;
monitor.position.set(monitorX, monitorY, monitorZ);
// rotate 90 degrees around x axis
monitor.rotateX(Math.PI / 2);
scene.add(monitor);

// add book interaction listener to scene
const bookBox = new THREE.BoxGeometry();
const book = new THREE.Mesh(bookBox, objectInteractionListenerMaterial);
book.name = 'book';
// set dimensions of book
book.scale.set(0.85, 0.3, 1.1);
// set position of book
const bookX = 0.45;
const bookY = 0.35;
const bookZ = -2.6;
book.position.set(bookX, bookY, bookZ);
scene.add(book);

// add smart screen interaction listener to scene
const smartScreenBox = new THREE.BoxGeometry();
const smartScreen = new THREE.Mesh(
	smartScreenBox,
	objectInteractionListenerMaterial
);
smartScreen.name = 'smartScreen';
// set dimensions of smart screen
smartScreen.scale.set(1, 0.1, 1);
// set position of smart screen
const smartScreenX = 2.77;
const smartScreenY = 0.6;
const smartScreenZ = -0.65;
smartScreen.position.set(smartScreenX, smartScreenY, smartScreenZ);
// rotate 30 degrees around z axis
smartScreen.rotateZ(Math.PI / 6);
scene.add(smartScreen);

// add picture 1 interaction listener to scene
const picture1Box = new THREE.BoxGeometry();
const picture1 = new THREE.Mesh(picture1Box, objectInteractionListenerMaterial);
picture1.name = 'picture1';
// set dimensions of picture 1
picture1.scale.set(1.6, 0.1, 1.6);
// set position of picture 1
const picture1X = -1.65;
const picture1Y = 2.95;
const picture1Z = -3.3;
picture1.position.set(picture1X, picture1Y, picture1Z);
// rotate 90 degrees around x axis
picture1.rotateX(Math.PI / 2);
scene.add(picture1);

// add picture 2 interaction listener to scene
const picture2Box = new THREE.BoxGeometry();
const picture2 = new THREE.Mesh(picture2Box, objectInteractionListenerMaterial);
picture2.name = 'picture2';
// set dimensions of picture 2
picture2.scale.set(1.6, 0.1, 1.6);
// set position of picture 2
const picture2X = 1.05;
const picture2Y = 2.95;
const picture2Z = -3.3;
picture2.position.set(picture2X, picture2Y, picture2Z);
// rotate 90 degrees around x axis
picture2.rotateX(Math.PI / 2);
scene.add(picture2);

// add picture 3 interaction listener to scene
const picture3Box = new THREE.BoxGeometry();
const picture3 = new THREE.Mesh(picture3Box, objectInteractionListenerMaterial);
picture3.name = 'picture3';
// set dimensions of picture 3
picture3.scale.set(1.6, 0.1, 1.6);
// set position of picture 3
const picture3X = 3.3;
const picture3Y = 2.95;
const picture3Z = -1.45;
picture3.position.set(picture3X, picture3Y, picture3Z);
// rotate 90 degrees around z axis
picture3.rotateZ(Math.PI / 2);
scene.add(picture3);

// add picture 4 interaction listener to scene
const picture4Box = new THREE.BoxGeometry();
const picture4 = new THREE.Mesh(picture4Box, objectInteractionListenerMaterial);
picture4.name = 'picture4';
// set dimensions of picture 4
picture4.scale.set(1.6, 0.1, 2.5);
// set position of picture 4
const picture4X = 3.3;
const picture4Y = 2.95;
const picture4Z = 1.62;
picture4.position.set(picture4X, picture4Y, picture4Z);
// rotate 90 degrees around z axis
picture4.rotateZ(Math.PI / 2);
scene.add(picture4);

// flags
let lookingAtFolder = false;
let lookingAtMonitor = false;
let lookingAtBook = false;
let lookingAtSmartScreen = false;
let lookingAtPicture1 = false;
let lookingAtPicture2 = false;
let lookingAtPicture3 = false;
let lookingAtPicture4 = false;

function updateFlags(item) {
	lookingAtFolder = false;
	lookingAtMonitor = false;
	lookingAtBook = false;
	lookingAtSmartScreen = false;
	lookingAtPicture1 = false;
	lookingAtPicture2 = false;
	lookingAtPicture3 = false;
	lookingAtPicture4 = false;

	switch (item) {
		case 'folder': {
			lookingAtFolder = true;
			break;
		}
		case 'monitor': {
			lookingAtMonitor = true;
			break;
		}
		case 'book': {
			lookingAtBook = true;
			break;
		}
		case 'smartScreen': {
			lookingAtSmartScreen = true;
			break;
		}
		case 'picture1': {
			lookingAtPicture1 = true;
			break;
		}
		case 'picture2': {
			lookingAtPicture2 = true;
			break;
		}
		case 'picture3': {
			lookingAtPicture3 = true;
			break;
		}
		case 'picture4': {
			lookingAtPicture4 = true;
			break;
		}
	}
}

// check if mouse is over cube
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const onMouseMove = (event) => {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children);
	for (let i = 0; i < intersects.length; i++) {
		// console.log(intersects[i].object.name);

		if (intersects[i].object.name === 'title') {
			console.log('title clicked');
			moveToStartPosition();
		} else if (intersects[i].object.name === 'folder') {
			console.log('folder clicked', lookingAtFolder);
			if (!lookingAtFolder) {
				moveToLocation(
					folderX,
					folderY + 1,
					folderZ,
					folderX,
					folderY,
					folderZ
				);
				updateFlags('folder');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'monitor') {
			console.log('monitor clicked', lookingAtMonitor);
			if (!lookingAtMonitor) {
				moveToLocation(
					monitorX,
					monitorY,
					monitorZ + 1,
					monitorX,
					monitorY,
					monitorZ
				);
				updateFlags('monitor');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'book') {
			console.log('book clicked', lookingAtBook);
			if (!lookingAtBook) {
				moveToLocation(bookX, bookY + 1, bookZ, bookX, bookY, bookZ);
				updateFlags('book');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'smartScreen') {
			console.log('smartScreen clicked', lookingAtSmartScreen);
			if (!lookingAtSmartScreen) {
				moveToLocation(
					smartScreenX - 0.75,
					smartScreenY + 0.75,
					smartScreenZ,
					smartScreenX,
					smartScreenY,
					smartScreenZ
				);
				updateFlags('smartScreen');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'picture1') {
			console.log('picture1 clicked', lookingAtPicture1);
			if (!lookingAtPicture1) {
				moveToLocation(
					picture1X,
					picture1Y,
					picture1Z + 1.5,
					picture1X,
					picture1Y,
					picture1Z
				);
				updateFlags('picture1');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'picture2') {
			console.log('picture2 clicked', lookingAtPicture2);
			if (!lookingAtPicture2) {
				moveToLocation(
					picture2X,
					picture2Y,
					picture2Z + 1.5,
					picture2X,
					picture2Y,
					picture2Z
				);
				updateFlags('picture2');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'picture3') {
			console.log('picture3 clicked', lookingAtPicture3);
			if (!lookingAtPicture3) {
				moveToLocation(
					picture3X - 1.5,
					picture3Y,
					picture3Z,
					picture3X,
					picture3Y,
					picture3Z
				);
				updateFlags('picture3');
			} else {
				moveToStartPosition();
			}
		} else if (intersects[i].object.name === 'picture4') {
			console.log('picture4 clicked', lookingAtPicture4);
			if (!lookingAtPicture4) {
				moveToLocation(
					picture4X - 1.5,
					picture4Y,
					picture4Z,
					picture4X,
					picture4Y,
					picture4Z
				);
				updateFlags('picture4');
			} else {
				moveToStartPosition();
			}
		}
	}
};

function moveToLocation(cameraX, cameraY, cameraZ, lookAtX, lookAtY, lookAtZ) {
	controls.minDistance = 0;

	// ignore click until camera has finished moving
	window.removeEventListener('click', onMouseMove);
	// disable orbit and zoom
	controls.enableRotate = false;
	controls.enableZoom = false;

	let rateX;
	let rateY;
	let rateZ;
	let setRates = false;

	gsap.to(camera.position, {
		duration: 2,
		x: cameraX,
		y: cameraY,
		z: cameraZ,
		ease: 'power3.inOut',
		onUpdate: () => {
			if (!setRates) {
				setRates = true;
				// console.log(camera.target);
				console.log('controls.target.x', controls.target.x);
				console.log('controls.target.y', controls.target.y);
				console.log('controls.target.z', controls.target.z);

				// need to copy values in order to avoid error for undefined for some reason
				const currentTargetX = controls.target.x;
				const currentTargetY = controls.target.y;
				const currentTargetZ = controls.target.z;

				// calculate rateX
				rateX = Math.abs((lookAtX - currentTargetX) / 25);
				// calculate rateY
				rateY = Math.abs((lookAtY - currentTargetY) / 25);
				// calculate rateZ
				rateZ = Math.abs((lookAtZ - currentTargetZ) / 25);

				console.log('rateX', rateX);
				console.log('rateY', rateY);
				console.log('rateZ', rateZ);
			}

			if (controls.target.x > lookAtX) {
				controls.target.x -= rateX;
				if (controls.target.x <= lookAtX) {
					controls.target.x = lookAtX;
				}
			} else {
				controls.target.x += rateX;
				if (controls.target.x >= lookAtX) {
					controls.target.x = lookAtX;
				}
			}

			// update controls.target.y towards y
			if (controls.target.y > lookAtY) {
				controls.target.y -= rateY;
				if (controls.target.y <= lookAtY) {
					controls.target.y = lookAtY;
				}
			} else {
				controls.target.y += rateY;
				if (controls.target.y >= lookAtY) {
					controls.target.y = lookAtY;
				}
			}

			// update controls.target.z towards z
			if (controls.target.z > lookAtZ) {
				controls.target.z -= rateZ;
				if (controls.target.z <= lookAtZ) {
					controls.target.z = lookAtZ;
				}
			} else {
				controls.target.z += rateZ;
				if (controls.target.z >= lookAtZ) {
					controls.target.z = lookAtZ;
				}
			}
		},
		onComplete: () => {
			controls.target.set(lookAtX, lookAtY, lookAtZ);

			// prevent zoom forwards from current position
			const currentPos = camera.position.distanceTo(controls.target);
			controls.minDistance = currentPos;
			controls.maxDistance = currentPos + 2;

			window.addEventListener('click', onMouseMove);
			controls.enableZoom = true;
		}
	});
}

function moveToStartPosition() {
	lookingAtFolder = false;
	lookingAtMonitor = false;
	lookingAtBook = false;
	lookingAtSmartScreen = false;
	lookingAtPicture1 = false;
	lookingAtPicture2 = false;
	lookingAtPicture3 = false;
	lookingAtPicture4 = false;

	const cameraX = -6;
	const cameraY = 4;
	const cameraZ = 6;
	const lookAtX = 0;
	const lookAtY = 0;
	const lookAtZ = 0;

	controls.minDistance = 0;
	controls.maxDistance = 15;

	// ignore click until camera has finished moving
	window.removeEventListener('click', onMouseMove);
	// disable orbit and zoom
	controls.enableRotate = false;
	controls.enableZoom = false;

	let rateX;
	let rateY;
	let rateZ;
	let setRates = false;

	gsap.to(camera.position, {
		duration: 2,
		x: cameraX,
		y: cameraY,
		z: cameraZ,
		ease: 'power3.inOut',
		onUpdate: () => {
			if (!setRates) {
				setRates = true;
				// console.log(camera.target);
				console.log('controls.target.x', controls.target.x);
				console.log('controls.target.y', controls.target.y);
				console.log('controls.target.z', controls.target.z);

				// need to copy values in order to avoid error for undefined for some reason
				const currentTargetX = controls.target.x;
				const currentTargetY = controls.target.y;
				const currentTargetZ = controls.target.z;

				// calculate rateX
				rateX = Math.abs((lookAtX - currentTargetX) / 50);
				// calculate rateY
				rateY = Math.abs((lookAtY - currentTargetY) / 50);
				// calculate rateZ
				rateZ = Math.abs((lookAtZ - currentTargetZ) / 50);

				console.log('rateX', rateX);
				console.log('rateY', rateY);
				console.log('rateZ', rateZ);
			}

			// update controls.target.x towards x
			if (controls.target.x > lookAtX) {
				controls.target.x -= rateX;
				if (controls.target.x <= lookAtX) {
					controls.target.x = lookAtX;
				}
			} else {
				controls.target.x += rateX;
				if (controls.target.x >= lookAtX) {
					controls.target.x = lookAtX;
				}
			}

			// update controls.target.y towards y
			if (controls.target.y > lookAtY) {
				controls.target.y -= rateY;
				if (controls.target.y <= lookAtY) {
					controls.target.y = lookAtY;
				}
			} else {
				controls.target.y += rateY;
				if (controls.target.y >= lookAtY) {
					controls.target.y = lookAtY;
				}
			}

			// update controls.target.z towards z
			if (controls.target.z > lookAtZ) {
				controls.target.z -= rateZ;
				if (controls.target.z <= lookAtZ) {
					controls.target.z = lookAtZ;
				}
			} else {
				controls.target.z += rateZ;
				if (controls.target.z >= lookAtZ) {
					controls.target.z = lookAtZ;
				}
			}
		},
		onComplete: () => {
			controls.target.set(lookAtX, lookAtY, lookAtZ);

			controls.minDistance = 4;
			controls.maxDistance = 15;

			window.addEventListener('click', onMouseMove);
			controls.enableRotate = true;
			controls.enableZoom = true;
		}
	});
}

window.addEventListener('click', onMouseMove, false);

// import FontLoader
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// import TextGeometry
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// add 3d text that says Hello World!
const loader2 = new FontLoader();
loader2.load(
	'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	function (font) {
		const geometry = new TextGeometry('VR Therapy', {
			font: font,
			size: 0.35,
			height: 0.2
		});
		const material = new THREE.MeshNormalMaterial();
		const text = new THREE.Mesh(geometry, material);
		text.position.set(-3.25, -0.8, 3);
		text.name = 'title';
		scene.add(text);

		// item text material
		// set text color to white
		const whiteTextMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});
		// set text color to black
		const blackTextMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000
		});

		// add folder text
		const folderTextGeometry = new TextGeometry(
			'The Problem\n\n-Out of every 100 students in college,\naround 18 of us has an anxiety disorder\nAs many as 500,000 U.S. troops who\nserved over the past 13 years have been\ndiagnosed with PTSD\n- Anxiety disorders, including panic\ndisorder, specific phobias, PTSD are too\ncommon\n- Current exposure treatment success\nrate is 60-90%\n- However these methods can be\nimproved in a more innovative way with\nVR technology',
			{
				font: font,
				size: 0.025,
				height: 0
			}
		);
		const folderText = new THREE.Mesh(folderTextGeometry, whiteTextMaterial);
		folderText.position.set(folderX - 0.32, folderY, folderZ - 0.3);
		// rotate text -90 degrees around x axis
		folderText.rotateX(-Math.PI / 2);
		folderText.name = 'folderText';
		scene.add(folderText);

		// add monitor text
		const monitorTextGeometry = new TextGeometry(
			'How VR Therapy Works\n\n- Exposure therapy aims to decrease the\nintensity of your response to stressful situations\n- You put on a VR goggle and are exposed to PTSD\ntriggers in a a controlled and safe environment\n- As you continue to expose yourself to the triggers,\nyour brain will learn to associate the triggers with a\nsafe environment, and you will be able to overcome\nyour fear and anxiety',
			{
				font: font,
				size: 0.05,
				height: 0
			}
		);
		const monitorText = new THREE.Mesh(monitorTextGeometry, blackTextMaterial);
		monitorText.position.set(monitorX - 0.8, monitorY + 0.35, monitorZ);
		monitorText.name = 'monitorText';
		scene.add(monitorText);

		// add book text
		const bookTextGeometry = new TextGeometry(
			'The Science of\nVR Therapy\n\n- The VR experience tricks your brain into\nbelieving that you are physically in the\nenvironment because it shares the same\nbasic mechanism: embodied simulations\n- According to neuroscience, the brain\ndevelops an embodied simulation of the\n body in an environment to make\npredictions and respond to the world\nappropriately\n- VR therapy tries to accomplish the same\nthing by maintaining a simulation of the\nbody and the space around it\n- VR therapy simply alters the experience\nof the body and the facilitating virtual\nenvironment',
			{
				font: font,
				size: 0.025,
				height: 0
			}
		);
		const bookText = new THREE.Mesh(bookTextGeometry, whiteTextMaterial);
		bookText.position.set(bookX - 0.32, bookY + 0.15, bookZ - 0.3);
		// rotate text -90 degrees around x axis
		bookText.rotateX(-Math.PI / 2);
		bookText.name = 'bookText';
		scene.add(bookText);

		// add smart screen text
		const smartScreenTextGeometry = new TextGeometry(
			"VR Rehabilitation vs.\nConventional Therapy\n\n- According to a paper published in them\nNational Library of Medicine, 12 weeks of\nVR rehabilitation resulted in a greater\nimprovement in patients over traditional\ntherapy\n- About 30% of patients who tried VR\ntherapy prefer conversing with virtual\nbeings rather than face-to-face interactions\n- VR therapy allows for greater control over\na patient's personal exposure to a\nparticular environment",
			{
				font: font,
				size: 0.03,
				height: 0
			}
		);
		const smartScreenText = new THREE.Mesh(
			smartScreenTextGeometry,
			blackTextMaterial
		);
		smartScreenText.position.set(
			smartScreenX + 0.24,
			smartScreenY + 0.18,
			smartScreenZ - 0.4
		);
		// rotate 30 degrees around z axis
		smartScreenText.rotateZ(Math.PI / 6);
		// rotate 90 degrees around x axis
		smartScreenText.rotateX(-Math.PI / 2);
		// rotate -90 degrees around z axis
		smartScreenText.rotateZ(-Math.PI / 2);
		smartScreenText.name = 'smartScreenText';
		scene.add(smartScreenText);

		// add picture 1 text
		const picture1TextGeometry = new TextGeometry(
			"Benefits of VR Therapy\n\n- Digital realities are getting more complex and\nrealistic, making it more believable\n- VR Therapy is conducted in a safe and secure\nenvironment\n- Personalizing one's experience is much easier\nand better\n- Therapeutic sessions are consistent and\nrepeatable or progressive\n- Sessions can be replayed for re-assessment",
			{
				font: font,
				size: 0.04,
				height: 0
			}
		);
		const picture1Text = new THREE.Mesh(
			picture1TextGeometry,
			blackTextMaterial
		);
		picture1Text.position.set(picture1X - 0.6, picture1Y, picture1Z);
		picture1Text.name = 'picture1Text';
		scene.add(picture1Text);

		// add picture 2 text
		const picture2TextGeometry = new TextGeometry(
			'Testimonials\n\n- "The biggest problem I have found as a person living with chronic\npain is that, although there is a lot of information about chronic pain\navailable, it is not easily accessible – you have to search so many\nplaces to get part of the BIG picture! You have created a clean and\nclear source that anyone can use to access and\nunderstand information on VR!"\n- "Having used VR during the birth of both of my daughters, I know\nfirsthand how this can be an effective tool in managing the most\npainful moments of childbirth."\n- "VR could play an important role, providing immersive and\nimmediate solutions to help alleviate stress, reduce anxiety and\nmanage pain. I believe VR represents the next generation of digital\nhealth solutions."',
			{
				font: font,
				size: 0.03,
				height: 0
			}
		);
		const picture2Text = new THREE.Mesh(
			picture2TextGeometry,
			blackTextMaterial
		);
		picture2Text.position.set(picture2X - 0.6, picture2Y, picture2Z);
		picture2Text.name = 'picture2Text';
		scene.add(picture2Text);

		// add picture 3 text
		const picture3TextGeometry = new TextGeometry(
			'Why I built this site\n\n- To raise awareness of the importance\nof VR in therapy\n- Practice Blender and Three.Js\n- Learn new tools and developing an\napplication that can be used as a basis\nfor other projects',
			{
				font: font,
				size: 0.05,
				height: 0
			}
		);
		const picture3Text = new THREE.Mesh(
			picture3TextGeometry,
			blackTextMaterial
		);
		picture3Text.position.set(picture3X, picture3Y, picture3Z - 0.6);
		// rotate 90 degrees around y axis
		picture3Text.rotateY(-Math.PI / 2);
		picture3Text.name = 'picture3Text';
		scene.add(picture3Text);

		// add picture 4 text
		const picture4TextGeometry = new TextGeometry(
			'The Future of VR Therapy\n\n- As VR softwares and apps get better (easy to use and more\nrealistic), VR is likely to become commonplace for therapy\n- Jan CES 2023 unveiled the most expansive solutions to VR\nincluding haptics for body and hands, 3D holograms, and\n advanced AI softwares which could take VR to the next step\nof realism',
			{
				font: font,
				size: 0.05,
				height: 0
			}
		);
		const picture4Text = new THREE.Mesh(
			picture4TextGeometry,
			blackTextMaterial
		);
		picture4Text.position.set(picture4X, picture4Y, picture4Z - 1);
		// rotate 90 degrees around y axis
		picture4Text.rotateY(-Math.PI / 2);
		picture4Text.name = 'picture4Text';
		scene.add(picture4Text);
	}
);

// add images to pictures
// instantiate a loader
const imgLoader = new THREE.ImageLoader();

// load picture 1 image with transparent background
imgLoader.load('./img/vr-6770800_640.png', function (image) {
	// create the texture
	const texture = new THREE.Texture(image);
	texture.needsUpdate = true;
	// create the material
	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});
	// create the geometry
	const geometry = new THREE.PlaneGeometry(1, 1);
	// create the mesh
	const mesh = new THREE.Mesh(geometry, material);
	// scale the mesh
	mesh.scale.set(0.7, 0.5, 1);
	mesh.position.set(picture1X, picture1Y + 0.35, picture1Z);
	mesh.name = 'picture1Img';
	scene.add(mesh);
});

// load picture 2 image with transparent background
imgLoader.load('./img/trophy-png-23.png', function (image) {
	// create the texture
	const texture = new THREE.Texture(image);
	texture.needsUpdate = true;
	// create the material
	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});
	// create the geometry
	const geometry = new THREE.PlaneGeometry(1, 1);
	// create the mesh
	const mesh = new THREE.Mesh(geometry, material);
	// scale the mesh
	mesh.scale.set(0.6, 0.6, 1);
	mesh.position.set(picture2X, picture2Y + 0.35, picture2Z);
	mesh.name = 'picture2Img';
	scene.add(mesh);
});

// load picture 3 image with transparent background
imgLoader.load('./img/1377892.png', function (image) {
	// create the texture
	const texture = new THREE.Texture(image);
	texture.needsUpdate = true;
	// create the material
	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});
	// create the geometry
	const geometry = new THREE.PlaneGeometry(1, 1);
	// create the mesh
	const mesh = new THREE.Mesh(geometry, material);
	// scale the mesh
	mesh.scale.set(0.5, 0.5, 1);
	mesh.position.set(picture3X, picture3Y + 0.35, picture3Z);
	// rotate 90 degrees around y axis
	mesh.rotateY(-Math.PI / 2);
	mesh.name = 'picture3Img';
	scene.add(mesh);
});

// load picture 4 image with transparent background
imgLoader.load(
	'./img/Oculus-Rift-CV1-Headset-Front_with_transparent_background.png',
	function (image) {
		// create the texture
		const texture = new THREE.Texture(image);
		texture.needsUpdate = true;
		// create the material
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true
		});
		// create the geometry
		const geometry = new THREE.PlaneGeometry(1, 1);
		// create the mesh
		const mesh = new THREE.Mesh(geometry, material);
		// scale the mesh
		mesh.scale.set(1, 0.65, 1);
		mesh.position.set(picture4X, picture4Y + 0.35, picture4Z);
		// rotate 90 degrees around y axis
		mesh.rotateY(-Math.PI / 2);
		mesh.name = 'picture4Img';
		scene.add(mesh);
	}
);

// add black floor that absorbs light

// dark grey
const color = 0x222222;
const size = 500;

const floorGeometry = new THREE.CircleGeometry(size, size);
const floorMaterial = new THREE.MeshPhongMaterial({
	color: color,
	side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// resize renderer on window resize
window.addEventListener('resize', function () {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

const xyPos = 5;
const lightYPos = 3;
const lightIntensity = 3;
const lightDist = 20;

// add 4 lights pointing downward to illuminate scene in green, blue, purple, red in 4 corners

const white = 0xffffff;
// 0x00ff00

// add omni directional light
const light1 = new THREE.PointLight(0x00ff00, lightIntensity, lightDist);
light1.position.set(xyPos, lightYPos, xyPos);
light1.castShadow = true;
scene.add(light1);
if (debugMode) {
	const light1Helper = new THREE.PointLightHelper(light1, 0.2);
	scene.add(light1Helper);
}

const light2 = new THREE.PointLight(0x0000ff, lightIntensity, lightDist);
light2.position.set(-xyPos, lightYPos, xyPos);
light2.castShadow = true;
scene.add(light2);
if (debugMode) {
	const light2Helper = new THREE.PointLightHelper(light2, 0.2);
	scene.add(light2Helper);
}

const light3 = new THREE.PointLight(0x800080, lightIntensity, lightDist);
light3.position.set(xyPos, lightYPos, -xyPos);
light3.castShadow = true;
scene.add(light3);
if (debugMode) {
	const light3Helper = new THREE.PointLightHelper(light3, 0.2);
	scene.add(light3Helper);
}

const light4 = new THREE.PointLight(0xff0000, lightIntensity, lightDist);
light4.position.set(-xyPos, lightYPos, -xyPos);
light4.castShadow = true;
scene.add(light4);
if (debugMode) {
	const light4Helper = new THREE.PointLightHelper(light4, 0.2);
	scene.add(light4Helper);
}

// add spot light coming out of desk lamp
const yellow = 0xffff00;
const deskLight = new THREE.SpotLight(yellow, 10, 3);
deskLight.position.set(1.84, 1.31, -2.42);
deskLight.target.position.set(0, -1, -2.4);
deskLight.angle = Math.PI / 10;
deskLight.exponent = 1;
// deskLight.castShadow = true;
scene.add(deskLight);
// for some reason this light needs to be added to the scene in order for light to show regardless of debugMode
const deskLightHelper = new THREE.SpotLightHelper(deskLight, 1);
if (debugMode) {
	scene.add(deskLightHelper);
}

// add ball where spot light is
const ballGeometry = new THREE.SphereGeometry(0.06, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: yellow });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(1.84, 1.31, -2.42);
scene.add(ball);

// add vr overhead point light
// const vrLight = new THREE.PointLight(white, 3, 10);
// vrLight.position.set(-2.5, 3, 2.5);
// vrLight.castShadow = true;
// scene.add(vrLight);
// if (debugMode) {
// 	const vrLightHelper = new THREE.PointLightHelper(vrLight, 0.2);
// 	scene.add(vrLightHelper);
// }

const vrLight = new THREE.SpotLight(white, 3, 10);
vrLight.position.set(-1.9, 3, 1.9);
vrLight.target.position.set(-1.9, 0, 1.9);
vrLight.angle = Math.PI / 6;
vrLight.exponent = 1;
// deskLight.castShadow = true;
scene.add(vrLight);
// for some reason this light needs to be added to the scene in order for light to show regardless of debugMode
const vrLightHelper = new THREE.SpotLightHelper(vrLight, 1);
if (debugMode) {
	scene.add(vrLightHelper);
}

const overheadPointLight = new THREE.PointLight(white, 1, 20);
overheadPointLight.position.set(0, 5, 0);
overheadPointLight.castShadow = true;
scene.add(overheadPointLight);
if (debugMode) {
	const overheadPointLightHelper = new THREE.PointLightHelper(
		overheadPointLight,
		0.2
	);
	scene.add(overheadPointLightHelper);
}

// show shadow
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// show light position and direction
// const lightHelper = new THREE.PointLightHelper(light, 1);
// scene.add(lightHelper);

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

if (debugMode) {
	// add grid helper
	const gridHelper = new THREE.GridHelper(100, 100);
	scene.add(gridHelper);

	// add axes helper
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);
}

// set min and max camera distance
controls.minDistance = 4;
controls.maxDistance = 15;

// set min and max y camera position
controls.minPolarAngle = Math.PI / 6; // don't obit too far over top of model
controls.maxPolarAngle = Math.PI / 2; // stay above y axis

// get clock
// const clock = new THREE.Clock();

// add stats
const stats = Stats();
if (debugMode) {
	document.body.appendChild(stats.dom);
}

const animate = function () {
	requestAnimationFrame(animate);

	// update html elements
	labelRenderer.render(scene, camera);

	controls.update();
	if (debugMode) {
		stats.update();
	}

	// const delta = clock.getDelta();
	// mixer.update(delta);

	renderer.render(scene, camera);
};
