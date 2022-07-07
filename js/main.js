let can = document.getElementById("canvas");
let eng = new BABYLON.Engine(canvas, true);
let camFree = true;

let gMat;
let capsuleEnd = function (name, pos, height, scene, dir, rotate = true, mat = gMat) {
    name = "cylinder-" + name + "-end-";
    name += dir;

    let end = BABYLON.MeshBuilder.CreateSphere(name, { slice: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    end.material = mat;
    end.position = pos.clone();
    switch (dir) {
        case "right":
            end.position.z += (height / 2) - 0.05;
            end.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
            break;
        case "left":
            end.position.z -= (height / 2) - 0.05;
            end.rotate(BABYLON.Axis.X, Math.PI / -2, BABYLON.Space.WORLD);
            break;
        case "top":
            end.position.y += height / 2;
            break;
        case "bottom":
            end.position.y -= height / 2;
            end.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.WORLD);
            break;
    }

    return end;
}

let capsule = function (name, pos, height, scene, rotate = true, mat = gMat, drawEnds = true) {
    let cylinder = BABYLON.MeshBuilder.CreateCylinder("capsule-" + name, {
        height: height,
        diameter: 1,
    }, scene);
    cylinder.position = pos;
    cylinder.material = mat;
    if (rotate) cylinder.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);

    if (drawEnds) {
        if (rotate === true) {
            cylinder = {
                "capsule": cylinder,
                "end1": capsuleEnd(name, pos, height, scene, "right", rotate, mat),
                "end2": capsuleEnd(name, pos, height, scene, "left", rotate, mat),
            }
        } else if (rotate === false) {
            cylinder = {
                "capsule": cylinder,
                "end1": capsuleEnd(name, pos, height, scene, "top", rotate, mat),
                "end2": capsuleEnd(name, pos, height, scene, "bottom", rotate, mat),
            }
        }
    }

    return cylinder;
}

