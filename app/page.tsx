import Home from "@/components/Home";
import Difficulty from "@/models/Difficulty";
import Category from "@/models/Category";
import SelectOption from "@/models/SelectOption";

const getData = async () => {
    const baseApiUri:string = process.env.NEXT_PUBLIC_API_URI || "";
  
    let diffSelectOptions:SelectOption[] = [];
    let categorySelectOptions:SelectOption[] = [];

    await Promise.all([
        fetch(baseApiUri + "/api/questions/categories",{ next: { revalidate: 120 } })
            .then(categoryResponse => {
                return categoryResponse.status === 200 ? categoryResponse.json() : [];
            })
            .then((categories:Category[])=> {
                return categorySelectOptions = categories.map(c =>
                    JSON.parse(JSON.stringify(SelectOption.create(c.id.toString(), c.displayText))));
            }),

        fetch(baseApiUri + "/api/questions/difficulties", { next: { revalidate: 120 } })
            .then(diffResponse =>{
                return diffResponse.status === 200 ? diffResponse.json() : [];
            })
            .then((difficulties:Difficulty[])=> {
                return diffSelectOptions = difficulties.map(d => {
                    return JSON.parse(JSON.stringify(SelectOption.create(d.id.toString(), d.displayText)));
                });
            })
    ]);

    return {
        difficulties: diffSelectOptions,
        categories: categorySelectOptions
    };
};

const HomePage = async () => {
    const { difficulties, categories} = await getData();
    return (
        <Home categories={categories} difficulties={difficulties} />
    );
};

export default HomePage;
