$(function(){
  $('.reactfolder_tree').jstree({
    "core" : {
      "themes" : {
        "icons" : true  // Enable custom icons
      }
    }
  });
  $('.reactfolder_tree').jstree('open_node', $('.reactfolder_tree .maintree'));
  $('.reactfolder_tree').jstree('open_node', $('.reactfolder_tree .srctree'));
  $('.reactfolder_tree').jstree('open_node', $('.reactfolder_tree .publicktree'));
  $('.reactfolder_tree').jstree('open_node', $('.reactfolder_tree .assetstree'));
});


