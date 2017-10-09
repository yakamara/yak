<?php

/**
 * @var rex_addon $this
 */

if (\rex_addon::get('developer')->isAvailable()) {
    \rex_developer_manager::setBasePath(\rex_path::src());
}

// register a custom yrewrite scheme
// rex_yrewrite::setScheme(new rex_project_rewrite_scheme());

// register yform template path
// rex_yform::addTemplatePath($this->getPath('yform-templates'));
