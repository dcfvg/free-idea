from org.sikuli.script.natives import Vision
2
Vision.setParameter("MinTargetSize", 6) # A small value such as 6 makes the matching algorithm be faster.
#Vision.setParameter("MinTargetSize", 18) # A large value such as 18 makes the matching algorithm be more robust.

Settings.MoveMouseDelay = .2
workspace = Region(243,276,1060,734)
layerzone = Region(1655,750,251,72)

def findBlackPixel():
    workspace.click(Pattern("1387105176414.png").targetOffset(0,3))
def layerFromSelection():
    type("j", KeyModifier.CMD + KeyModifier.SHIFT)
    type("p", KeyModifier.CMD + KeyModifier.ALT)
def selectLayer0():
    layerzone.click(Pattern("1387071685350.png").exact())
def getMagicWand():
    type("z") # z in french keyboard
    
while 1 :
    wait(1)
    findBlackPixel()
    type(Key.F4, KeyModifier.CMD)
