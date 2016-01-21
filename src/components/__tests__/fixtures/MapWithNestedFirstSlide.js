import Base from './MapBase';

const fixture = () => [
  {
    index: 0,
    name: 'star-wars',
    children: [
      {
        index: 0,
        name: 'episode-4'
      },
      {
        index: 1,
        name: 'episode-5'
      }
    ]
  },
].concat(Base());

export default fixture;
