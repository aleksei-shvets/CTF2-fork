'use client'

import { Badge } from 'antd';
import Image from 'next/image';
import React from 'react';
import styles from './user-item.module.scss';
import avatar from '../../../public/avatar.png';
import { useTranslations } from "next-intl";

function UserChatItem() {

  const t = useTranslations('translation')

  return (
    <div className={styles.userItem}>
      <div className={styles.item}>
        <Image src={avatar} alt="avatar" />
        <div className={styles.userText}>
          <span>Root</span>
          <p>
            {t('chatGreeting')}
          </p>
        </div>
      </div>
      <span className={styles.sendedAt}>16:50</span>
      <div style={{ position: 'absolute', right: '14px', top: '35px' }}>
        <Badge style={{ border: 'none' }} color="#00B2FF" count={5} />
      </div>
      <div className={styles.downLine}></div>
    </div>
  );
}

export default UserChatItem;
