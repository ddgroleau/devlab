"use client";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import QuestionTag from "@/components/QuestionTag";
import {FormEvent, MutableRefObject, useRef, useState} from "react";
import { useGetTags } from "@/hooks/query";
import Tag from "@/models/Tag";
import SelectOption from "@/models/SelectOption";
import {H1, H2, H3, HR, Label, P} from "@/components/Typography";
import {useRouter} from "next/navigation";

type HomeProps = {
    difficulties:SelectOption[];
    categories:SelectOption[];
}

const Home = ({difficulties,categories}:HomeProps) => {
    const router = useRouter();
    const difficultyRef:MutableRefObject<any> = useRef();
    const categoryRef:MutableRefObject<any> = useRef();
    const numberQuestionsRef:MutableRefObject<any> = useRef();

    const [selectedTags,setSelectedTags] = useState<string[]>([]);
    const {data:tags} = useGetTags(
        categoryRef.current && categoryRef.current.value,difficultyRef.current && difficultyRef.current.value);

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.append("difficulty",difficultyRef.current.value);
        searchParams.append("category",categoryRef.current.value);
        searchParams.append("questionCount",numberQuestionsRef.current.value);
        searchParams.append("tags",`${selectedTags.join(",")}`);
        router.push("/game?" + searchParams.toString());
    };

    return (
        <>
            <section>
                <H1 className="mt-4">devLab</H1>
                <H2>The fun and effective study game for software engineers</H2>
            </section>
            <HR/>
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
            <form className="flex flex-row flex-wrap gap-4 mt-8" onSubmit={handleSubmit}>
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
                        <div className="flex flex-row flex-wrap gap-2">
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
                <div className="mt-6 mb-12 w-full">
                    <AppButton type="submit" onClick={()=>{}}>
                begin
                    </AppButton>
                </div>
            </form>
        </>
    );
};

export default Home;
