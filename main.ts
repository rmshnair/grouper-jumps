namespace SpriteKind {
    export const Indicator = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            value.vy = 0 - Math.sqrt(2 * (gravity * jumpHeight))
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.destroy()
        info.changeScoreBy(1)
        checkForEnd()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    cameraNext()
})
function cameraNext () {
    currentPlayers = sprites.allOfKind(SpriteKind.Player)
    for (let index = 0; index <= currentPlayers.length - 1; index++) {
        if (currentPlayers[index] == currentCameraSprite) {
            if (currentCameraSprite) {
                currentCameraSprite.z = 1
            }
            currentCameraSprite = currentPlayers[(index + 1) % currentPlayers.length]
            scene.cameraFollowSprite(currentCameraSprite)
            currentCameraSprite.z = 2
            return
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile3`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        if (sprite == currentCameraSprite) {
            cameraNext()
        }
        sprite.destroy()
        checkForEnd()
    }
})
function checkForEnd () {
    let list = 0
    if (sprites.allOfKind(list).length == 0 && !(gameOver)) {
        gameOver = true
        story.startCutscene(function () {
            story.setPagePauseLength(99999999, 99999999)
            timer.background(function () {
                story.printText("Game Over.", scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y), 1, 15)
            })
            pause(3000)
            timer.background(function () {
                story.printText("" + (numberOfPlayers - info.score()) + " didn`t make it out alive.", scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 10, 1, 15)
            })
            pause(3000)
            timer.background(function () {
                story.printText("" + info.score() + " made it out!", scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 20, 1, 15)
            })
            pause(3000)
            game.over(true)
        })
    }
}
let bleh = 0
let gameOver = false
let currentPlayers: Sprite[] = []
let currentCameraSprite: Sprite = null
let thePlayer: Sprite = null
let jumpHeight = 0
let gravity = 0
let numberOfPlayers = 0
numberOfPlayers = 20
gravity = 500
jumpHeight = 50
let mySprite = sprites.create(img`
    a f a a a a a a a a a a a a f a 
    f a f a a a a a a a a a a f a f 
    f f a f a a a a a a a a f a f f 
    f f a f a a a a a a a a f a f f 
    f f a f a a a a a a a a f a f f 
    f f a f a a a a a a a a f a f f 
    f f f a f a a a a a a f a f f f 
    f f f f a f a a a a f a f f f f 
    f f f f f a f a a f a f f f f f 
    f f f f f a f a a f a f f f f f 
    f f f f f a f a a f a f f f f f 
    f f f f f f a f f a f f f f f f 
    f f f f f f f a a f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.Indicator)
mySprite.z = 10
mySprite.setFlag(SpriteFlag.Ghost, true)
tiles.setCurrentTilemap(tilemap`level0`)
let characters = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 . 5 5 . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    . . . . . . 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 . 5 5 . . . . . 
    . . . . . 5 5 5 . 5 5 . . . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . . . . . 5 . . . 5 . . . . . 
    . . . . . . 5 . . . 5 . . . . . 
    `,
img`
    . . . . 6 . . . 6 . . . . . . . 
    . . . 6 6 6 . 6 6 6 . . . . . . 
    . . . 6 6 6 . 6 6 6 . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . 6 6 6 6 . 6 6 6 6 6 6 . . 
    . . . 6 6 6 6 6 6 6 6 6 6 6 6 . 
    . . . 6 6 6 6 6 6 6 6 6 6 6 6 6 
    . . . 6 6 6 6 6 . 6 6 6 6 6 6 . 
    . . . 6 6 . 6 6 6 6 . . . . . . 
    . . . 6 6 . . 6 6 6 . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . 6 6 6 6 6 6 6 . . . . . . 
    . . . 6 6 6 . 6 6 6 . . . . . . 
    . . . 6 6 6 . 6 6 6 . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 4 4 4 4 4 4 . . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 . 4 4 . 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 . 4 4 4 . . 
    . . . 4 4 4 4 4 4 4 4 4 4 4 . . 
    . . . 4 4 4 4 4 4 4 4 . 4 4 . . 
    . . . 4 4 4 4 4 4 4 4 4 4 4 . . 
    . . . 4 4 4 4 4 4 4 . 4 4 4 . . 
    . . . . 4 4 4 4 4 4 4 4 4 . . . 
    . . . . . 4 4 4 4 4 4 4 . . . . 
    `,
img`
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 . 2 2 2 . 2 2 2 . . . 2 2 2 
    2 2 . 2 2 . . . 2 2 2 2 . 2 2 2 
    2 2 . 2 2 2 . 2 2 2 2 . 2 2 2 2 
    2 2 . 2 2 2 2 2 2 2 . . . 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 . . . . . . . . . . . . . . 2 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . 2 2 2 . 2 2 2 2 2 2 2 2 2 . 
    . . 2 2 . . . 2 2 . 2 . 2 2 2 . 
    . . 2 2 2 . 2 2 2 2 2 2 2 2 2 . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . . . 2 2 2 . . . . . 2 2 2 . . 
    `,
img`
    . . . . . . 3 . 3 . 3 . . . . . 
    . . . . . . . 3 3 3 . . . . . . 
    . . . . . . . . 3 . . . . . . . 
    . . . . . . . . 3 . . . . . . . 
    . . . . 3 3 3 3 3 3 3 3 3 . . . 
    . . . . 3 3 3 3 3 3 3 3 3 . . . 
    . . . . 3 3 3 . 3 . 3 3 3 . . . 
    . . . . 3 3 3 3 3 3 3 3 3 . . . 
    . . . . 3 3 3 . 3 . 3 3 3 . . . 
    . . . . 3 3 3 3 . 3 3 3 3 . . . 
    . . . . 3 3 3 3 3 3 3 3 3 . . . 
    . . . . . 3 3 3 3 3 3 3 . . . . 
    . . . . . . 3 . . . 3 . . . . . 
    . . . . . . 3 3 . 3 3 . . . . . 
    . . . . . . . 3 3 3 . . . . . . 
    . . . . . . . 3 . 3 . . . . . . 
    `
]
for (let index = 0; index < numberOfPlayers; index++) {
    thePlayer = sprites.create(characters._pickRandom(), SpriteKind.Player)
    thePlayer.ay = gravity
    tiles.placeOnRandomTile(thePlayer, assets.tile`tile2`)
    thePlayer.x += randint(-32, 32)
    controller.moveSprite(thePlayer, randint(95, 105), 0)
    sprites.changeDataNumberBy(thePlayer, "jumpHeight", randint(50, 70))
}
scene.cameraFollowSprite(thePlayer)
currentCameraSprite = thePlayer
cameraNext()
game.onUpdate(function () {
    mySprite.x = currentCameraSprite.x
    mySprite.bottom = currentCameraSprite.top - 7 + Math.sin(bleh / 20) * 5
    bleh += 1
})
game.onUpdateInterval(500, function () {
    checkForEnd()
})
