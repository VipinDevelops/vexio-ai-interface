'use client';
import { Container } from '../components/Container/Container';
import { Outlet } from 'react-router-dom';
import dynamic from 'next/dynamic';

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});
