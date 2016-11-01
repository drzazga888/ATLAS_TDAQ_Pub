DELETE FROM projects;
DELETE FROM templates;
DELETE FROM recipients;
DELETE FROM project_replacements;
DELETE FROM project_replacement_normals;
DELETE FROM project_replacement_recipient_emails;
DELETE FROM project_replacement_recipient_names;

INSERT INTO projects (name, user_id) VALUES
  (
    'PROJECT_NAME',
    '111232910974189625849'
  );

INSERT INTO templates (project_id, document_id, bookmark_id) VALUES
  (
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    '1VlZ5lyw9RQd108de6wF9y3UchTH6xVxW7zwqj3_RHOc',
    '4vf9jamyqcph'
  );

INSERT INTO recipients (user_id, email, name) VALUES
  (
    '111232910974189625849',
    'recipient1@email.com',
    'RECIPIENT_1_NAME'
  ),
  (
    '111232910974189625849',
    'recipient2@email.com',
    'RECIPIENT_2_NAME'
  );

INSERT INTO project_recipients (project_id, recipient_id) VALUES
  (
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    (
      SELECT id
      FROM recipients
      WHERE name = 'RECIPIENT_1_NAME'
    )
  );

INSERT INTO project_replacement_normals (replace_to) VALUES
  (
    'VALUE_1'
  );

INSERT INTO project_replacement_recipient_emails VALUES ();

INSERT INTO project_replacement_recipient_names VALUES ();

INSERT INTO project_replacements (replacementable_id, replacementable_type, project_id, search) VALUES
  (
    (
      SELECT id
      FROM project_replacement_normals
    ),
    'normal',
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    'KEY_1'
  ),
  (
    (
      SELECT id
      FROM project_replacement_recipient_emails
    ),
    'recipient_email',
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    'KEY_2'
  ),
  (
    (
      SELECT id
      FROM project_replacement_recipient_names
    ),
    'recipient_name',
    (
      SELECT id
      FROM projects
      WHERE name = 'PROJECT_NAME'
    ),
    'KEY_3'
  );
