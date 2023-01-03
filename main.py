@namespace
class SpriteKind:
    Indicator = SpriteKind.create()

def on_up_pressed():
    if person1.is_hitting_tile(CollisionDirection.BOTTOM):
        person1.vy = 0 - Math.sqrt(2 * (gravity * jumpHeight))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

person1: Sprite = None
jumpHeight = 0
gravity = 0
gravity = 500
jumpHeight = 50
tiles.set_current_tilemap(tilemap("""
    level0
"""))
person1 = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . . b b b b b . . . . . . . 
            . . . . b b b b b b b b . . . . 
            . . . . b b b b b b b b . . . . 
            . . . b b b b b b b b . . . . . 
            . . b b b b b b b b b . . . . . 
            . . . b b b b b b . . . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . . . . b b b b . . . . 
            . . . . . . . . . . b b b . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.player)
person1.ay = gravity
scene.camera_follow_sprite(person1)
controller.move_sprite(person1, 70, 0)
tiles.place_on_random_tile(person1, assets.tile("""
    tile2
"""))