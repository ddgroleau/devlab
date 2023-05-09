"use client";

import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppSelect from '@/components/AppSelect';
import QuestionTag from '@/components/QuestionTag';
import StyledLink from '@/components/StyledLink';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useGetTags } from '@/hooks/query';
import Tag from '@/models/Tag';
import Toast, { ToastMessage } from '@/components/Toast';
import {useRouter, useSearchParams} from 'next/navigation';
import ErrorCodes from '@/models/ErrorCodes';
import SelectOption from "@/models/SelectOption";


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

  const router = useRouter();
  const params = useSearchParams();

  useEffect(()=>{
    if(!params.get("error")) return;
    setToasts([{ id: Date.now(), success: false, message: ErrorCodes[params.get("error") as keyof typeof ErrorCodes] }]);
    return () => setToasts([]);
  },[params]);

  return (
    <>
      <section>
        <h1>devLab</h1>
        <h2>The fun and effective study game for software engineers</h2>
        <div className='btn-container'>
          <StyledLink href="/game?difficulty=3&category=1&questionCount=5&tags=">
                    try it out
          </StyledLink>
        </div>
        <p className='prompt'>...or use the form below to setup your own game!</p>
        <hr/>
      </section>
      <section>
        <h3 ref={instructionsRef}>How to play</h3>
        <p>
            Choose the <strong>difficulty</strong>, <strong>category</strong> and
            &nbsp;<strong>number of the questions</strong> from the
            form below. You can filter the question set further by selecting
            &nbsp;<strong>tags</strong>.
            Click <strong>begin</strong> to start your game!
        </p>
      </section>
      <form action={'/game'} method="GET">
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
          <div className="tags-container">
            <label>Tags</label>
            <div className='tags'>
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
        <input type="hidden" name="tags" value={`${selectedTags.join(",")}`}/>
        <div className='submit-btn-container'>
          <AppButton type="submit" onClick={()=>{}}>
                begin
          </AppButton>
        </div>
      </form>
      <style jsx>
        {`
                    h1 {
                        margin-top: 1rem;
                    }
                    .btn-container {
                        margin-block: 2rem;
                        width: 100%;
                    }
                    .prompt {
                        margin-block: 1rem;
                        font-size: 1rem;
                        font-style: italic;
                    }
                    .submit-btn-container {
                        margin-block: 1.5rem 3rem;
                        width: 100%;
                    }
                    form {
                        display:flex;
                        flex-flow: row wrap;
                        gap: 1rem;
                        margin-top: 2rem;
                    }
                    .tags-container {
                        width: 100%;
                        display: flex;
                        flex-direction:column;
                        gap: 0.25rem;
                    }
                    .tags {
                        display:flex;
                        flex-flow: row wrap;
                        gap: 0.5rem;
                    }
                    p {
                        max-width: 60rem;
                    }
                    form:focus {
                        outline: solid red 1px;
                    }
                `}
      </style>
      <Toast messages={toasts} />
    </>
  );
};

export default Home;
