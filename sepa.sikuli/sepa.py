Settings.MoveMouseDelay = 0
workspace = Region(105,145,1219,835)
layerzone = Region(1409,430,272,620)
tabszone = Region(40,77,24,22)
blkpx = Pattern(Pattern("1387107144347.png").exact())

def findBlackPixel():
    workspace.click(blkpx)

def init():
    layerzone.wait("1387127441955.png",FOREVER)
    switchApp("Adobe Photoshop CC")
    type(Key.F1, KeyModifier.CMD)
    wait(2)
    type("z")
init()

while 1:
    try:
        wait(0.5)
        findBlackPixel()
        type(Key.F2, KeyModifier.CMD)
        type(Key.ENTER)
        pass
    
    except FindFailed:
        type(Key.F4, KeyModifier.CMD)
        tabszone.waitVanish("1387133617238.png",FOREVER)
        exit()
        pass
        