<?php
  session_start();

  $assets = "../assets/";
  $cache = $assets."cache/";
  
  include("../function.php");
  
  $GLOBALS['cache'] = "../assets/cache/";
  
  $icons = glob("*.gif");
  
  $text = file_get_contents($assets."text.md");

  $words = explode(" ", $text);
  
  
  $graph = 'digraph {
    //nodesep= "3"
    label="Public Domain Icons, Kevin Hughes (1998)"
    rankdir = "BT"
    
    node[style="", shape="none", color=royalblue]
    edge[color=royalblue, penwidth=2 , fontsize=20, fontname="myriadPro"]
    layout=fdp
    size="33.1,46.8";
    ';
  
  $nbitems = 80;
  
  for ($node=0; $node < $nbitems; $node++) {

    $size[0] = rand(0,800);
    $size[1] = rand(0,800);
    $find = findNearestPart($size);

    $part = str_replace($cache,"",$find["result"]);
    $name = $node;
    
    shuffle($words);
    
    $graph .= ''.$name.' [image="'.$part.'"]
    ';

  }
  
  for ($u=0; $u < $nbitems; $u++) { 
    
    for ($i=0; $i < rand(1,2); $i++) { 
      shuffle($words);
      
      $graph .= $u.' -> '.rand(0,9).' [label=" '.$words[0].'"]
      ';
    }
    
  }


  $graph .= "1->2}";
  
  file_put_contents($cache."_map.dot", $graph);
  
  echo $graph;
?>