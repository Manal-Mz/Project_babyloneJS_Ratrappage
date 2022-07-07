Ce projet contient le logo ESTIA en 3D qui a été à l'aide des deux fonctions :la fonction capsule et capsuleEnd.
J'ai utilisé la fonction capsule pour créer des lettres pour le logo. Cela peut être vu dans la fonction createScene.
Ensuite , j'ai utilisé le MeshWriter pour créer le texte "INSTITUTE OF TECHNOLOGY"ce qui nécessite un fichier JavaScript supplémentaire appelé "meshwriter.min.js".
Concernat la caméra j'ai utilisé la "ArcRotateCamera".
J'ai ajouté aussi un Skybox qui charge les textures de babylonjs.com.
Pour le Système de particules j'ai ajouté une sphère rouge à gauche du logo agit comme un interrupteur pour le système de particules. Lorsque on clique dessus, il devient vert et les particules partent du point « I » du logo. Lorsque on cliquez à nouveau sur la sphère, elle devient rouge et les particules s'arrêtent.
À la fin, il y a une musique de fond . Cela se fait en utilisant "BABYLON.Sound" qui lit "happy-day.mp3" à partir du dossier du projet.
Note: 
J'ai pas eu malheuresement le temps pour faire le second logo du MBDS.
