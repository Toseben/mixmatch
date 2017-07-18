const initialState = {
  bottom: 0,
  middle: 0,
  top: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_GEOMETRY':
      if (action.row === 'bottom') {
        return Object.assign({}, state, {
          bottom: action.id
        })
      }

      if (action.row === 'middle') {
        return Object.assign({}, state, {
          middle: action.id
        })
      }

      if (action.row === 'top') {
        return Object.assign({}, state, {
          top: action.id
        })
      }

      break;

    default:
      return state

  }
}
