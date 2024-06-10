'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './layout.module.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import News from '@/components/News';

// import backgroundImage from '@/main-bg.png';
import backgroundImage from '../../public/background.jpg';
import UserInfo from '@/components/UserInfo';
import { usePathname } from 'next/navigation';

// import { StyleProvider } from '@ant-design/cssinjs';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  return (
    <>
      <div className="bgWrap">
        <Image
          src={backgroundImage}
          alt="Background Image"
          layout="fill"
          priority
          placeholder="blur"
          quality={100}
        />
      </div>
      {/* <div className={styles.center}> */}
      <div className={styles.wrapper}>
        <Header />
        <UserInfo />
        {path === '/' && <News />}

        <main className={styles.main}>{children}</main>
      </div>
      {/* </div> */}
    </>
  );
};

export default HomeLayout;
