import StyledLink from '@/components/StyledLink';
import { useRouter } from 'next/navigation';
import React from 'react';

const Score = () => {
  const router = useRouter();
  return (
    <section className='container'>
      <h1>You scored {router.query.correct}/{router.query.total}!</h1>
      <StyledLink href="/">Play Again</StyledLink>
      <style jsx>
        {`
                    .container {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        align-items:center;
                        gap: 2rem;
                        margin-block: 2rem;
                    }
                `}
      </style>
    </section>
  );

};

export default Score;