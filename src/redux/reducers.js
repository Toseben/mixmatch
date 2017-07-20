const initialState = {
  bottom: 0,
  middle: 0,
  top: 0,
  bottomStyle: 0,
  middleStyle: 0,
  topStyle: 0
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

    case 'SET_STYLE':
      if (action.row === 'bottomStyle') {
        return Object.assign({}, state, {
          bottomStyle: action.id
        })
      }

      if (action.row === 'middleStyle') {
        return Object.assign({}, state, {
          middleStyle: action.id
        })
      }

      if (action.row === 'topStyle') {
        return Object.assign({}, state, {
          topStyle: action.id
        })
      }
      break;

    default:
      return state

  }
}
