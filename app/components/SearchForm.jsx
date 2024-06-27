import React from 'react';
import {PredictiveSearchForm, PredictiveSearchResults} from './Search';

export function SearchForm() {
  return (
    <div id="search-aside">
      <div className="predictive-search-container">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <>
              <div className="input-search-container">
                <input
                  className="input-search"
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="Search"
                  ref={inputRef}
                  type="search"
                />
              </div>
            </>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </div>
  );
}

export default SearchForm;
