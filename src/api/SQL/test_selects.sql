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
  JOIN project_replacements r ON p.id = r.project_id
  LEFT JOIN project_replacement_normals rg ON r.id = rg.project_replacement_id
  LEFT JOIN project_replacement_recipient_emails re ON r.id = re.project_replacement_id
  LEFT JOIN project_replacement_recipient_names rn ON r.id = rn.project_replacement_id
  LEFT JOIN recipients rer ON re.recipient_id = rer.id
  LEFT JOIN recipients rnr ON rn.recipient_id = rnr.id;
