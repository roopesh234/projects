import { render, screen } from "@testing-library/react";
import { Application } from "./application";

describe("application", () => {
    test('render correctly', () => {
        render(<Application />)
        const nameElement = screen.getByRole("textbox")
        expect(nameElement).toBeInTheDocument()

        const jobLocationElemet = screen.getByRole("combobox")
        expect(jobLocationElemet).toBeInTheDocument()
    })

    
})