import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X, Pill } from 'lucide-react';
import { Drug } from '../types';
import { searchDrugs } from '../data/mockData';
import { useDrugContext } from '../context/DrugContext';

const DrugSearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { state, addDrug, removeDrug, clearDrugs } = useDrugContext();

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchDrugs(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectDrug(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectDrug = (drug: Drug) => {
    addDrug(drug);
    setSearchQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleRemoveDrug = (drugId: string) => {
    removeDrug(drugId);
  };

  return (
    <div className="card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Medications
          </h2>
          {state.selectedDrugs.length > 0 && (
            <button
              onClick={clearDrugs}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              placeholder="Search for medications..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div
              ref={resultsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {searchResults.map((drug, index) => (
                <button
                  key={drug.id}
                  onClick={() => handleSelectDrug(drug)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                    index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Pill className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{drug.name}</div>
                      <div className="text-sm text-gray-500">
                        {drug.genericName}
                        {drug.brandNames.length > 0 && (
                          <span className="ml-2">
                            ({drug.brandNames.slice(0, 2).join(', ')})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <div className="text-center text-gray-500">
                <Pill className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No medications found for "{searchQuery}"</p>
                <p className="text-sm mt-1">Try searching by generic or brand name</p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Drugs */}
        {state.selectedDrugs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              Selected Medications ({state.selectedDrugs.length})
            </h3>
            <div className="space-y-2">
              {state.selectedDrugs.map((drug) => (
                <div
                  key={drug.id}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Pill className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">{drug.name}</div>
                      <div className="text-sm text-blue-700">{drug.genericName}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveDrug(drug.id)}
                    className="p-1 text-blue-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove medication"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            How to use:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search and add 2 or more medications</li>
            <li>• View interaction warnings and explanations</li>
            <li>• Get alternative medication suggestions</li>
            <li>• Always consult your healthcare provider</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrugSearchForm;