"use client";

import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import QuestionTag from "@/components/QuestionTag";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useGetTags } from "@/hooks/query";
import Tag from "@/models/Tag";
import Toast, { ToastMessage } from "@/components/Toast";
import {useRouter, useSearchParams} from "next/navigation";
import ErrorCodes from "@/models/ErrorCodes";
import SelectOption from "@/models/SelectOption";
import Divider from "@/components/Divider";
import {H1, H2, H3, Label, P, Span} from "@/components/Typography";

type HomeProps = {
    difficulties:SelectOption[];
    categories:SelectOption[];
}

const Home = ({difficulties,categories}:HomeProps) => {
    const instructionsRef:MutableRefObject<any> = useRef();
    const difficultyRef:MutableRefObject<any> = useRef();
    const categoryRef:MutableRefObject<any> = useRef();
    const numberQuestionsRef:MutableRefObject<any> = useRef();

    const [selectedTags,setSelectedTags] = useState<string[]>([]);
    const [toasts,setToasts] = useState<ToastMessage[]>([]);
    const {data:tags,isLoading:isFetchingTags} = useGetTags(
        categoryRef.current && categoryRef.current.value,difficultyRef.current && difficultyRef.current.value);

    const params = useSearchParams();

    useEffect(()=>{
        if(!params.get("error")) return;
        setToasts([{ id: Date.now(), success: false, 
            message: ErrorCodes[params.get("error") as keyof typeof ErrorCodes] }]);
        return () => setToasts([]);
    },[params]);

    return (
        <>
            <section>
                <H1 className="mt-4">devLab</H1>
                <H2>The fun and effective study game for software engineers</H2>
            </section>
            <Divider/>
            <section>
                <H3>How to play</H3>
                <P className="max-w-5xl">
            Choose the <strong>difficulty</strong>, <strong>category</strong> and
            &nbsp;<strong>number of the questions</strong> from the
            form below. You can filter the question set further by selecting
            &nbsp;<strong>tags</strong>.
            Click <strong>begin</strong> to start your game!
                </P>
            </section>
            <form className="flex flex-row flex-wrap gap-4 mt-8" action={"/game"} method="GET">
                <AppSelect
                    id="difficulty"
                    name="difficulty"
                    label="difficulty"
                    selectRef={difficultyRef}
                    options={difficulties}
                    required
                />
                <AppSelect
                    id="category"
                    name="category"
                    label="category"
                    selectRef={categoryRef}
                    options={categories}
                    required
                />
                <AppInput
                    id="questionCount"
                    name="questionCount"
                    label="# of Questions"
                    type="number"
                    inputRef={numberQuestionsRef}
                    required
                />
                {!tags || tags.length <= 0 ? "" :
                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="tags">Tags</Label>
                        <div className='flex flex-row flex-wrap gap-2'>
                            {tags.map((tag:Tag,index:number)=> {
                                return (
                                    <QuestionTag
                                        innerText={tag.displayText}
                                        value={tag.value}
                                        setSelectedTags={setSelectedTags}
                                        selectedTags={selectedTags}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                }
                <input type="hidden" id="tags" name="tags" value={`${selectedTags.join(",")}`}/>
                <div className='mt-6 mb-12 w-full'>
                    <AppButton type="submit" onClick={()=>{}}>
                begin
                    </AppButton>
                </div>
            </form>
            <Toast messages={toasts} />
        </>
    );
};

export default Home;
