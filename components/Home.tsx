"use client";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import QuestionTag from "@/components/QuestionTag";
import {createRef, FormEvent, MutableRefObject, useContext, useRef, useState} from "react";
import { useGetTags } from "@/hooks/query";
import Tag from "@/models/Tag";
import SelectOption from "@/models/SelectOption";
import {H1, H2, H3, H4, HR, Label, P} from "@/components/Typography";
import {useRouter} from "next/navigation";
import AppCheckbox from "@/components/AppCheckbox";
import {BaseContext} from "@/context/BaseProvider";
import {ServerResponses} from "@/models/ServerResponses";

type HomeProps = {
    difficulties:SelectOption[];
    categories:SelectOption[];
}

const Home = ({difficulties,categories}:HomeProps) => {
    const {setToasts} = useContext(BaseContext);
    const router = useRouter();
    const difficultyRef:MutableRefObject<any> = useRef();
    const numberQuestionsRef:MutableRefObject<any> = useRef();

    const [selectedTags,setSelectedTags] = useState<string[]>([]);
    const {data:tags} = useGetTags(
        "1",difficultyRef.current && difficultyRef.current.value);

    const categoryRefs = useRef(categories.map(() => createRef() as MutableRefObject<HTMLInputElement>));

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        const categoryIds=  categoryRefs.current.map((r,i) =>
        { if(r.current.checked) return categories[i].value; }).filter(c => c).join(",");

        if(!categoryIds) return setToasts([{success:false,message:ServerResponses.NoCategorySelected}]);

        searchParams.append("difficulty",difficultyRef.current.value);
        searchParams.append("categories",categoryIds);
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
            <form className="flex flex-col mt-8 gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-row flex-wrap gap-4">
                    <AppSelect
                        id="difficulty"
                        name="difficulty"
                        label="difficulty"
                        selectRef={difficultyRef}
                        options={difficulties}
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
                </div>
                <div>
                    <H4>Categories</H4>
                    <div className="flex flex-wrap gap-4 max-w-xl mt-2">
                        {categories.map((c,i)=> {
                            return <AppCheckbox
                                key={i}
                                id={c.value.toString()}
                                label={c.innerText}
                                type="checkbox"
                                inputRef={categoryRefs.current[i]}
                            />;
                        })}
                    </div>
                </div>
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
                <div className="mt-4 mb-12 w-full">
                    <AppButton type="submit" onClick={()=>{}}>
                begin
                    </AppButton>
                </div>
            </form>
        </>
    );
};

export default Home;
