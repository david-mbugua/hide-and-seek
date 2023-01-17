/// --- Set up a system ---

import { SpawnCube } from "./SpawnCube"

class RotatorSystem {
  camera = new Camera()
  ws = new WebSocket("ws://localhost:8080")
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)
  time: number = 0
  update(dt: number) {
    this.time+=dt
    if(this.time>1) {this.ws.send(JSON.stringify({ethAddress: "0x123", status: "seeker", position: this.camera.position.asArray()}))
  this.time = 0}
    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawn a cube ---

const cube = new SpawnCube(8,1,8)