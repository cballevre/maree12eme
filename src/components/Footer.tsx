import { Divider } from '@cballevre/kiwi-ui';

const Footer = () => {
  return (
    <footer className="mt-8">
      <Divider />
      <p>
        Crée par{' '}
        <a
          className="text-black text-bold underline"
          href="https://www.cballevre.net"
        >
          Célestin Ballèvre
        </a>
      </p>
    </footer>
  );
};

export { Footer };
