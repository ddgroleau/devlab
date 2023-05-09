import Home from "@/components/Home";
import Difficulty from "@/models/Difficulty";
import Category from "@/models/Category";
import SelectOption from "@/models/SelectOption";

const getData = async () => {
  const baseApiUri:string = process.env.NEXT_PUBLIC_API_URI || "";

  const categoryResponse = await fetch(baseApiUri + "/api/questions/categories",{ next: { revalidate: 120 } });
  const categories:Category[] = categoryResponse.status === 200 ? await categoryResponse.json() : [];
  const categorySelectOptions = categories.map(c =>
      JSON.parse(JSON.stringify(SelectOption.create(c.id.toString(),c.displayText))));

    const diffResponse = await fetch(baseApiUri + "/api/questions/difficulties", { next: { revalidate: 120 } });
    const difficulties:Difficulty[] = diffResponse.status === 200 ? await diffResponse.json() : [];
    const diffSelectOptions = difficulties.map(d =>
        JSON.parse(JSON.stringify(SelectOption.create(d.id.toString(),d.displayText))));

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
