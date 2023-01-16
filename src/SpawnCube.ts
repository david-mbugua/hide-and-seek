export class SpawnCube extends Entity{
    public points:number
    private userPosition:Vector3
    constructor(public x: number, public y: number, public z: number){
        super()
        this.userPosition = Camera.instance.feetPosition
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
        let position = Vector3.Distance(new Vector3(this.x,this.y,this.z), this.userPosition)
        if(position <= 4){
            log("Player is close")
        }else{
            log("player is far")
        }
        log(`The user position is: ${position}`)
    }
}