import Layout from '@/components/Layout';
import StyledLink from '@/components/StyledLink';
import { useRouter } from 'next/router';
import React from 'react';

const Score = () => {
    const router = useRouter();
    return (
        <Layout pageTitle='Your Score'>
            <section className='container'>
                <h1>You scored {router.query.correct}/{router.query.total}!</h1>
                <StyledLink href="/">Play Again</StyledLink>
            </section>
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
        </Layout>
    );

};

export default Score;