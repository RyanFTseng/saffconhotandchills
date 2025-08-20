//returns collision information
import { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { Ticker } from 'pixi.js';

const ChillsContext = createContext()

export const useChillsConst = () => useContext(ChillsContext)

//returns new state based on user actions

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COLLISIONS':
            return {
                ...state,
                collisions: action.collisions
            };
        default:
            return state;
    }
};

const initialState = {
    collisions: [],
};

function checkCollision(sprite1, sprite2) {
    if (!sprite1 || !sprite2) return false;

    try {
        const bounds1 = sprite1.getBounds();
        const bounds2 = sprite2.getBounds();

        return bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y;
    } catch (error) {
        console.warn('Error in collision detection:', error);
        return false;
    }
}

export const ChillsProvider = ({children}) => {
     
    
    return <ChillsContext>
        {children}
    </ChillsContext>
}