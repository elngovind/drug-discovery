import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Drug, Interaction } from '../types';
import { checkInteractions } from '../data/mockData';

interface DrugState {
  selectedDrugs: Drug[];
  interactions: Interaction[];
  isLoading: boolean;
  error: string | null;
}

type DrugAction =
  | { type: 'ADD_DRUG'; payload: Drug }
  | { type: 'REMOVE_DRUG'; payload: string }
  | { type: 'CLEAR_DRUGS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_INTERACTIONS'; payload: Interaction[] };

const initialState: DrugState = {
  selectedDrugs: [],
  interactions: [],
  isLoading: false,
  error: null,
};

const DrugContext = createContext<{
  state: DrugState;
  dispatch: React.Dispatch<DrugAction>;
  addDrug: (drug: Drug) => void;
  removeDrug: (drugId: string) => void;
  clearDrugs: () => void;
} | null>(null);

function drugReducer(state: DrugState, action: DrugAction): DrugState {
  switch (action.type) {
    case 'ADD_DRUG':
      // Don't add if already exists
      if (state.selectedDrugs.some(drug => drug.id === action.payload.id)) {
        return state;
      }
      const newDrugs = [...state.selectedDrugs, action.payload];
      const newInteractions = checkInteractions(newDrugs);
      return {
        ...state,
        selectedDrugs: newDrugs,
        interactions: newInteractions,
        error: null,
      };

    case 'REMOVE_DRUG':
      const filteredDrugs = state.selectedDrugs.filter(drug => drug.id !== action.payload);
      const updatedInteractions = checkInteractions(filteredDrugs);
      return {
        ...state,
        selectedDrugs: filteredDrugs,
        interactions: updatedInteractions,
      };

    case 'CLEAR_DRUGS':
      return {
        ...state,
        selectedDrugs: [],
        interactions: [],
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'UPDATE_INTERACTIONS':
      return {
        ...state,
        interactions: action.payload,
      };

    default:
      return state;
  }
}

export function DrugProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(drugReducer, initialState);

  const addDrug = (drug: Drug) => {
    dispatch({ type: 'ADD_DRUG', payload: drug });
  };

  const removeDrug = (drugId: string) => {
    dispatch({ type: 'REMOVE_DRUG', payload: drugId });
  };

  const clearDrugs = () => {
    dispatch({ type: 'CLEAR_DRUGS' });
  };

  return (
    <DrugContext.Provider value={{ state, dispatch, addDrug, removeDrug, clearDrugs }}>
      {children}
    </DrugContext.Provider>
  );
}

export function useDrugContext() {
  const context = useContext(DrugContext);
  if (!context) {
    throw new Error('useDrugContext must be used within a DrugProvider');
  }
  return context;
}