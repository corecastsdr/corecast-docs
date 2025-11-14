// src/components/HomepageFeatures/index.tsx

import React, { JSX } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

// --- THIS IS YOUR NEW, CUSTOM CONTENT ---
// It does NOT import any missing SVG files.
const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Self-Host',
    description: (
      <>
        Built with Docker and a secure SOCKS proxy tunnel, allowing you to
        connect your SDR from anywhere, even behind a firewall.
      </>
    ),
  },
  {
    title: 'Scalable by Design',
    description: (
      <>
        Uses a Controller/Worker architecture. A single SDR source can be
        scaled across multiple worker containers to support hundreds of users.
      </>
    ),
  },
  {
    title: 'Modern & Fast',
    description: (
      <>
        A powerful GNU Radio backend serves a real-time React
        front-end using low-latency WebSockets for audio and waterfall data.
      </>
    ),
  },
];

// --- This is the component logic ---

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
