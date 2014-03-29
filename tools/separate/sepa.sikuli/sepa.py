Settings.MoveMouseDelay = 0
workspace = Region(41,99,1347,925)
layerzone = Region(1409,519,266,478)
tabszone = Region(40,77,24,22)
blkpx = "1390149570064.png"

# english keyboard enable

def findBlackPixel():
    type("w") # magic wand
    workspace.click(blkpx)

def init():
    layerzone.wait("1387127441955.png",FOREVER)
    switchApp("Adobe Photoshop CC")
    type(Key.F1, KeyModifier.CMD)
    wait(1.5)
    type("0", KeyModifier.CMD)
    wait(1)
    type("w") # magic wand
init()

while 1:
    try:
        findBlackPixel()
        wait(0.2)
        type(Key.F2, KeyModifier.CMD)
        wait(0.8)
        type(Key.ENTER)
        pass
    
    except FindFailed:
        wait(1)
        type("v")
        click(Location(700,500))
        wait(1)
        type(Key.F4, KeyModifier.CMD)
        tabszone.waitVanish("1387133617238.png",FOREVER)
        exit()
        pass
        