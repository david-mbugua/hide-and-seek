export class PlayerCube extends Entity{
    public seekerPoints:number
    public hiderPoints:number
    private userPosition:Vector3
    private status:string = ""
    constructor(public x: number, public y: number, public z: number){
        super()
        this.userPosition = Camera.instance.feetPosition
        this.hiderPoints=0
        this.seekerPoints=0
        this.setPosition(new Vector3(x, y, z))
        this.addComponent(new BoxShape()).visible = false
        engine.addEntity(this)
        this.addComponent(
            new OnPointerDown(() => {
              this.addPoints(1)
            }))
    }
    getStatus(){
        return this.status
    }
    addPoints(x:number){
        this.hiderPoints += x
        log(this.hiderPoints)
        let position = Vector3.Distance(new Vector3(this.x,this.y,this.z), this.userPosition)
        if(position <= 4){
            log("Player is close")
            this.seekerPoints += x
            log(this.seekerPoints)
        }else{
            log("player is far")
        }
        log(`The user position is: ${position}`)
    }
    setPosition(vector3:Vector3){
        this.addComponentOrReplace(new Transform({ position: vector3,scale: new Vector3(1,3.7,1) }))
    }
    setStatus(status:string){
        this.status = status
        log(`status should be: ${this.status}`)
    }
}