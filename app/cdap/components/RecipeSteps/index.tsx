import { Container } from '@material-ui/core';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import DrawerWidget from 'components/DrawerWidget';
import React, { useEffect, useState } from 'react';
import { RECIPE } from './constants';
import RecipeHeaderActionTemplate from './RecipeHeaderActionTemplate';
import RecipeStepsEmptyScreen from './RecipeStepsEmptyScreen';
import RecipeStepsTableComponent from './RecipeStepsTableComponent';
import { useStyles } from './styles';

const recipes = [
  {
    actionType: 'Parse Column',
    description: "'Body' with delimiter 'comma' and set 'first row as header'",
  },
  {
    actionType: 'Delete Column',
    description: "'Body'",
  },
];

const RecipeSteps = ({ setShowRecipePanel, showRecipePanel, deleteRecipes }) => {
  const [recipeSteps, setRecipeSteps] = useState(recipes);

  const classes = useStyles();

  const { dataprep } = DataPrepStore.getState();

  useEffect(() => {
    setRecipeSteps(dataprep.directives);
  }, [dataprep]);

  const closeClickHandler = () => {
    setShowRecipePanel(false);
  };

  const handleDeleteRecipeSteps = (new_arr) => {
    deleteRecipes(new_arr);
  };

  return (
    <DrawerWidget
      headingText={RECIPE}
      openDrawer={showRecipePanel}
      showDivider={true}
      headerActionTemplate={<RecipeHeaderActionTemplate />}
      closeClickHandler={closeClickHandler}
    >
      <Container className={classes.RecipeStepsBodyStyles}>
        {recipeSteps.length ? (
          <RecipeStepsTableComponent
            recipeSteps={recipeSteps}
            handleDeleteRecipeSteps={handleDeleteRecipeSteps}
          />
        ) : (
          <RecipeStepsEmptyScreen />
        )}
      </Container>
    </DrawerWidget>
  );
};

export default RecipeSteps;
