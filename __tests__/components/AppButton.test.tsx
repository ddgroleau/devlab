import {render} from "@testing-library/react";
import AppButton from "@/components/AppButton";

describe("AppButton",()=> {
    it("renders with props", ()=> {
        const handleClick = jest.fn();
        const { getByText } = render(<AppButton type={"button"} onClick={handleClick}>TestButton</AppButton>);

        expect(getByText("TestButton")).toBeInTheDocument();
    });
});