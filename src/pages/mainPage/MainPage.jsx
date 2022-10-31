
import Layout from '../../components/common/layout/Layout';
import Option from '../../components/option/Option';
import Room from '../chatPage/room/Room';
import React from 'react';

export default function MainPage() {
  return (
    <Layout>
      <Option/>
      <div className={styles.container}>
      </div>
    </Layout>
  );
}
