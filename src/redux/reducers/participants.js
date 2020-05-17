
const participants = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return [
        ...state,
        {
          participantId: action.participantId,
          name: action.name,
          email: action.email,
          phone: action.phone
        }
      ]
    case 'LOAD_DATA':
      return state;
    case 'DELETE_PARTICIPANT':
      return state.filter(function (el) {
        return el.participantId !== action.participantId;
      });
    default:
      return state
  }
}

export default participants