Settings.MoveMouseDelay = .2
workspace = Region(233,228,1161,820)
layerzone = Region(1655,750,251,72)

def findBlackPixel():
    workspace.click("1387107144347.png")

def getMagicWand():
    type("z") # z in french keyboard
    
while 1 :
    wait(1)
    findBlackPixel()
    type(Key.F4, KeyModifier.CMD)