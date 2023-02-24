import React, { useState } from 'react';
import image from '../../../../theme/image';
import style from './SearchBar.module.scss';
import { DUMMY_LIST } from '../../../../assets/mockDataString';

const SearchBar: React.FC<{}> = () => {
  const [search, setSearch] = useState<string>('');

  const [showRecentSearch, setShowRecentSearch] = useState<boolean>(false);

  const renderSearchList = (items: string[]) =>
    items.map((item) => {
      return (
        <li>
          <a>
            <img src={image.searchIcon} alt="search-icon" />
            {item}
          </a>
        </li>
      );
    });

  const filteredItem = DUMMY_LIST.filter((item) =>
    item.match(new RegExp(search, 'i'))
  );

  const searchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSearch = (searchItem: any) => {};

  const handleOnFocus = () => {
    setShowRecentSearch(true);
  };

  const handleOnBlur = () => {
    setShowRecentSearch(false);
  };

  return (
    <div className={style.navbarSearchbox}>
      <div className={style.searchboxDropdownOpen}>
        <div className={style.searchboxInput}>
          <div
            className={
              showRecentSearch
                ? `${style.formControl} ${style.formControlOpen} `
                : `${style.formControl} ${style.formControlClose}`
            }
          >
            <input
              value={search}
              onChange={searchValue}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              type="search"
              className={style.searchboxMain}
              placeholder="Caută după denumirea produsului"
              autoComplete="off"
            />
            <div>
              <button onClick={onSearch} className={style.searchBarButton}>
                <img src={image.searchIcon} alt="search-icon" />
              </button>
            </div>
          </div>
        </div>
        {showRecentSearch && (
          <div className={style.searchboxDropdown}>
            <p>
              <strong className={style.recentSearch}>Căutări recente</strong>
            </p>

            <ul className={`${style.nav} ${style.navSearchbox}`}>
              {renderSearchList(filteredItem)}
              {filteredItem.length === 0 && (
                <li className={style.noResults}>Nici un rezultat</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
