<?php

class Nav {

  public static $sections = [];

  public static function init() {
    global $db;

    if (@$_GET['page']){

      $result = $db->query("CALL sections_and_pages_around('{$_GET['section']}','{$_GET['page']}')");
      while ($row = $result->fetch_assoc()) {

        if (!sizeof(self::$sections) || end(self::$sections)->slug != $row['section_slug'] )
          self::$sections[] = new Section(get_section_attributes_from($row));

        if ($row['slug']) 
          end(self::$sections)->pages[] = new Post($row);
      }
      $db->next_result(); //TODO why does this query return 2 results?

    } else {
      $result = $db->query('SELECT * FROM sections ORDER BY sections.order');
      while ($row = $result->fetch_assoc()) self::$sections[] = new Section($row);
    }


  }

  public static function pages_in_current_section() {
    $current_section = current(array_filter(self::$sections, function($s) { return $s->is_current(); }));
    return $current_section->pages;
  }

}
