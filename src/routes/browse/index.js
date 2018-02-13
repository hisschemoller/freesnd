import React from 'react';
import Layout from '../../components/base/Layout/Layout';
import Browse from '../../components/templates/Browse/Browse';

async function action() {
  return {
    chunks: ['browse'],
    title: 'Browse',
    description: 'Browse the Freesound.org database for new sounds.',
    component: (
      <Layout>
        <Browse />
      </Layout>
    )
  };
}

export default action;
