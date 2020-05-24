
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
    case 'UPDATE_PARTICIPANT':
      var foundIndex = state.findIndex(x => x.participantId === action.participant.participantId);
      state[foundIndex] =  {
        participantId: action.participant.participantId,
        name: action.participant.name,
        email: action.participant.email,
        phone: Number(action.participant.phone)
      };
      return state;
    default:
      return state;
  }
}

export default participants