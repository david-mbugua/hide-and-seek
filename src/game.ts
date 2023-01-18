/// --- Set up a system ---

import { SpawnCube } from "./SpawnCube"
import { TriggerButton } from "./triggerButton"
import { movePlayerTo } from "@decentraland/RestrictedActions"
import { PlayerCube } from "./PlayerCube"
import { getUserData } from "@decentraland/Identity"

class RotatorSystem {
  camera = new Camera()
  playerCube = new PlayerCube(0,0,0)
  seekerPortal = new TriggerButton()
  hiderPortal = new TriggerButton()
  ws = new WebSocket("ws://localhost:8082")
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)
  time: number = 0
  update(dt: number) {
    const feetPosition = this.camera.feetPosition
    // this.playerCube.setPosition(feetPosition)
    this.time+=dt
    const playerStatus = this.playerCube.getStatus()
      getUserData().then((result)=>{
        log(`user data: ${result?.userId}`)
      
      this.ws.send(JSON.stringify({ethAddress: "0x123", status: playerStatus, position: this.camera.position.asArray()
    }))
  })
  this.time = 0
    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
  constructor(){
  this.seekerPortal.addComponentOrReplace(new Transform({
    position: new Vector3(10.07, 1.19, 7.39),
    scale: new Vector3(1, 1, 1),
    rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
  }))
  this.seekerPortal.addComponentOrReplace(new OnPointerDown((event)=>{
    log("clicked seeker")
    this.playerCube.setStatus("seeker")
  },{hoverText: "seekerPortal"}))
  
  this.hiderPortal.addComponentOrReplace(new Transform({
    position: new Vector3(19.07, 1.19, 7.39),
    scale: new Vector3(1, 1, 1),
    rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
  }))
  this.hiderPortal.addComponentOrReplace(new OnPointerDown((event)=>{
    log("clicked hider")
    this.playerCube.setStatus("hider")
  },{hoverText: "hiderPortal"}))
  engine.addEntity(this.seekerPortal)
  engine.addEntity(this.hiderPortal)
}
  
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawn a cube ---

const cube = new SpawnCube(8,1,8)

const museum = new Entity()
const museumCollider = new Entity()
const assets = new Entity()
const portal = new TriggerButton()

museum.addComponent(new GLTFShape("models/YW_MainGeo_1.glb"))
museumCollider.addComponent(new GLTFShape("models/YW_Colliders_1.glb"))
assets.addComponent(new GLTFShape("models/YW_Assets_1.glb"))

portal.addComponentOrReplace(new Transform({
  position: new Vector3(16.07, 1.19, 7.39),
  scale: new Vector3(1, 1, 1),
  rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
}))
portal.addComponentOrReplace(new OnPointerDown((event)=>{
  log("clicked")
  movePlayerTo(new Vector3(16.20, 9.68, 10.29), new Vector3(15.99, 9.68, 3.13))
},{hoverText: "portal"}))

engine.addEntity(museum)
engine.addEntity(museumCollider)
engine.addEntity(assets)
engine.addEntity(portal)