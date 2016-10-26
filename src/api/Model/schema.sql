CREATE TABLE projects (
  id          INTEGER     NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(40) NOT NULL,
  user_id     VARCHAR(40) NOT NULL,
  document_id VARCHAR(40),
  bookmark_id VARCHAR(40),
  created_at  DATETIME    NOT NULL             DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME    NOT NULL             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_name_for_user (user_id, name)
);

CREATE TABLE recipients (
  id      INTEGER     NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(40) NOT NULL,
  email   VARCHAR(40) NOT NULL,
  name    VARCHAR(40) NOT NULL,
  UNIQUE KEY unique_email_for_user (user_id, email)
);

CREATE TABLE projects_replacements (
  id         INTEGER      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_id INTEGER      NOT NULL REFERENCES projects (id)
    ON DELETE CASCADE,
  search     VARCHAR(100) NOT NULL,
  UNIQUE KEY unique_search_for_project (project_id, search)
);

CREATE TABLE projects_replacements_global (
  project_replacement_id INTEGER      NOT NULL REFERENCES projects_replacements (id)
    ON DELETE CASCADE,
  replace_to             VARCHAR(200) NOT NULL
);

CREATE TABLE projects_replacements_recipient_email (
  project_replacement_id INTEGER NOT NULL PRIMARY KEY,
  recipient_id           INTEGER NOT NULL REFERENCES recipients (id)
    ON DELETE CASCADE,
  FOREIGN KEY (project_replacement_id) REFERENCES projects_replacements (id)
    ON DELETE CASCADE
);

CREATE TABLE projects_replacements_recipient_name (
  project_replacement_id INTEGER NOT NULL PRIMARY KEY,
  recipient_id           INTEGER NOT NULL REFERENCES recipients (id)
    ON DELETE CASCADE,
  FOREIGN KEY (project_replacement_id) REFERENCES projects_replacements (id)
    ON DELETE CASCADE
);
