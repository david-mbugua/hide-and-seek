export class SpawnCube extends Entity{
    public points:number
    constructor(x: number, y: number, z: number){
        super()
        this.points=0
        this.addComponent(new Transform({ position: new Vector3(x, y, z) }))
        this.addComponent(new BoxShape())
        engine.addEntity(this)
        this.addComponent(
            new OnPointerDown(() => {
              this.addPoints(1)
            }))
    }
    addPoints(x:number){
        this.points += x
        log(this.points)
    }
}