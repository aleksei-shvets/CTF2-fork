'use client'

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './cart.module.scss'
import Image from 'next/image';
import { getCartProducts } from '@/redux/cartSlice'
import clsx from 'clsx';
import IconCartWithBadge from '../IconCartWithBadge';
import IconCurrency from '../IconCurrency';

import iconPrice from '../../../public/icons-price.svg';

const Cart: FC = () => {
  const addedProducts = useSelector(getCartProducts);
  const productCount = addedProducts.length;
  const [isOpenCart, setIsOpenCart] = useState(false)

  const handleIsOpenCart = () => setIsOpenCart(!isOpenCart);

  return (
    <div className={clsx(styles.cartBox, isOpenCart ? styles.cartBox_open : styles.cartBox_closed)}>
      <div>
        <div className={clsx(styles.balanceBox, isOpenCart && styles.balanceBox_openCartBorder)}>
          <button
            type="button"
            className={styles.balanceBtn}
            onClick={() => handleIsOpenCart()}
          >
            <div className={styles.title}>
              <p>Balance</p>
              <div className={styles.balanceCount}>
                <span>14.256</span>
                <Image src={iconPrice} alt="iconPrice" width={20} height={20} />
              </div>
            </div>

            <div className={styles.iconBox}>
              <div className={clsx(styles.currencyIcon, isOpenCart ? styles.currencyIcon_visible : styles.currencyIcon_hidden)}>
                <IconCurrency />
              </div>
            </div>
          </button>
        </div>
        <div className={clsx(styles.cart)}>
          <div className={styles.cartButtons}>
            <div className={styles.btnBorder}>
              <button className={styles.cartBtn} type="button">
                Сonclusion
              </button>
            </div>
            <div className={styles.btnBorder}>
              <button className={styles.cartBtn} type="button">
                Replenish
              </button>
            </div>
          </div>
        </div>
      </div>
      <IconCartWithBadge
        iconClass={clsx(styles.cartColor, !isOpenCart && styles.cartColor_closedCart)}
        backgroundClass={styles.openCartBg}
        productCount={productCount}
      />
    </div>
  );
};

export default Cart;
