   
import { createSelector } from '@reduxjs/toolkit';

export const selectAllDrinks = state => state.alldrinks.items;
export const selectDrinksError = state => state.alldrinks.error;
export const selectIsLoading = state => state.alldrinks.isLoading;
export const selectDrinksFilter = state => state.filters;

export const selectVisibleDrinks = createSelector(
  [selectAllDrinks, selectDrinksFilter],
  (drinks, filter) => {
    const filteredDrinks = drinks.filter(drink => {
      const drinkCategory = String(drink.category).toLowerCase().replace(/\s/g, '');
      const filterCategory = filter.categoryFilter.toLowerCase().replace(/\s/g, '');
      const isCategoryMatch = !filterCategory || drinkCategory === filterCategory;

      const ingredientFilter = filter.ingredientFilter ? filter.ingredientFilter.toLowerCase().replace(/\s/g, '') : '';
      console.log("Ingredients: ", drink.ingredients);
       console.log("Ingredient Filter: ", ingredientFilter);

const isIngredientMatch = !ingredientFilter || drink.ingredients.some(ingredient => {
  const ingredientTitle = ingredient.title.toLowerCase().replace(/\s/g, '');
 
  console.log("Ingredient Title: ", ingredientTitle);

  return ingredientTitle === ingredientFilter.toLowerCase().replace(/\s/g, '');
})

      const isSearchQueryMatch = !filter.searchQuery || drink.drink.toLowerCase().includes(filter.searchQuery.toLowerCase());

      
      //console.log("ingredientFilter: ", ingredientFilter);
      //console.log("isIngredientMatch: ", isIngredientMatch);
      console.log("isIngredientMatch : ", isIngredientMatch );

      return isCategoryMatch && isIngredientMatch && isSearchQueryMatch;
    });
    
    return filteredDrinks;
  }
);
  
   
// import { createSelector } from '@reduxjs/toolkit';
// export {fetchIngredients, fetchCategories} from '../../services/fetchDrinksForDrinksPages'
// export const selectAllDrinks = state => state.alldrinks.items;
// export const selectDrinksError = state => state.alldrinks.error;
// export const selectIsLoading = state => state.alldrinks.isLoading;
// export const selectDrinksFilter = state => state.filters;

// export const selectVisibleDrinks = createSelector(
//   [selectAllDrinks, selectDrinksFilter],
//   (drinks, filter) => {
//     const filteredDrinks = drinks.filter(drink => {
//       const drinkCategory = String(drink.category).toLowerCase().replace(/\s/g, '');
//       const filterCategory = filter.categoryFilter.toLowerCase().replace(/\s/g, '');
//       const isCategoryMatch = !filterCategory || drinkCategory === filterCategory;

//       const ingredientFilter = filter.ingredientFilter ? filter.ingredientFilter.toLowerCase().replace(/\s/g, '') : '';
//       console.log("Ingredients: ", drink.ingredients);
//        console.log("Ingredient Filter: ", ingredientFilter);

// const isIngredientMatch = !ingredientFilter || drink.ingredients.some(ingredient => {
//   const ingredientTitle = ingredient.title.toLowerCase().replace(/\s/g, '');
 
//   console.log("Ingredient Title: ", ingredientTitle);

//   return ingredientTitle === ingredientFilter.toLowerCase().replace(/\s/g, '');
// })

//       const isSearchQueryMatch = !filter.searchQuery || drink.drink.toLowerCase().includes(filter.searchQuery.toLowerCase());

      
//       //console.log("ingredientFilter: ", ingredientFilter);
//       //console.log("isIngredientMatch: ", isIngredientMatch);
//       console.log("isIngredientMatch : ", isIngredientMatch );

//       return isCategoryMatch && isIngredientMatch && isSearchQueryMatch;
//     });
    
//     return filteredDrinks;
//   }
// );
  