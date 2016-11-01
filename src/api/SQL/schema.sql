DROP TABLE IF EXISTS project_replacement_recipient_names;
DROP TABLE IF EXISTS project_replacement_recipient_emails;
DROP TABLE IF EXISTS project_replacement_normals;
DROP TABLE IF EXISTS project_replacements;
DROP TABLE IF EXISTS project_recipients;
DROP TABLE IF EXISTS recipients;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  id         INTEGER     NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(40) NOT NULL,
  user_id    VARCHAR(40) NOT NULL,
  created_at DATETIME    NOT NULL             DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME    NOT NULL             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_name_for_user (user_id, name)
);

CREATE TABLE templates (
  project_id  INTEGER     NOT NULL PRIMARY KEY,
  document_id VARCHAR(60) NOT NULL,
  bookmark_id VARCHAR(40),
  FOREIGN KEY (project_id) REFERENCES projects (id)
    ON DELETE CASCADE
);

CREATE TABLE recipients (
  id      INTEGER     NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(40) NOT NULL,
  email   VARCHAR(40) NOT NULL,
  name    VARCHAR(40) NOT NULL,
  UNIQUE KEY unique_email_for_user (user_id, email)
);

CREATE TABLE project_recipients (
  id           INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_id   INTEGER NOT NULL REFERENCES projects (id)
    ON DELETE CASCADE,
  recipient_id INTEGER NOT NULL REFERENCES recipients (id)
    ON DELETE CASCADE,
  UNIQUE KEY unique_recipients_for_project (project_id, recipient_id)
);

CREATE TABLE project_replacements (
  id                   INTEGER      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_id           INTEGER      NOT NULL REFERENCES projects (id)
    ON DELETE CASCADE,
  search               VARCHAR(100) NOT NULL,
  replacementable_id   INTEGER,
  replacementable_type VARCHAR(20),
  UNIQUE KEY unique_search_for_project (project_id, search)
);

CREATE TABLE project_replacement_normals (
  id         INTEGER      NOT NULL PRIMARY KEY AUTO_INCREMENT,
  replace_to VARCHAR(200) NOT NULL
);

CREATE TABLE project_replacement_recipient_emails (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE project_replacement_recipient_names (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT
);
