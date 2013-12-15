Settings.MoveMouseDelay = .1
workspace = Region(226,223,1175,830)
layerzone = Region(1647,574,268,604)
blkpx = Pattern("1387107144347.png").similar(0.40)

def findBlackPixel():
    workspace.click(blkpx)

def getMagicWand():
    type("z") # z in french keyboard

def init():
    layerzone.wait("1387127441955.png",FOREVER)
    switchApp("Adobe Photoshop CC")
    type(Key.F1, KeyModifier.CMD)
    wait(2)
    type("z")

init()

while 1 :
    try:
        wait(1)
        findBlackPixel()
        type(Key.F2, KeyModifier.CMD)
        pass
    
    except FindFailed:
        wait(1)
        type(Key.F4, KeyModifier.CMD)
        wait(3)
        exit()
        pass