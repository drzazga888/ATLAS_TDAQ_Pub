DELETE FROM projects;
DELETE FROM templates;
DELETE FROM recipients;
DELETE FROM projects_replacements;
DELETE FROM projects_replacements_global;
DELETE FROM projects_replacements_recipient_email;
DELETE FROM projects_replacements_recipient_name;

INSERT INTO projects (name, user_id) VALUES
  (
    'PROJECT_NAME',
    'USER_ID'
  );

INSERT INTO templates (project_id, document_id, bookmark_id) VALUES
  (
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    'DOC_ID',
    'BOOKMARK_ID'
  );

INSERT INTO recipients (user_id, email, name) VALUES
  (
    'USER_ID',
    'recipient1@email.com',
    'RECIPIENT_1_NAME'
  ),
  (
    'USER_ID',
    'recipient2@email.com',
    'RECIPIENT_2_NAME'
  );

INSERT INTO projects_replacements (project_id, search) VALUES
  (
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    'KEY_1'
  ),
  (
    (
      SELECT id FROM projects WHERE name = 'PROJECT_NAME'
    ),
    'KEY_2'
  ),
  (
    (SELECT id
     FROM projects
     WHERE name = 'PROJECT_NAME'),
    'KEY_3'
  );

INSERT INTO projects_replacements_global (project_replacement_id, replace_to) VALUES
  (
    (
      SELECT id
      FROM projects_replacements
      WHERE search = 'KEY_1'
    ),
    'VALUE_1'
  );

INSERT INTO projects_replacements_recipient_email (project_replacement_id, recipient_id) VALUES
  (
    (
      SELECT id
      FROM projects_replacements
      WHERE search = 'KEY_2'
    ),
    (
      SELECT id
      FROM recipients
      WHERE email = 'recipient1@email.com'
    )
  );

INSERT INTO projects_replacements_recipient_name (project_replacement_id, recipient_id) VALUES
  (
    (
      SELECT id
      FROM projects_replacements
      WHERE search = 'KEY_3'
    ),
    (
      SELECT id
      FROM recipients
      WHERE email = 'recipient2@email.com'
    )
  );

/* recipients */
SELECT
  *
FROM
  recipients;

/* projects */
SELECT
  *
FROM
  projects p
  JOIN templates t ON p.id = t.project_id;

/* replacements */
SELECT
  r.search,
  COALESCE(rg.replace_to, rer.email, rnr.name) replace_to
FROM
  projects p
  JOIN templates t ON p.id = t.project_id
  JOIN projects_replacements r ON p.id = r.project_id
  LEFT JOIN projects_replacements_global rg ON r.id = rg.project_replacement_id
  LEFT JOIN projects_replacements_recipient_email re ON r.id = re.project_replacement_id
  LEFT JOIN projects_replacements_recipient_name rn ON r.id = rn.project_replacement_id
  LEFT JOIN recipients rer ON re.recipient_id = rer.id
  LEFT JOIN recipients rnr ON rn.recipient_id = rnr.id;