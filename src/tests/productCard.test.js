import { render, screen, waitFor } from "@testing-library/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        title: "MacBook Pro",
        description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
        price: 1749,
        thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png"
    }
}

describe("product card", () => {
    test("renderiza o loading", async () => {

        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard />)
        //screen.logTestingPlaygroundURL()
        const loadging = screen.getByText(/loading\.\.\./i)
        expect(loadging).toBeInTheDocument()

        expect(screen.queryByText(/MacBook Pro/i)).not.toBeInTheDocument()
    })
    test("renderiza o card corretamente apos carregamento", async () => {

        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard />)
    
        await waitFor(() => { 
            const title = screen.getByRole('heading', {name: /macbook pro/i})
            const img = screen.getByRole('heading', {name: /macbook pro/i})
            const descr = screen.getByText(/macbook pro 2021 with mini\-led display may launch between september, november/i)

            expect(title).toBeInTheDocument()
            expect(img).toBeInTheDocument()
            expect(descr).toBeInTheDocument()
            expect(screen.getByText(/\$1749/i)).toBeInTheDocument()// Exemplo de um expect direto. Neste caso, e o price.
        })

        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
        //screen.logTestingPlaygroundURL()
    })
})