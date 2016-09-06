
const { Component, PropTypes } =React;
const { createStore, combineReducers, applyMiddleware, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;
// constants
const types = {
  ADD_RECIPE: 'ADD_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',
  EDIT_RECIPE: 'EDIT_RECIPE'

}

// action creaters
const ReceipeActions = {
  addRecipe: function addRecipe(name, ingredients) {
    return {
      type: types.ADD_RECIPE,
      name,
      ingredients
    }
  },

  deleteRecipe: function deleteRecipe(id) {
    return {
      type: types.DELETE_RECIPE,
      id
    }
  },

  editRecipe: function editRecipe(id, name, ingredients) {
    return {
      type: types.EDIT_RECIPE,
      id,
      name,
      ingredients
    }
  },
}

// reducers
const initialState = [
  {
    name: 'Pumpin Pie',
    ingredients: 'Pumpkin Puree,Sweetened Condensed Milk,Eggs',
    id: 0
  },
  {
    name: 'Spahetti',
    ingredients: 'a,b,c',
    id: 1
  },
  {
    name: 'Onion Pie',
    ingredients: 'd,e,f',
    id: 2
  }
]

function recipes(state = initialState, action) {
  switch (action.type) {
    case types.ADD_RECIPE:
      return [
        {
          id: state.reduce((maxId, recipe) => Math.max(recipe.id, maxId), -1) + 1,
          name: action.name,
          ingredients: action.ingredients
        },
        ...state
      ]

    case types.DELETE_RECIPE:
      return state.filter(recipe =>
        recipe.id !== action.id
      )

    case types.EDIT_RECIPE:
      return state.map(recipe =>
        recipe.id === action.id ?
          Object.assign({},
                        recipe,
                        { name: action.name,
                          ingredients: action.ingredients
                        })
          : recipe
      )
    default:
      return state
  }
}


// Components
class App extends Component {
  render() {
    const { recipes, actions } = this.props;
    return (
      <div>
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      {
        recipes.map(recipe =>
          <div className="panel panel-default" key={recipe.id}>
            <div className="panel-heading" role="tab" id="headingOne">
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + recipe.id} aria-expanded="false" aria-controls="collapseOne">
                  ✔ <strong>{recipe.name}</strong>
                </a>
              </h4>
            </div>
            <div id={"collapse" + recipe.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading" + recipe.id}>
              <div className="panel-body">
                <h4 className="text-center"> Ingredients</h4>
                <ul className="list-group">
                {
                  recipe.ingredients.split(',').map((ingredient,i) =>
                    <li className="list-group-item" key={i}>{ingredient}</li>
                  )
                }
                </ul>
              </div>
              <div className="panel-footer">
                <button type="button" className="btn btn-danger" onClick={() => actions.deleteRecipe(recipe.id)}>Delete</button>
                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#myModal">Edit</button>
              </div>
            </div>
          </div>

        )
      }
      </div>
      <div className="row">
        <div className="col-md-12">
          <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target="#myModal">Add Recipe</button>
        </div>
      </div>
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Add a Recipe</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="receipe">Recipe</label>
                  <input type="text" className="form-control" id="receipe" placeholder="Receipe Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients</label>
                  <input type="text" className="form-control" id="ingredients" placeholder="Enter Ingredients,Seperated,By Commas" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Add Recipe</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
      <p>♥ from the Zhenkyle</p>
      </div>
      </div>
    )
  }
}

App.propTypes = {
  recipes: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    recipes: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ReceipeActions, dispatch)
  }
}

let AppRecipe = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
// Main Program

// store
let store = createStore(recipes);

ReactDOM.render(
  <Provider store={store}>
    <AppRecipe />
  </Provider>,
  document.getElementById('root')
)
