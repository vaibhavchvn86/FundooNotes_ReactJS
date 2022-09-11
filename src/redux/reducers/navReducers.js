const intialState = {
    currentTitle  :  "Fundoo"
}

 const navReducer = (state =intialState,action) => {

    switch(action.type) {
        case   "Clicked_On_Notes" : 
        return  {
            ...state,currentTitle : "Fundoo"
        }
        case   "Clicked_On_Archive" : 
        return  {
            ...state,currentTitle : "Archive"
        }
        default : 
        return state
    }

}

export default navReducer