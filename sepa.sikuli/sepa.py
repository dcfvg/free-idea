Settings.MoveMouseDelay = .1
workspace = Region(226,223,1175,830)
layerzone = Region(1652,401,268,799)
tabszone = Region(39,80,369,17)
blkpx = Pattern("1387107144347.png").similar(0.65)

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

while 1:
    try:
        wait(1)
        findBlackPixel()
        type(Key.F2, KeyModifier.CMD)
        pass
    
    except FindFailed:
        type(Key.F4, KeyModifier.CMD)
        tabszone.waitVanish("1387133617238.png",FOREVER)
        #switchApp("Terminal")
        exit()
        pass
        