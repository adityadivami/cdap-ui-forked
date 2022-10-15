import { Box } from '@material-ui/core';
import { useStyles } from 'components/ParsingDrawer/styles';
import React from 'react';
import { parseImportedSchemas } from 'components/AbstractWidget/SchemaEditor/SchemaHelpers';
import T from 'i18n-react';

const ParsingHeaderActionTemplate = (props) => {
  const classes = useStyles();
  const handleFile = (event) => {
    const schemaFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(schemaFile, 'UTF-8');
    reader.onload = (evt) => {
      try {
        const fileContents = JSON.parse(evt.target.result.toString());
        const importedSchemas = parseImportedSchemas(fileContents);
        const schema = importedSchemas[0] && importedSchemas[0].schema;
        props.handleSchemaUpload(schema);
      } catch (e) {
        props.setErrorOnTransformation({
          open: true,
          message: 'Imported schema is not a valid Avro schema',
        });
        // setParsingErrorMessage('Imported schema is not a valid Avro schema');
      }
    };
  };
  return (
    <Box>
      <input
        data-testId="fileinput"
        id="file"
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFile}
        className={classes.pointerStyles}
      />
      <label htmlFor="file" className={classes.pointerStyles}>
        <img
          className={classes.importIconStyles}
          src="/cdap_assets/img/import.svg"
          alt="import schema icon"
        />
      </label>
      <span className={classes.importSchemaTextStyles}>
        {T.translate('features.WranglerNewParsingDrawer.importSchema')}
      </span>
    </Box>
  );
};

export default ParsingHeaderActionTemplate;
