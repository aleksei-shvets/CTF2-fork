'use client';

import clsx from 'clsx';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import styles from './marketFilter.module.scss';
import profileAvatar from '../../../public/profile.svg';
import Image from 'next/image';
import accauntIcon from '../../../public/Account.svg';
import settingsIcon from '../../../public/settings-1.svg';
import plusIcon from '../../../public/plus.svg';
import minusIcon from '../../../public/minus.svg';
import { Badge, Menu } from 'antd';
import type { InputNumberProps } from 'antd';
import { Flex, Col, Row, Input, InputNumber, Slider, Space, Checkbox, Button, Dropdown } from 'antd';
import steamIcon from '../../../public/steam-icon.svg';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import avatar from '../../../public/avatar.png';
import UserChatItem from '../UserChatItem';
import loopIcon from '../../../public/loop-chat-icon.svg';
import copy from '../../../public/copy.svg';
import LogOutIcon from '../../../public/logout.svg';
import tgIcon from '@/Telegram.png';
import vcIcon from '@/Vk.png';
import youtubeIcon from '@/youtube.png';
import checkedIcon from '@/checked-icon.svg';
import { setStateFilters, getFilters } from '@/redux/marketFilterSlice';
import { useDispatch } from 'react-redux';

const marketFilter: FC = () => {
  const dispatch = useDispatch();
  const path = usePathname();
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    about15min: false,
    instantly: false,
    colors: [],
  });
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <li rel="noopener noreferrer">
          Yelow
        </li>
      ),
    },
    {
      key: '2',
      label: (
        <li rel="noopener noreferrer">
          Red
        </li>
      ),
    },
    {
      key: '3',
      label: (
        <li rel="noopener noreferrer" >
          Green
        </li>
      ),
    },
    {
      key: '4',
      label: (
        <li rel="noopener noreferrer" >
          Extra Red
        </li>
      ),
    },
    {
      key: '5',
      label: (
        <li rel="noopener noreferrer" >
          Tiger Color
        </li>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setStateFilters(filters));
  }, [filters]);

  const onChangeStart = (value: number[]) => {
    const [min, max] = Array.isArray(value) ? value : [value, value];

    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      minPrice: min,
      maxPrice: max,
    }));
  };

  /* const onChangeComplete = (value: number | number[]) => {
    const maxPrice = Array.isArray(value) ? value[0] : value;
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      maxPrice: maxPrice,
    }))
  };
 */
  const onChangeInputStart = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      minPrice: Number(value),
    }));
  };

  const onChangeInputComplete = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      maxPrice: Number(value),
    }));
  };

  const checkedAbout = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.checked;
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      about15min: checkedValue,
    }));
  };

  const checkedInstantly = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.checked;
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      instantly: checkedValue,
    }));
  };

  const handleClearPrice = () => {
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      minPrice: 0,
      maxPrice: 2000,
    }));
  }

  const handleResetCheckboxes = () => {
    setFilters((prevFilters: typeof filters) => ({
      ...prevFilters,
      about15min: false,
      instantly: false,
    }));
  }

  return (
      <aside className={clsx(styles.filterContainer, isActiveFilters && styles.filterContainer_active)}>
        <button
          onClick={() => setIsActiveFilters(!isActiveFilters)}
          type="button"
          className={clsx(
            styles.titleBorder,
            isActiveFilters && styles.titleBorder__active,
          )}>
          <div
            className={clsx(
              styles.filterTitle,
              isActiveFilters && styles.filterTitle__active,
            )}>
            <h3>FILTER</h3>
          </div>
        </button>
        <div
          className={clsx(
            styles.filters,
            isActiveFilters && styles.filters__active,
          )}>
          <div className={styles.filterBox}>
            <div className={styles.resetBtn}>
              <button
                type="button"
                onClick={() => handleClearPrice()}
              >
                <span>Price</span>
                <span className={styles.minusSymbol}>{filters.minPrice > 0 || filters.maxPrice < 2000 ? '-' : ''}</span>
              </button>
            </div>

            <div className={styles.sliderInputsBox}>
              <Input
                value={filters.minPrice}
                onChange={onChangeInputStart}
                className={clsx(styles.filterInput, styles.antInputNumber)}
              />
              <b>-</b>
              <Input
                value={filters.maxPrice}
                onChange={onChangeInputComplete}
                className={clsx(styles.filterInput, styles.antInputNumber)}
              />
            </div>

            <div className={styles.sliderBox}>
            <Slider
              styles={{
                track: {
                  background: '#1886D0',
                  border: '1px',
                },
                rail: {
                  background: '#d9d9d9',
                },
              }}
              range
              step={1}
              min={50}
              max={2000}
              defaultValue={[2000, 2000]}
              onChange={onChangeStart}
              value={[filters.minPrice, filters.maxPrice]}
            />
            </div>

            <div className={styles.resetBtn}>
              <button
                type="button"
                onClick={() => handleResetCheckboxes()}
              >
                <span>Delivery speed</span>
                <span className={styles.minusSymbol}>{filters.about15min || filters.instantly ? '-' : ''}</span>
              </button>
            </div>

            <div className={styles.checkboxContainer}>
              <label htmlFor="instantly" className={styles.customCheckbox}>
                <input
                  checked={filters.instantly}
                  onChange={checkedInstantly}
                  name="instantly"
                  type="checkbox"
                  id="instantly"
                  className={styles.hiddenCheckbox}
                />
                <div className={styles.checkbox}>
                  <Image className={styles.checkedIcon} src={checkedIcon} alt="checkedIcon" />
                </div>
                <span>Instantly</span>
              </label>
              <label htmlFor="delayed" className={styles.customCheckbox}>
                <input
                  checked={filters.about15min}
                  onChange={checkedAbout}
                  name="delayed"
                  type="checkbox"
                  id="delayed"
                  className={styles.hiddenCheckbox}
                />
                <div className={styles.checkbox}>
                  <Image className={styles.checkedIcon} src={checkedIcon} alt="checkedIcon" />
                </div>
                <span>About 15 min.</span>
              </label>
            </div>

            <div className={styles.dropdownBox}>
              <Dropdown
                className={styles.colorList}
                menu={{ items }}
                placement="bottomLeft"
                arrow
                trigger={['click']}
              >
              <Button>
                <span className={styles.btnName}>Color</span>
                <span className={styles.plusSymbol}>+</span>
              </Button>
              </Dropdown>
              {/* <div id="colorList" className={styles.colorList}>
                    <span className={styles.btnName}>Color</span>
                    <span className={styles.plusSymbol}>+</span>
                  </div> */}
            </div>

            <div className={styles.dropdownBox}>
              <div id="colorList" className={styles.colorList}>
                <span className={styles.btnName}>Rarity</span>
                <span className={styles.plusSymbol}>+</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
  )
};

export default marketFilter;
