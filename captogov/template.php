<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  GOVCMS_STARTERKIT_preprocess_html($variables, $hook);
  GOVCMS_STARTERKIT_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  // $variables['classes_array'] =
  //  array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function captogov_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // GOVCMS_STARTERKIT_preprocess_node_page() or
  // GOVCMS_STARTERKIT_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] =
  // array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */

function captogov_preprocess_block(&$variables, $hook) {
   // Add cleafix to all blocks
  $variables['classes_array'][] = 'clearfix';
}

function captogov_preprocess_node(&$vars, $hook) {
    //If landing page load the teasers of child pages 
 if ($vars['type'] == 'landing_page') {
    $children = captogov_childtree($vars['nid']);
    if(gettype($children) == "string"){
      $vars['children_pages'] = $children;
    }
  }
}

//Change search form placeholder
function captogov_form_alter( &$form, &$form_state, $form_id )
{
    if ($form_id == 'search_api_page_search_form_default_search') {    
        $form['keys_1']['#attributes']['placeholder'] = t( 'Search our website' );
    }
}

//Function to get node ID of children of menu item
function captogov_childtree($nid,$menu='main-menu') {
  $tree = menu_tree_all_data($menu);
  $mlid = db_select('menu_links' , 'ml')
  ->condition('ml.link_path', 'node/'.$nid)
  ->condition('ml.menu_name', $menu)
  ->fields('ml' , array())
  ->range(0, 1)
  ->execute()
  ->fetchAll();
  $mlidValue =  $mlid[0]->mlid;
  $children = check_menu_array($tree, $mlidValue);
  $rendered_teasers = "";
  if(isset($children) && gettype($children) == "array") {
    foreach($children as $child){
      $nid = str_replace("node/", "", drupal_get_normal_path($child['link']['link_path']));
      $child_nodes = node_view(node_load($nid), 'compact');
      $rendered_teasers .= render($child_nodes);
    }
  }
  return $rendered_teasers;
}


//loop through array and look for mlid, if not found go another level deeper!
function check_menu_array($menu, $mlid){
  $first_check = $menu;
  if(isset($next_check)){
    $check_menu = $next_check;
  } else{
    $check_menu = $first_check;
  }
  foreach($check_menu as $child){
    if($child['link']['mlid'] == $mlid){
      $result = $child['below'];
    } else {
      $next_check = $child['below'];
    }
  }
  return $result;
}


// //loop through array and look for mlid, if not found go another level deeper!
// function check_menu_array($menu, $mlid){
//   global $result;
//   foreach($menu as $child){
//   dpm($child['below']);
//     if($child['link']['mlid'] == $mlid){
//       $result = $child['below'];
//       // dpm($result);
//       // break;
//     } else {
//       // $result = check_menu_array($child['below'], $mlid);
//       foreach($child['below'] as $second_child){
//         if($second_child['link']['mlid'] == $mlid){
//           $result = $second_child['below'];
//         }
//       }
//     }
//   }
//   return $result;
// }

// Load plugin scripts and css only on homepage
function captogov_preprocess_page(&$vars) {
  //adding twitter plugin and init js
  if(drupal_is_front_page()) {
    drupal_add_js(drupal_get_path('theme', 'captogov') . '/plugins/twitter-post-fetcher/js/twitterFetcher_min.js');
    //Load newer jQuery version for slick slider
    // drupal_add_js(drupal_get_path('theme', 'captogov') . '/js/jquery-3.1.1.min.js');
    // //Load slick slider with new jQuery version
    // drupal_add_js(drupal_get_path('theme', 'captogov') . '/plugins/slick/slick.min.js');
    drupal_add_css(drupal_get_path('theme', 'captogov') . '/plugins/slick/slick.css');
    //Set jQuery to noconflict mode and assign to new var, see https://www.drupal.org/docs/7/api/javascript-api/multiple-different-versions-of-jquery-co-existing
    // drupal_add_js(drupal_get_path('theme', 'captogov') . '/js/jquery-noconflict.js');
    //run homepage scripts
    drupal_add_js(drupal_get_path('theme', 'captogov') . '/js/homepage_init.js');
  }
}


