import StyledLink from "@/components/StyledLink";
import React from "react";
import {H1} from "@/components/Typography";

const ScorePage = ({searchParams:{correct,total}}:{searchParams:{correct:string,total:string}}) => {
    return (
        <section className="flex flex-col w-full items-center gap-8 my-8">
            <H1>You scored {correct}/{total}!</H1>
            <StyledLink href="/">Play Again</StyledLink>
        </section>
    );
};

export default ScorePage;