let createScene = function () {
    let scene = new BABYLON.Scene(eng);
    scene.clearColor = new BABYLON.Color3.White();

    gMat = new BABYLON.StandardMaterial("mat", scene);
    gMat.backFaceCulling = true;
    gMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    gMat.specularColor = new BABYLON.Color3(0, 0, 0);

    capsule("e-1/3", new BABYLON.Vector3(4, 4, -2), 5, scene);

    blueMat = gMat.clone();
    blueMat.diffuseColor = new BABYLON.Color3(0, 0, 255);

    capsule("e-2/3", new BABYLON.Vector3(4, 2, -2), 5, scene, true, blueMat);
    capsule("c-e-2/3", new BABYLON.Vector3(4, 1, -4.45), 2, scene, false, gMat, false);

    let torus1 = BABYLON.MeshBuilder.CreateTorus("torus1", { diameter: 2.0, thickness: 1 }, scene);
    torus1.rotate(BABYLON.Axis.Z, Math.PI / -2, BABYLON.Space.WORLD);
    torus1.rotate(BABYLON.Axis.X, Math.PI / -2, BABYLON.Space.WORLD);

    torus1.onBeforeRenderObservable.add(function () {
        scene.clipPlane = new BABYLON.Plane(0, 0, -1, 7);
    });
    torus1.onAfterRenderObservable.add(function () {
        scene.clipPlane = null;
    });

    torus1.material = gMat;
    torus1.position = new BABYLON.Vector3(4, 1, 7);

    capsule("e-3/3", new BABYLON.Vector3(4, 0, 1.25), 11.5, scene);
    capsule("s-1/2", new BABYLON.Vector3(4, 2, 5), 4, scene);

    let torus2 = BABYLON.MeshBuilder.CreateTorus("torus2", { diameter: 2.0, thickness: 1 }, scene);
    torus2.rotate(BABYLON.Axis.Z, Math.PI / -2, BABYLON.Space.WORLD);
    torus2.rotate(BABYLON.Axis.X, Math.PI / -2, BABYLON.Space.WORLD);

    torus2.onBeforeRenderObservable.add(function () {
        scene.clipPlane = new BABYLON.Plane(0, 0, 1, -3);
    });
    torus2.onAfterRenderObservable.add(function () {
        scene.clipPlane = null;
    });

    torus2.material = gMat;
    torus2.position = new BABYLON.Vector3(4, 3, 3);

    capsule("s-2/2", new BABYLON.Vector3(4, 4, 8.5), 11, scene);
    capsule("n-1/1", new BABYLON.Vector3(4, 1.25, 11), 2.5, scene, false);

    let torus3 = BABYLON.MeshBuilder.CreateTorus("torus3", { diameter: 2.0, thickness: 1 }, scene);
    torus3.rotate(BABYLON.Axis.Z, Math.PI / -2, BABYLON.Space.WORLD);
    torus3.rotate(BABYLON.Axis.X, Math.PI / -2, BABYLON.Space.WORLD);

    torus3.onBeforeRenderObservable.add(function () {
        scene.clipPlane = new BABYLON.Plane(0.2, -0.35, 1.0, -11.75);
        scene.clipPlane2 = new BABYLON.Plane(0.1, -0.35, 1.0, -11);
    });
    torus3.onAfterRenderObservable.add(function () {
        scene.clipPlane = null;
        scene.clipPlane2 = null;
    });

    torus3.material = gMat;
    torus3.position = new BABYLON.Vector3(4, 2.65, 12);

    var letterI = capsule("i-1/1", new BABYLON.Vector3(4, 2, 14), 4, scene, false, gMat, false);
    letterI.onBeforeRenderObservable.add(function () {
        scene.clipPlane = new BABYLON.Plane(-0.025, -0.6, 1.01, -13);
    })
    letterI.onAfterRenderObservable.add(function () {
        scene.clipPlane = null;
    });

    let sphere = BABYLON.MeshBuilder.CreateSphere(name, {}, scene);
    sphere.material = gMat
    sphere.position = new BABYLON.Vector3(4, 5.5, 14);

    let letterA = capsule("a-1/2", new BABYLON.Vector3(4, 2, 15), 4.25, scene, false, blueMat, true);
    letterA.capsule.rotate(BABYLON.Axis.X, Math.PI / -1.20, BABYLON.Space.WORLD);
    letterA.end2.position = new BABYLON.Vector3(4, 3.75, 16);
    letterA.end2.rotate(BABYLON.Axis.X, Math.PI / -1.20, BABYLON.Space.WORLD);
    letterA.end1.position = new BABYLON.Vector3(4, 0.25, 14);
    letterA.end1.rotate(BABYLON.Axis.X, Math.PI / -1.20, BABYLON.Space.WORLD);

    let letterA2 = capsule("a-2/2", new BABYLON.Vector3(4, 2, 17), 4.25, scene, false, blueMat, true);
    letterA2.capsule.rotate(BABYLON.Axis.X, Math.PI / 1.20, BABYLON.Space.WORLD);
    letterA2.end2.position = new BABYLON.Vector3(4, 3.75, 16);
    letterA2.end2.rotate(BABYLON.Axis.X, Math.PI / 1.20, BABYLON.Space.WORLD);
    letterA2.end1.position = new BABYLON.Vector3(4, 0.25, 18);
    letterA2.end1.rotate(BABYLON.Axis.X, Math.PI / 1.20, BABYLON.Space.WORLD);

    capsule("a-bridge", new BABYLON.Vector3(4, 1, 16), 0.5, scene, true, blueMat, true);

    let Writer = BABYLON.MeshWriter(scene, { scale: 0.1, defaultFont: "Arial", methods: BABYLON });
    txt1 = new Writer("INSTITUTE OF TECHNOLOGY",
        {
            "anchor": "center",
            "letter-height": 16,
            "colors": {
                diffuse: "#000000",
                specular: "#000000",
                ambient: "#000000",
            },
            "position": {
                "x": 150,
                "y": -25,
                "z": -42.5,
            },
        });
    txt1.getMesh().rotate(BABYLON.Axis.X, Math.PI / -2, BABYLON.Space.World);
    txt1.getMesh().rotate(BABYLON.Axis.Z, Math.PI / -2, BABYLON.Space.World);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);


    let cam;
    // if (camFree) {
    // 	cam = new BABYLON.FreeCamera("camera1",
    // 		new BABYLON.Vector3(20, -4, 0), scene);
    // 	cam.setTarget(BABYLON.Vector3.Zero());
    // } else {
    // 	cam = new BABYLON.ArcRotateCamera("arcCamera",
    // 		BABYLON.Tools.ToRadians(45),
    // 		BABYLON.Tools.ToRadians(45),
    // 		10.0, box.position, scene);
    // }

    cam = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    cam.attachControl(canvas, true);

    // set camera position
    cam.setPosition(new BABYLON.Vector3(50.80026640673616, 20, 0.1));
    cam.setTarget(BABYLON.Vector3.Zero());

    

    cam.attachControl(canvas, true);

    cam.keysUp.push(87);
    cam.keysDown.push(83);
    cam.keysLeft.push(65);
    cam.keysRight.push(68);



    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // a plane
    let ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 60, height: 60}, scene);
    // make ground transparent
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.alpha = 0.5;

    // make ground mirror
    ground.material.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    ground.material.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
    ground.material.reflectionTexture.level = 0.1;
    
  



    let spherex = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 2, segments: 32}, scene);
    spherex.position.y = 1;
    spherex.position.z = -8;
    spherex.position.x = 10;
    spherex.material = new BABYLON.StandardMaterial("red", scene);
    spherex.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // add particles on spherex
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 1.5;
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 10;
    particleSystem.addSizeGradient(0.1, 0.5);
    particleSystem.addSizeGradient(0.5, 0.8);
    particleSystem.addSizeGradient(1.0, 0.3);
    particleSystem.addColorGradient(0.2, new BABYLON.Color4(1, 1, 1, 1));
    particleSystem.addColorGradient(0.8, new BABYLON.Color4(1, 1, 1, 0));
    particleSystem.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));
    particleSystem.emitter = sphere;
    //particleSystem.start();

    // toggle particlesystem on sherex click
    spherex.actionManager = new BABYLON.ActionManager(scene);
    spherex.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        if (particleSystem.isStarted()) {            
            particleSystem.stop();
            spherex.material.diffuseColor = new BABYLON.Color3(1, 0, 0);            
        } else {
            particleSystem.start();            
            spherex.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        }
    }
    ));

    // add background music
    var music = new BABYLON.Sound("music", "sounds/happy-day.mp3", scene, null, { loop: true, autoplay: true });
    music.setVolume(0.5);
    




    return scene;
}

let scene = createScene();
eng.runRenderLoop(function () {
    scene.render();
});