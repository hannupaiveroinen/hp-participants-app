
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
    default:
      return state
  }
}

export default participants