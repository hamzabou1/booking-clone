import { createContext } from "react"
import { useReducer } from "react"
import { useEffect } from "react"


// etat initial 
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  };

export const AuthContext = createContext(INITIAL_STATE) /// la on creer le context API pour l'etat initial  


const AuthReducer = ( state , action ) => {

    switch(action.type) {

        case "LOGIN_START" : 
            return {
                user : null , 
                loading : true , 
                error : false
            };
            
        case "LOGIN_SUCCESS" : 
        return {
            user : action.payload , 
            loading : false , 
            error : false
        };
        
        case "LOGIN_FAILURE" : 
            return {
                user : null , 
                loading : false , 
                error : true
            };

        case "LOGOUT"  : 
        return {
                user : null ,
                loading : false ,
                error : false
        }
        default:
            return state;
    }

}

/// le fournisseur avec childrens sont les composants qu'on va appliquer sur les qulles ce context dans ce cas la tout le projet 

export const AuthContextProvider = ({children}) => {

    const [state ,dispatch] = useReducer(AuthReducer, INITIAL_STATE) ;
    useEffect(() => {
        localStorage.setItem('user' , JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user:state.user ,
                loading: state.loading , 
                error : state.errorn,
                dispatch , 
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};

